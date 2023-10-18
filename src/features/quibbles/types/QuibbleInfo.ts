export interface QuibbleInfo {
    id: string,
    authorName: string,
    authorId: number,
    timestamp: number,
    content: string,
    condemns?: number,
    condemned?: boolean
}