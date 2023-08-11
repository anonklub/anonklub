import { AnonSetResponse } from './types'

export const fetchJson = async (
  url: string,
  params?: Record<string, string>,
): Promise<AnonSetResponse> => {
  try {
    const _url =
      params === undefined
        ? url
        : `${url}?${new URLSearchParams(params).toString()}`
    // @ts-expect-error FIXME global.d.ts ?
    const res = await fetch(_url)
    return res.json()
  } catch (err) {
    return {
      error: err as Error,
    }
  }
}
