import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export const useGoBackOnClickOutside = (
  containingClass = 'error-container',
) => {
  const router = useRouter()
  const goBack = useCallback(() => {
    router.back()
  }, [router])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(`.${containingClass}`) === null)
        goBack()
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [containingClass, goBack])

  return goBack
}
