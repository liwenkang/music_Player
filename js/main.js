//初始化
var init = function (list) {
    var player = $('#id-audio-player')
    player[0].src = list[list.index]
    var play = $('.player-play')[0]
    if(player[0].autoplay) {
        play.children[1].dataset.action = 'pause'
        play.children[1].innerHTML = '暂停'
    }

    $('#id-h1-song-title').text(getSongName(list[list.index]))

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}

var getSongName = function (str) {
    //允许字母,汉字,数字
    return str.match(/\/([0-9a-zA-Z\u4e00-\u9fa5]*)/g)[0].replace("/", "")
}

//绑定事件
var bindEvents = function (list) {
    bindSwitchEvents()
    bindSliderEvents()
    bindAudioEvents()
    bindPlayEvents(list)
    bindModeEvents(list)
}

var __main = function () {
    //请在这里输入歌曲的地址(还没搞定外链怎么弄,先用本地的模拟一下啦 ε=ε=ε=┏(゜ロ゜;)┛)
    var songSrcList = {
        0:'song/没头脑不高兴.mp3',
        1:'song/adan.mp3',
        2:'song/死人.flac',
    }
    songSrcList.len = getObjLength(songSrcList)
    songSrcList.index = 0

    init(songSrcList)
    playOrPause()
    bindEvents(songSrcList)
}

window.onload = function () {
    __main()
}