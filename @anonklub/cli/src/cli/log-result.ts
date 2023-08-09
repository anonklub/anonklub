import terminalLink from 'terminal-link'
import { API_URLS } from '../constants'

export const logResult = (jobId: string) => {
  console.log('Proof Request submitted successfully and being now processed.')
  console.log(
    `Your job id is ${jobId}. Do not share this id. You'll need it to access your proof file.`,
  )
  console.log(
    `Your proof input is already available at ${terminalLink(
      'input.json',
      `${API_URLS.PROVE}/proofs/${jobId}/input.json`,
    )}`,
  )
  console.log('Wait 5-10 min and your results will be available at:')
  console.log(
    terminalLink('proof.json', `${API_URLS.PROVE}/proofs/${jobId}/proof.json`),
  )
  console.log(
    terminalLink(
      'publicSignals.json',
      `${API_URLS.PROVE}/proofs/${jobId}/publicSignals.json`,
    ),
  )
}
