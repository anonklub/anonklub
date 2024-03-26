import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsDefined,
	IsEthereumAddress,
	IsNumberString,
	IsOptional,
} from 'class-validator'

export class GetErc20BalanceOwnersDto {
	@IsOptional()
	@IsNumberString(
		{ no_symbols: true },
		{ message: 'Must be a number string without symbols.' },
	)
	@ApiPropertyOptional({
		description: 'Minimum ERC20 amount the addresses must own.',

		example: '100',
		name: 'min',
		required: false,
		type: 'number',
	})
	min = '0'

	@IsDefined()
	@IsEthereumAddress()
	@ApiProperty({
		description: 'The ERC20 contract address.',
		example: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
		name: 'tokenAddress',
		required: true,
	})
	tokenAddress: string
}
