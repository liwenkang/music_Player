//播放，还是暂停，用事件监听来实现
var playOrPause = function () {
    var player = $('#id-audio-player')
    player.on('pause', function () {
        setButtonPlay()
    })
    player.on('playing', function () {
        setButtonPause()
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
