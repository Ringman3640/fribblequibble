export interface DiscussionPostInfo {
    id: number,
    title: string,
    timestamp: number,
    lastActivity: number,
    topic: string,
    topicId: number,
    voteCount: number,
    quibbleCount: number,
    description?: string
}