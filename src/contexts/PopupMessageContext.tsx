import { createContext } from "react"

interface PopupMessageService {
    setPopupMessage: (message: string) => void
}

export const PopupMessageContext = createContext<PopupMessageService>({
    setPopupMessage: () => {}
});