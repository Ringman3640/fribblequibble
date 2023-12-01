import { createContext } from "react"
import { LoginInfo } from "../types/LoginInfo";

interface LoginInfoContent {
    loginInfo: LoginInfo,
    refreshLoginInfo: () => void
}

export const LoginInfoContext = createContext<LoginInfoContent>({
    loginInfo: undefined,
    refreshLoginInfo: () => {}
});