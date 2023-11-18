import { DiscussionPostInfo } from "..";
import { DiscussionPost } from "./DiscussionPost";

interface DiscussionPostListProps {
    discussionPosts: DiscussionPostInfo[]
}

export function DiscussionPostList({discussionPosts}: DiscussionPostListProps) {
    return (
        <div>
            {discussionPosts.map(discussionPost => 
                <DiscussionPost
                    discussionPost={discussionPost}
                    key={discussionPost.id}
                />
            )}
        </div>
    );
}