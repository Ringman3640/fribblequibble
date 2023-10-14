export enum FetchMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    DELETE = 'DELETE'
}

export interface BackendFetchInfo {
    route: string,
    method: FetchMethod,
    sendCookies?: boolean,
    body?: object
}