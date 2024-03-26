import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEthereumAddress } from 'class-validator'

export class GetNftOwnersDto {
	@IsDefined()
	@IsEthereumAddress()
	@ApiProperty({
		description: 'The NFT contract address.',
		example: '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270',
	})
	tokenAddress: string
}
