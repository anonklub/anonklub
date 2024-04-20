export const ellipsify = (text: string, start = 6): string =>
  text.length <= start
    ? text
    : `${text.slice(0, start)}... +${text.length - start}`
