import { ChangeEvent } from "react"

export type Props = {
  width?: number,
  onSubmit?: any,
  className?: string
  debounceDelay?: number,
  darkMode?: boolean,
  placeholder?: string,
  customClass?: string,
  callBack?: (e: ChangeEvent<HTMLInputElement>) => void,
  onClearCallback?: () => void,
  autoFocus?: boolean,
  showClearButton?: boolean,
  initialValue?: string,
}