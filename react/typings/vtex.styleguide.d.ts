declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Input: ComponentType<InputProps>
  export const ToastContext

  interface InputProps {
    [key: string]: any
  }
}
