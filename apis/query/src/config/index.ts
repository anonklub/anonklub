import path from 'path'

const BASE_FOLDER = path.join(__dirname, '..', 'api')
const ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js'

export const controllers = [path.join(BASE_FOLDER, 'controllers', `*.${ext}`)]
export const middlewares = [path.join(BASE_FOLDER, 'middlewares', `*.${ext}`)]
