import { DiscussionInfo, DiscussionInfoError } from "../types/DiscussionInfo";

interface DiscussionHeadProps {
    discussionInfo: DiscussionInfo | DiscussionInfoError | undefined
}

export function DiscussionHead({ discussionInfo }: DiscussionHeadProps) {
    if (discussionInfo === undefined) {
        return (
            <h1>Discussion not loaded</h1>
        );
    }

    if ('error' in discussionInfo) {
        return (
            <>
            <p>{discussionInfo.error}</p>
            <p>{discussionInfo.message}</p>
            </>
        );
    }

    return (
        <div>
            <h1>Title: {discussionInfo.title}</h1>
            <h1>Date: {discussionInfo.timestamp}</h1>
            <h1>Topic: {discussionInfo.topic}</h1>
            <h1>Topic ID: {discussionInfo.topicId}</h1>
            {discussionInfo.description && <h1>Description: {discussionInfo.description}</h1>}
            {discussionInfo.conditions && (
                <>
                <h1>Conditions:</h1>
                <ul>
                {discussionInfo.conditions.map((condition, index) => 
                    <li key={index}>{condition}</li>
                )}
                </ul>
                </>
            )}
        </div>
    );
}