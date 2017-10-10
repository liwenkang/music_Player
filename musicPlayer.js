// 新建一个对象来保存播放数据
// 包括播放模式
// 包括播放列表
var convertTime = function (second) {
    var min = parseInt(second / 60)
    var sec = Math.round(second - min * 60)
    if(sec < 10) {
        sec = '0' + sec
    }
    var time = `${min}:${sec}`
    return time
}

var bindSliderEvents = function () {
    $('#id-input-slider').on('change', function (event) {
        //0~100  这是当用户拖拽进度条后，音乐播放时间需要改变
        var value = event.target.value
        var player = $('#id-audio-player')[0]
        player.currentTime = value * player.duration / 100
    })
}

var bindAudioEvents = function () {
//            当音乐播放时，进度条随着音乐的播放而改变滑块的位置
    $('#id-audio-player').on('timeupdate', function(event){
        var target = event.target
        var value = target.currentTime / target.duration * 100
        $('#id-input-slider').val(value)
        $('#id-time-current').html(convertTime(target.currentTime))
    })
}

var bindSwitchEvents = function () {
    var player = $('#id-audio-player')[0]
    // 双击切换歌曲
    $('song').on('click', function(e){
        var self = $(e.target)
        var song = self.text()
        // 根据当前播放状态设置 autoplay，暂停这句有没有都行
        player.autoplay = !player.paused
        // 切换歌曲
        player.src = song
        // 此处无法获得歌曲时间长短
//                log(player.duration)
        // 设置当前歌曲名称
        $('#id-h1-song-title').text(song)
    })
}

var pauseSong = function () {
    var player = $('#id-audio-player')[0]
    player.pause()
}
var playSong = function () {
    var player = $('#id-audio-player')[0]
    player.play()
}
//播放，还是暂停，用事件监听来实现
var playOrPause = function () {
    var player = $('#id-audio-player')
    player.on('playing', function () {
        setButtonPause()
    })
    player.on('pause', function () {
        setButtonPlay()
    })
}

var setButtonPlay = function () {
    var button = $('#id-button-play')[0]
    button.dataset.action = 'play'
    button.innerHTML = '播放'
}
var setButtonPause = function () {
    var button = $('#id-button-play')[0]
    button.dataset.action = 'pause'
    button.innerHTML = '暂停'
}

var prevSong = function () {
    var player = $('#id-audio-player')
    if(index == 0) {
        index = length
    }
    player[0].src = songSrcList[--index]
    $('#id-h1-song-title').text(songSrcList[index])
    player[0].play()
    setButtonPause()

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}
var nextSong = function () {
    var player = $('#id-audio-player')
    if(index == 2) {
        index = -1
    }
    player[0].src = songSrcList[++index]
    $('#id-h1-song-title').text(songSrcList[index])
    player[0].play()
    setButtonPause()

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}

var bindPlayEvents = function () {
    $('.player-play').on('click', function (event) {
        var button = event.target
        var type = button.dataset.action
        var actions = {
            prev: prevSong,
            next: nextSong,
            pause: pauseSong,
            play: playSong,
        }
        if(actions[type]) {
            actions[type](event)
        }
    })
}

var singleMode = function () {
    var player = $('#id-audio-player')
    player.attr('loop',true)
    $('#id-span-mode').text('单曲循环')
}
var loopMode = function () {
    var player = $('#id-audio-player')
    player.removeAttr('loop')
    //这该是一个状态，也就是一直检测是否放完，如果放完，就放下一首
    $('#id-span-mode').text('列表循环')
    player.on('ended',function(){
        nextSong()
    })
}
var randomMode = function () {
    var player = $('#id-audio-player')
    player.removeAttr('loop')
    $('#id-span-mode').text('随机播放')
    player.on('ended',function(){
        //这个随机数就是我要播放歌曲的序号
        var randomNum = Math.round(Math.random() * player.data.length)

        player[0].src = songSrcList[randomNum]
        $('#id-h1-song-title').text(songSrcList[randomNum])
        player[0].play()
        setButtonPause()

        player.on('canplay', function () {
            $('#id-time-duration').html(convertTime(player[0].duration))
        })
    })
}
var bindModeEvents = function () {
    $('.player-mode').on('click', function (event) {
        var button = event.target
        var type = button.dataset.action
        var actions = {
            single: singleMode,
            loop: loopMode,
            random: randomMode,
        }
        if(actions[type]) {
            actions[type](event)
        }
    })
}

var bindEvents = function () {
    bindSwitchEvents()
    bindSliderEvents()
    bindAudioEvents()
    bindPlayEvents()
    bindModeEvents()
}

//初始化
var init = function () {
    var player = $('#id-audio-player')
    player[0].src = songSrcList[index]
    var play = $('.player-play')[0]
    if(player[0].autoplay) {
        play.children[1].dataset.action = 'pause'
        play.children[1].innerHTML = '暂停'
    }

    $('#id-h1-song-title').text(songSrcList[index])

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}

var songListInit = function () {
    //考虑下如何才能不暴露全局变量
    songSrcList = {
        0:'没头脑不高兴.mp3',
        1:'adan.mp3',
        2:'死人.flac',
    }
    length = getObjLength(songSrcList)
    index = 0
}

var __main = function () {
    songListInit()
    init()
    playOrPause()
    bindEvents()
}

window.onload = function () {
        __main()
    }