//播放模式
var singleMode = function () {
    var player = $('#id-audio-player')
    player.attr('loop',true)
    $('#id-span-mode').text('单曲循环')
}
var loopMode = function (list) {
    var player = $('#id-audio-player')
    player.removeAttr('loop')
    //这该是一个状态，也就是一直检测是否放完，如果放完，就放下一首
    $('#id-span-mode').text('列表循环')
    player.on('ended',function(){
        nextSong(list)
    })
}
var randomMode = function (list) {
    var player = $('#id-audio-player')
    player.removeAttr('loop')
    $('#id-span-mode').text('随机播放')
    player.on('ended',function(){
        //这个随机数就是我要播放歌曲的序号
        var randomNum = Math.round(Math.random() * player.data.length)

        player[0].src = list[randomNum]
        $('#id-h1-song-title').text(getSongName(list[list.index]))
        player[0].play()
        setButtonPause()

        player.on('canplay', function () {
            $('#id-time-duration').html(convertTime(player[0].duration))
        })
    })
}
var bindModeEvents = function (list) {
    $('.player-mode').on('click', function (event) {
        var button = event.target
        var type = button.dataset.action
        var actions = {
            single: singleMode,
            loop: loopMode,
            random: randomMode,
        }
        if(actions[type]) {
            actions[type](list)
        }
    })
}
