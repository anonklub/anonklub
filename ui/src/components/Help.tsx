'use client'
import { Text } from '@components'

export function Help({ content }: { content: string[] }) {
  return (
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
          <Text lines={content} />
          <menu className='dialog-menu flex flex-row justify-center'>
            <button className='nes-btn'>Cancel</button>
          </menu>
        </form>
      </dialog>
    </section>
  )
}
