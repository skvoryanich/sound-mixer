import { SerialPort } from 'serialport'

export default class SerialUtil {
    private port: SerialPort
    private serialData: string
    private stateInit = false
    private valuesVolume: number[] = [ 0, 0, 0, 0, 0 ]

    constructor(adr: string, baudRate: number) {
        this.port = new SerialPort({
            path: adr,
            baudRate: baudRate,
        })

        this.start()
    }

    private start(): void {
        this.port.on('data', (data: Buffer) => {
            if (!this.stateInit) {
                if (data.toString() === '123456789\r\n') {
                    this.port.write('11')
                }
            }

            if (data.toString().includes('|')) {
                this.stateInit = true
            }

            if (this.stateInit) {
                if (this.serialData !== data.toString()) {
                    this.serialData = data.toString()
                    const [ valuesVolume, button ] = this.getNormalizedValues(data.toString())

                    if (button > 0) {
                        // TODO: Ивент на переключение песен
                        // https://github.com/octalmage/robotjs/tree/master
                        switch (button) {
                            case 33:
                                console.log('Prev song')
                                break
                            case 333:
                                console.log('Play/Pause')
                                break
                            case 999:
                                console.log('Next song')
                                break
                            default:
                                break
                        }
                    }

                    if (this.valuesVolume.reduce((a, b) => a + b, 0) !== valuesVolume.reduce((a, b) => a + b, 0)) {
                        this.valuesVolume = valuesVolume
                        console.log('Volume:', valuesVolume)
                        // TODO: Ивент на обновление громкостей
                    }
                }
            }
        })
    }

    private getNormalizedValues(data: string): [ number[], number ] {
        const values = data.replace('\r\n', '').split('|')
        return [
            [
                this.valueToPercent(parseInt(values[0])),
                this.valueToPercent(parseInt(values[1])),
                this.valueToPercent(parseInt(values[2])),
                this.valueToPercent(parseInt(values[3])),
                this.valueToPercent(parseInt(values[4]))
            ],
            parseInt(values[5])
        ]
    }

    private valueToPercent(value: number): number {
        return Math.round((value * 100) / 1023)
    }
}
