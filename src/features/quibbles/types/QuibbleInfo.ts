export interface QuibbleInfo {
    id: string,
    authorName: string,
    authorId: number,
    timestamp: number,
    content: string | null,
    choiceId?: number,
    condemns?: number,
    condemned?: boolean
}