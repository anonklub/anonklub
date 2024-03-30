import type { AnonSetResponse } from './types'

export const fetchJson = async (
  url: string,
  params?: Record<string, string>,
): Promise<AnonSetResponse> => {
  try {
    const _url =
      params === undefined
        ? url
        : `${url}?${new URLSearchParams(params).toString()}`
    const res = await fetch(_url)
    return (await res.json()) as Promise<AnonSetResponse>
  } catch (err) {
    return {
      error: err as Error,
    }
  }
}
