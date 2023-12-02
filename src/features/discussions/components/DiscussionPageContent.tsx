import Markdown from "react-markdown";
import styled from "styled-components";

const MarkdownStyle = styled.div`
    h1, h2, h3 {
        margin-top: var(--section-margin-top);
        margin-bottom: var(--section-margin-bottom);
    }

    img {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
`;

interface DiscussionPageContentProps {
    pageContent: string
}

export function DiscussionPageContent({pageContent}: DiscussionPageContentProps) {
    return (
        <MarkdownStyle>
            <Markdown>
                {pageContent}
            </Markdown>
        </MarkdownStyle>
    );
}