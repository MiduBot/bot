import chalk from 'chalk'
class Logger {
  id!: string
  time: Intl.DateTimeFormat
  constructor (id: string) {
    this.id = id
    this.time = Intl.DateTimeFormat('es-ES', {
      timeStyle: 'medium',
      dateStyle: 'medium',
      hour12: true
    })
  }

  info (message: string) {
    const infoText = chalk.hex('#42f59e').bold('INFO')
    const timeText = chalk.hex('#363636').bold(`[${this.time.format()}]`)
    return console.log(`[ ${infoText} ] ${timeText}\n${message}`)
  }

  warn (message: string) {
    const warnText = chalk.hex('#ffc060').bold('WARN')
    const timeText = chalk.hex('#363636').bold(`[${this.time.format()}]`)
    return console.log(`[ ${warnText} ] ${timeText}\n${message}`)
  }

  error (message: string) {
    const errorText = chalk.hex('#fe2d42').bold('ERROR')
    const timeText = chalk.hex('#363636').bold(`[${this.time.format()}]`)
    return console.log(`[ ${errorText} ] ${timeText}\n${message}`)
  }

  debug (message: string) {
    const debugText = chalk.hex('#3636FF').bold('DEBUG')
    const timeText = chalk.hex('#363636').bold(`[${this.time.format()}]`)
    return console.log(`[ ${debugText} ] ${timeText}\n${message}`)
  }
}

export default Logger
