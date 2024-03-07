export async function getData<T>(url: string): Promise<T> {
  // query API might return different results after every new block (12s), so skip cache
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()

  if (!res.ok) {
    if (data.message !== undefined) throw new Error(data.message)
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
