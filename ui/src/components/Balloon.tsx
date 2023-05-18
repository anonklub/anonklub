'use client'
import Text from '@components/Text'

export default function Balloon({
  question,
  help,
}: {
  question: string
  help: string[]
}) {
  return (
    <div className='nes-balloon from-left'>
      <p className='mb-2'>{question}</p>
      <section>
        <button
          type='button'
          className='nes-btn is-primary text-xs'
          onClick={() => {
            // @ts-ignore
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
