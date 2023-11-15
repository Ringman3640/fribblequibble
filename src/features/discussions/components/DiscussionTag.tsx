import { DiscussionTagInfo } from "../types/DiscussionTagInfo";
import styled from "styled-components";

const TagContainer = styled.a`
    font-size: var(--p-font-size);
    text-decoration: none;
    border-radius: 0.6rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.backgroundColorLight};

    &:visited {
        color: ${props => props.theme.backgroundColorLight};
    }
`;

interface DiscussionTagProps {
    tagInfo: DiscussionTagInfo
}

export function DiscussionTag({tagInfo}: DiscussionTagProps) {
    return (
        <TagContainer href='https://google.com'>
            {tagInfo.name}
        </TagContainer>
    );
}