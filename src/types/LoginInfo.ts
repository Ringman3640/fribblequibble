interface LoginInfoGood {
    id: number,
    username: string,
    accessLevel: number
}

type LoginInfo = LoginInfoGood | undefined | null;

export default LoginInfo;