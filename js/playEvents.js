//播放控制
var pauseSong = function () {
    var player = $('#id-audio-player')[0]
    player.pause()
}
var playSong = function () {
    var player = $('#id-audio-player')[0]
    player.play()
}
var prevSong = function (list) {
    var player = $('#id-audio-player')
    if(list.index == 0) {
        list.index = list.len
    }
    player[0].src = list[--list.index]
    $('#id-h1-song-title').text(getSongName(list[list.index]))
    player[0].play()
    setButtonPause()

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}
var nextSong = function (list) {
    var player = $('#id-audio-player')
    if(list.index == 2) {
        list.index = -1
    }
    player[0].src = list[++list.index]
    $('#id-h1-song-title').text(getSongName(list[list.index]))
    player[0].play()
    setButtonPause()

    player.on('canplay', function () {
        $('#id-time-duration').html(convertTime(player[0].duration))
    })
}
var bindPlayEvents = function (list) {
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
            actions[type](list)
        }
    })
}
