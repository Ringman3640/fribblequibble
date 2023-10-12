import { createContext } from "react"
import LoginInfo from "../types/LoginInfo";

interface LoginInfoContent {
    loginInfo: LoginInfo,
    setLoginInfo: (c: LoginInfo) => void
}

const LoginInfoContext = createContext<LoginInfoContent>({
    loginInfo: undefined,
    setLoginInfo: () => {}
});

export default LoginInfoContext;