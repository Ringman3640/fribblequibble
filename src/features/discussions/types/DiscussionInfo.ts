import { DiscussionChoice } from "./DiscussionChoiceInfo";

export interface DiscussionInfo {
    title: string,
    timestamp: number,
    topic: string,
    topicId: number,
    description?: string,
    conditions?: string[],
    choices?: DiscussionChoice[]
}

export interface DiscussionInfoError {
    error: string,
    message: string
}