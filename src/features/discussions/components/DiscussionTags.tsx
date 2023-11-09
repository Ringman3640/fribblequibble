import { useEffect, useState } from "react";
import { DiscussionTagInfo } from "../types/DiscussionTagInfo";
import { DiscussionTag } from "./DiscussionTag";
import styled from "styled-components";

const TagsContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`;

interface DiscussionTagContainerProps {
    discussionId: number;
}

export function DiscussionTags({discussionId}: DiscussionTagContainerProps) {
    const [tags, setTags] = useState<DiscussionTagInfo[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${discussionId}/tags`, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            setTags(json.tags);
        })
        .catch(err => {
            console.log(err);
        });
    }, [discussionId]);

    return (
        <TagsContainer>
            {tags.map(tag => 
                <DiscussionTag tagInfo={tag} key={tag.id}/>
            )}
        </TagsContainer>
    );
}