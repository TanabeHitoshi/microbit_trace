let アウトコース = 0
custom.キャリブレーション()
basic.forever(function () {
    if (custom.センサー(sensor.sensor_L) < 20 && custom.センサー(sensor.sensor_R) <= 50) {
        アウトコース = 1
    } else if (custom.センサー(sensor.sensor_R) < 20 && custom.センサー(sensor.sensor_L) <= 50) {
        アウトコース = -1
    }
    if (custom.センサー(sensor.sensor_L) <= 50 && custom.センサー(sensor.sensor_R) <= 50) {
        if (アウトコース == 1) {
            custom.走る(250, -300)
        } else {
            custom.走る(250, 300)
        }
    } else {
        custom.走る(700, custom.ＰＤ制御(2, 1))
    }
})
