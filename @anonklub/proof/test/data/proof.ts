import { ProofData } from '../../src/Proof/interface'

const proof: ProofData = {
  curve: 'bn128',
  pi_a: [
    '19515258816388790982291484519913981695367160727622304305292372178958703901720',
    '11513652409597999658488730667299557398080028048135636543759772542666071950660',
    '1',
  ],
  pi_b: [
    [
      '587959761520996754664506217555769248529697267578684873791540598081424723555',
      '16728944238114055381087072322219767684459974592115801022320821164268624723545',
    ],
    [
      '5146269007734410872888636342826438546623351281008685289517248836485544139469',
      '18357530506021138115797219888282509893790295605362356279551267580454724694772',
    ],
    ['1', '0'],
  ],
  pi_c: [
    '10980330945653263350790516557348644437678297100053998209739225091427978090343',
    '20648895498078745792074071408292150656899059348939576579516024574478165851669',
    '1',
  ],
  protocol: 'groth16',
}

export default proof
