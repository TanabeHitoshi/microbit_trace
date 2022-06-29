input.onButtonPressed(Button.B, function () {
    let カウント = 0
    basic.showNumber(カウント)
})
let アウトコース = ""
custom.キャリブレーション()
// serial.writeValue("outOfcurce", custom.コースアウトの方向(10, 10))
basic.forever(function () {
    アウトコース = custom.コースアウトの方向(10, 10)
    if (custom.センサーの値(65, 65) != 0) {
        custom.走る(900 - Math.abs(custom.ライン位置()) * 5, custom.ＰＤ制御(2, 1))
    } else {
        if (アウトコース == "L") {
            custom.走る(500, 150)
        }
        if (アウトコース == "R") {
            custom.走る(500, -150)
        }
    }
    if (custom.右手の回数() >= 7) {
        while (true) {
            custom.走る(0, 0)
            basic.showNumber(custom.右手の回数())
        }
    }
})
