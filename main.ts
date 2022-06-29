input.onButtonPressed(Button.B, function () {
    let カウント = 0
    basic.showNumber(カウント)
})
custom.キャリブレーション()
// serial.writeValue("outOfcurce", custom.コースアウトの方向(10, 10))
basic.forever(function () {
    custom.走る(900 - Math.abs(custom.ライン位置()) * 5, custom.ＰＤ制御(2, 1))
})
