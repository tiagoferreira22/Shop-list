// hooks/useDialogFix.ts
"use client"

import { useEffect } from 'react'

export function useDialogFix() {
  useEffect(() => {
    return () => {
      // Remove o style problemático quando o componente desmonta
      document.body.style.pointerEvents = ''
    }
  }, [])
}
