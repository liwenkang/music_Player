//当用户拖拽进度条后,改变当前播放的时间
var bindSliderEvents = function () {
    $('#id-input-slider').on('change', function (event) {
        //0~100  这是当用户拖拽进度条后，音乐播放时间需要改变
        var value = event.target.value
        var player = $('#id-audio-player')[0]
        player.currentTime = value * player.duration / 100
    })
}

//当音乐播放时，进度条随着音乐的播放而改变滑块的位置
var bindAudioEvents = function () {
    $('#id-audio-player').on('timeupdate', function(event){
        var target = event.target
        var value = target.currentTime / target.duration * 100
        $('#id-input-slider').val(value)
        $('#id-time-current').html(convertTime(target.currentTime))
    })
}
