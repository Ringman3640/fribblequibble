export interface DiscussionQuibbleInfo {
    id: string,
    authorName: string,
    authorId: number,
    timestamp: number,
    content: string | null,
    choiceId?: number,
    condemns?: number,
    condemned?: boolean
}

export interface ProfileQuibbleInfo {
    id: string,
    discussion: string,
    discussionId: number,
    timestamp: number,
    content: string | null,
    condemns?: number,
    condemned?: boolean
}

export type QuibbleInfo = DiscussionQuibbleInfo | ProfileQuibbleInfo;