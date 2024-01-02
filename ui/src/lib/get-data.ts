import { ERC20_ADDRESS_LIST } from "./constants";

export async function getData<T>(url: string): Promise<T> {
  // query API might return different results after every new block (12s), so skip cache
  let res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    console.warn("Failed to fetch data");

    // Just for testing purposes I am using a fetched list already.
    return ERC20_ADDRESS_LIST as any;
  }

  return res.json()
}
