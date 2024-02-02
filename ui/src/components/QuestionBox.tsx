import { HelpModal } from '@components'

export function QuestionBox({
  help,
  question,
}: {
  question: string
  help?: string[]
}) {
  return (
    <div className='flex flex-row justify-between'>
      <div className='question-box'>{question}</div>
      {help !== undefined && <HelpModal content={help} />}
    </div>
  )
}
