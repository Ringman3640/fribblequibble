import DiscussionChoice from "./DiscussionChoiceInfo";

interface DiscussionInfoGood {
    title: string,
    timestamp: number,
    topic: string,
    topicId: number,
    description?: string,
    conditions?: string[],
    choices: DiscussionChoice[]
}

interface DiscussionInfoError {
    error: string,
    message: string
}

type DiscussionInfo = DiscussionInfoGood | DiscussionInfoError;

export default DiscussionInfo;