//转换成x:xx的时间形式
var convertTime = function (second) {
    var min = parseInt(second / 60)
    var sec = Math.round(second - min * 60)
    if(sec < 10) {
        sec = '0' + sec
    }
    var time = `${min}:${sec}`
    return time
}