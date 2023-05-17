import Link from 'next/link'

const TYPES = [
  { name: 'Cryptopunk', slug: 'cryptopunk' },
  { name: 'ENS Proposal Voters', slug: 'ens' },
  {
    name: 'ETH balance',
    slug: 'eth-balance',
  },
  { name: 'ERC20 balance', slug: 'erc20-balance' },
]
export default function AnonSetType({ params: { location } }) {
  return (
    <>
      <h1 className='nes-text is-primary'>Anonymity Set Origin: {location}</h1>
      <div className='nes-balloon from-left w-4/5'>
        <p>What type of anonymity set do you want to prove?</p>
      </div>
      <div className='flex flex-row justify-center space-x-3'>
        {TYPES.map(({ name, slug }) => (
          <Link
            href={`/prove/${location}/${slug}`}
            key={name}
            className='nes-btn'
          >
            {name}
          </Link>
        ))}
      </div>
      <div className='flex flex-col justify-center'></div>
    </>
  )
}
