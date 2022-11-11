import { addColors, createLogger, format, transports } from 'winston'

const { colorize, combine, errors, json, printf, timestamp } = format
const { Console, File } = transports

const colors = {
  debug: 'white',
  error: 'red',
  http: 'magenta',
  info: 'green',
  warn: 'yellow',
}

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'warn'
const silent = process.env.NODE_ENV === 'test'

addColors(colors)

const logger = createLogger({
  format: timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  level,
  levels: {
    debug: 4,
    error: 0,
    http: 3,
    info: 2,
    warn: 1,
  },
  transports: [
    new Console({
      format: combine(
        printf(({ level, message, stack, timestamp }) => {
          let print = level

          if (typeof timestamp === 'string' && typeof message === 'string')
            print = `${level} ${timestamp} ${message}`

          if (
            typeof stack === 'string' &&
            stack !== '' &&
            process.env.NODE_ENV !== 'production'
          )
            print = `${print} ${stack}`

          return print
        }),
        colorize({ all: true }),
      ),
      silent,
    }),
    new File({
      filename: 'logs/error.log',
      format: combine(errors(), json()),
      level: 'error',
    }),
    new File({ filename: 'logs/all.log', format: combine(errors(), json()) }),
  ],
})

export { logger }
