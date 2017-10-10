//单击切换歌曲
var bindSwitchEvents = function () {
    var player = $('#id-audio-player')[0]
    $('song').on('click', function(event){
        var self = $(event.target)
        var song = self.text()
        // 根据当前播放状态设置 autoplay，暂停这句有没有都行
        player.autoplay = !player.paused
        // 切换歌曲
        player.src = song
        // 此处无法获得歌曲时间长短
//                log(player.duration)
        // 设置当前歌曲名称
        $('#id-h1-song-title').text(song.replace(/(\.mp3|\.flac)/g, ""))
    })
}
