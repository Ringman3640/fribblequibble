export interface QuibbleInfo {
    id: string,
    authorName: string,
    authorId: number,
    date: string,
    content: string,
    condemns?: number,
    condemned?: boolean
}