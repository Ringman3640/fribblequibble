import { createContext } from "react"
import { LoginInfo } from "../types/LoginInfo";

interface LoginInfoContent {
    loginInfo: LoginInfo,
    setLoginInfo: (c: LoginInfo) => void
}

export const LoginInfoContext = createContext<LoginInfoContent>({
    loginInfo: undefined,
    setLoginInfo: () => {}
});