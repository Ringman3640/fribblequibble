import { createContext } from "react"
import { LoginInfo } from "../types/LoginInfo";

interface LoginInfoContent {
    loginInfo: LoginInfo,
    refreshLoginInfo: (useCachedInfo?: boolean) => void
}

export const LoginInfoContext = createContext<LoginInfoContent>({
    loginInfo: undefined,
    refreshLoginInfo: () => {}
});