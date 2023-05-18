'use client'
import Text from '@components/Text'

export default function Balloon({
  help,
  question,
}: {
  question: string
  help: string[]
}) {
  return (
    <div className='flex flex-row justify-between'>
      <div className='nes-balloon from-left'>
        <p className='mb-2'>{question}</p>
      </div>
      <section>
        <button
          type='button'
          className='nes-btn is-warning'
          onClick={() => {
            // @ts-expect-error dialog el exists
            document.getElementById('dialog').showModal()
          }}
        >
          ?
        </button>
        <dialog className='nes-dialog' id='dialog'>
          <form method='dialog'>
            <Text lines={help} />
            <menu className='dialog-menu flex flex-row justify-center'>
              <button className='nes-btn'>Cancel</button>
            </menu>
          </form>
        </dialog>
      </section>
    </div>
  )
}
