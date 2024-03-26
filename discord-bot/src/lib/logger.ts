import pino from 'pino'

const logger = pino({
	transport: {
		options: {
			colorize: true,
		},
		target: 'pino-pretty',
	},
})

export const debug = logger.debug.bind(logger)
export const error = logger.error.bind(logger)
export const fatal = logger.fatal.bind(logger)
export const info = logger.info.bind(logger)
export const log = logger.info.bind(logger)
export const trace = logger.trace.bind(logger)
export const warn = logger.warn.bind(logger)
