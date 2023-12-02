import { DiscussionChoiceInfo } from "./DiscussionChoiceInfo";

export interface DiscussionInfo {
    title: string,
    timestamp: number,
    topic: string,
    topicId: number,
    description?: string,
    pageContent?: string,
    choices?: DiscussionChoiceInfo[]
}

export interface DiscussionInfoError {
    error: string,
    message: string
}