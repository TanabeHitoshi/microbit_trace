input.onButtonPressed(Button.B, function () {
    let カウント = 0
    basic.showNumber(カウント)
})
custom.キャリブレーション()
basic.forever(function () {
    serial.writeValue("sensor", custom.センサーの値(10, 10))
})
