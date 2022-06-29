input.onButtonPressed(Button.B, function () {
    basic.showNumber(カウント)
})
let アウトコース = 0
let カウント = 0
custom.キャリブレーション()
basic.forever(function () {
    if (custom.センサー(sensor.sensor_L) < 10 && custom.センサー(sensor.sensor_R) >= 70) {
        アウトコース = 1
    } else if (custom.センサー(sensor.sensor_R) < 10 && custom.センサー(sensor.sensor_L) >= 70) {
        アウトコース = -1
    }
    if (カウント && custom.センサー(sensor.sensor_R) >= 80) {
        if (アウトコース == 1) {
            custom.走る(100, -100)
        } else {
            custom.走る(100, 100)
        }
    } else {
        custom.走る(900 - Math.abs(custom.ライン位置()) * 5, custom.ＰＤ制御(1.3, 0.8))
    }
    if (custom.右手の回数() > 5) {
        basic.showNumber(custom.右手の回数())
    }
})
