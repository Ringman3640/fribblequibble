import { createContext } from "react"
import { LoginInfo } from "../types/LoginInfo";

interface LoginInfoContent {
    loginInfo: LoginInfo,
    clearLoginInfo: () => void
}

export const LoginInfoContext = createContext<LoginInfoContent>({
    loginInfo: undefined,
    clearLoginInfo: () => {}
});