interface LoginInfoGood {
    id: number,
    username: string,
    accessLevel: number
}

export type LoginInfo = LoginInfoGood | undefined | null;