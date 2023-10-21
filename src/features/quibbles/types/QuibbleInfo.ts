export interface QuibbleInfo {
    id: string,
    authorName: string,
    authorId: number,
    timestamp: number,
    content: string,
    choiceId?: number,
    condemns?: number,
    condemned?: boolean
}