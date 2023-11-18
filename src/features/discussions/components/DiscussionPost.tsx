import { DiscussionPostInfo } from "..";

interface DiscussionPostProps {
    discussionPost: DiscussionPostInfo
}

export function DiscussionPost({discussionPost}: DiscussionPostProps) {
    return (
        <div>
            <h3>ID: {discussionPost.id}</h3>
            <h3>Title: {discussionPost.title}</h3>
            <h3>Timestamp: {discussionPost.timestamp}</h3>
            <h3>Activity Timestamp: {discussionPost.lastActivity}</h3>
            <h3>Topic: {discussionPost.topic}</h3>
            <h3>Topic ID: {discussionPost.topicId}</h3>
            <h3>Vote Count: {discussionPost.voteCount}</h3>
            <h3>Quibble Count: {discussionPost.quibbleCount}</h3>
            <h3>Description: {discussionPost.description || 'None'}</h3>
            <p><br/><br/></p>
        </div>
    );
}