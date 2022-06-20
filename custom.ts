
/**
* 2センサーバージョン
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/
enum sensor {
    //% block="右センサー"
    sensor_R,
    //% block="左センサー"
    sensor_L,
    //% block="右手"
    sensor_armR,
}

/**
 * Custom blocks
 */
//% weight=100 color=#FFA500 icon="" block="城工トレース"
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    let Left_Senser_White = 1023
    let Right_Senser_White = 1023
    let Left_Senser_White_2 = 1023
    let Right_Senser_White_2 = 1023
    let Right_Senser_White_arm = 1023
    let Left_Senser_Black = 0
    let Right_Senser_Black = 0
    let Left_Senser_Black_2 = 0
    let Right_Senser_Black_2 = 0
    let Right_Senser_Black_arm = 0
    let pre_pos = 0

    //% block
    export function 左モーター(L_speed: number): void {
        if (L_speed == 0) {
            pins.digitalWritePin(DigitalPin.P15, 0)
        } else if (L_speed > 0) {
            pins.analogWritePin(AnalogPin.P15, L_speed)
            pins.digitalWritePin(DigitalPin.P16, 1)
        } else {
            pins.analogWritePin(AnalogPin.P15, Math.abs(L_speed))
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
    }
    //% block
    export function 右モーター(R_speed: number): void {
        if (R_speed == 0) {
            pins.digitalWritePin(DigitalPin.P13, 0)
        } else if (R_speed > 0) {
            pins.analogWritePin(AnalogPin.P13, R_speed)
            pins.digitalWritePin(DigitalPin.P14, 0)
        } else {
            pins.analogWritePin(AnalogPin.P13, Math.abs(R_speed))
            pins.digitalWritePin(DigitalPin.P14, 1)
        }
    }
    //% block
    export function 走る(speed: number, rotate: number): void {
        let LSpeed = speed + rotate
        if (LSpeed > 1023) {
            LSpeed = 1023
        }
        if (LSpeed < -1023) {
            LSpeed = -1023
        }

        let RSpeed = speed - rotate
        if (RSpeed > 1023) {
            RSpeed = 1023
        }
        if (RSpeed < -1023) {
            RSpeed = -1023
        }

        左モーター(LSpeed)
        右モーター(RSpeed)
    }
    //% block
    export function モニタ(): void {
        serial.writeNumbers([pins.analogReadPin(AnalogPin.P4),pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P0),pins.analogReadPin(AnalogPin.P3),pins.analogReadPin(AnalogPin.P2)])
        serial.writeNumbers( [Math.map(pins.analogReadPin(AnalogPin.P1), Right_Senser_White, Right_Senser_Black, 0, 100), Math.map(pins.analogReadPin(AnalogPin.P0), Left_Senser_White, Left_Senser_Black, 0, 100)])
        //        serial.writeValue("postion", pins.analogReadPin(AnalogPin.P1) - pins.analogReadPin(AnalogPin.P0))
        serial.writeValue("postion", Math.map(pins.analogReadPin(AnalogPin.P1), Left_Senser_White, Left_Senser_Black, 0, 100) - Math.map(pins.analogReadPin(AnalogPin.P0), Right_Senser_White, Right_Senser_Black, 0, 100))
        serial.writeLine("------------------------------------------------------------------------")
        basic.pause(100)
    }
    //% block
    export function キャリブレーション(): void {
        while (true) {
            //            serial.writeLine("calibration")
            //            serial.writeNumbers([pins.analogReadPin(AnalogPin.P1), pins.analogReadPin(AnalogPin.P0)])
            if (pins.analogReadPin(AnalogPin.P4) < Left_Senser_White_2) {
                Left_Senser_White_2 = pins.analogReadPin(AnalogPin.P4)
            }
            if (pins.analogReadPin(AnalogPin.P4) > Left_Senser_Black_2) {
                Left_Senser_Black_2 = pins.analogReadPin(AnalogPin.P4)
            }

            if (pins.analogReadPin(AnalogPin.P1) < Left_Senser_White) {
                Left_Senser_White = pins.analogReadPin(AnalogPin.P1)
            }
            if (pins.analogReadPin(AnalogPin.P1) > Left_Senser_Black) {
                Left_Senser_Black = pins.analogReadPin(AnalogPin.P1)
            }

            if (pins.analogReadPin(AnalogPin.P3) < Right_Senser_White_2) {
                Right_Senser_White_2 = pins.analogReadPin(AnalogPin.P3)
            }
            if (pins.analogReadPin(AnalogPin.P3) > Right_Senser_Black_2) {
                Right_Senser_Black_2 = pins.analogReadPin(AnalogPin.P3)
            }

            if (pins.analogReadPin(AnalogPin.P0) < Right_Senser_White) {
                Right_Senser_White = pins.analogReadPin(AnalogPin.P0)
            }
            if (pins.analogReadPin(AnalogPin.P0) > Right_Senser_Black) {
                Right_Senser_Black = pins.analogReadPin(AnalogPin.P0)
            }

            if (pins.analogReadPin(AnalogPin.P2) < Right_Senser_White_arm) {
                Right_Senser_White_arm = pins.analogReadPin(AnalogPin.P2)
            }
            if (pins.analogReadPin(AnalogPin.P2) > Right_Senser_Black_arm) {
                Right_Senser_Black_arm = pins.analogReadPin(AnalogPin.P2)
            }



            if (pins.digitalReadPin(DigitalPin.P5) == 0) {
                basic.pause(1000)
                serial.writeValue("Left_Senser_Black", Left_Senser_Black)
                serial.writeValue("Left_Senser_White", Left_Senser_White)
                serial.writeValue("Left_Senser_Black_2", Left_Senser_Black_2)
                serial.writeValue("Left_Senser_White_2", Left_Senser_White_2)
                serial.writeValue("Right_Senser_Black", Right_Senser_Black)
                serial.writeValue("Right_Senser_White", Right_Senser_White)
                serial.writeValue("Right_Senser_Black_2", Right_Senser_Black_2)
                serial.writeValue("Right_Senser_White_2", Right_Senser_White_2)
                serial.writeValue("arm_Black", Right_Senser_Black_arm)
                serial.writeValue("arm_White", Right_Senser_White_arm)
                break;
            }
        }
    }
    /**
      * TODO: describe your function here
      * @param value describe value here, eg: 5
      */
    //% block
    export function ライン位置(): number {

        //センサ値の標準化
        let L_sensor_std = Math.map(pins.analogReadPin(AnalogPin.P1), Left_Senser_White, Left_Senser_Black, 0, 100)
        let R_sensor_std = Math.map(pins.analogReadPin(AnalogPin.P0), Right_Senser_White, Right_Senser_Black, 0, 100)

        let pos = L_sensor_std - R_sensor_std

        return Math.round(pos);
    }
    //% block
    export function センサー(i: sensor): any {
        switch (i) {
            case sensor.sensor_L:
                return Math.map(pins.analogReadPin(AnalogPin.P1), Left_Senser_White, Left_Senser_Black, 0, 100)
                break;
            case sensor.sensor_R:
                return Math.map(pins.analogReadPin(AnalogPin.P0), Right_Senser_White, Right_Senser_Black, 0, 100)
                break;
        }

    }
    //% block
    export function ＰＤ制御(kp: number, kd: number): number {
        let diff = custom.ライン位置() - pre_pos
        let control = custom.ライン位置() * kp + diff * kd
        pre_pos = custom.ライン位置()
        return control
    }

}
