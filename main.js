//初始化
var init = function (list) {
    var player = $('#id-audio-player')
    player[0].src = list[list.index]
    var play = $('.player-play')[0]
    if(player[0].autoplay) {
        play.children[1].dataset.action = 'pause'
        play.children[1].innerHTML = '暂停'
    }

    $('#id-h1-song-title').text(list[list.index])

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
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
        0:'没头脑不高兴.mp3',
        1:'adan.mp3',
        2:'死人.flac',
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