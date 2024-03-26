export async function getData<T>(url: string): Promise<T> {
	// query API might return different results after every new block (12s), so skip cache
	const res = await fetch(url, { cache: 'no-store' })
	const data = await res.json()

	if (!res.ok) {
		if (data.statusCode === 429 && data.message !== undefined)
			throw new Error(data.message, { cause: 'rate-limit' })
		throw new Error('Fail to fetch data')
	}

	return data
}
