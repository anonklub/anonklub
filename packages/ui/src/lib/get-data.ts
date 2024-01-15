export async function getData<T>(url: string): Promise<T> {
  // query API might return different results after every new block (12s), so skip cache
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json()
}
