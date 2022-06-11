let アウトコース = 0
custom.キャリブレーション()
basic.forever(function () {
    if (custom.センサー(sensor.sensor_L) < 20 && custom.センサー(sensor.sensor_R) >= 50) {
        アウトコース = 1
    } else if (custom.センサー(sensor.sensor_R) < 20 && custom.センサー(sensor.sensor_L) >= 50) {
        アウトコース = -1
    }
    if (custom.センサー(sensor.sensor_L) >= 80 && custom.センサー(sensor.sensor_R) >= 80) {
        if (アウトコース == 1) {
            custom.走る(100, -300)
        } else {
            custom.走る(100, 300)
        }
    } else {
        custom.走る(800 - Math.abs(custom.ライン位置()) * 3, custom.ＰＤ制御(1.7, 0.8))
    }
})
