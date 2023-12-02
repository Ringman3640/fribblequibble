import { Link } from "react-router-dom";
import { DiscussionInfo, DiscussionInfoError } from "../types/DiscussionInfo";
import { DiscussionPageContent } from "./DiscussionPageContent";
import styled from "styled-components";

const ContentContainer = styled.div`
    margin-bottom: 50px;
`;

const TopicDateContainer = styled.span`
    display: inline-block;
`;

const TopicText = styled.h3`
    display: inline-block;

    color: ${props => props.theme.secondaryColor};

    & > a {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
        &:visited {
            color: inherit;
        }
    }
`;

const DateText = styled.div`
    display: inline-block;
    margin-left: 0.6rem;
`;

const DescrpitionText = styled.p`
    margin-top: 30px;
`;

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
        <ContentContainer>
            <h1>{discussionInfo.title}</h1>
            <TopicDateContainer>
                <TopicText>
                    <Link
                        to={`/discussion?topic-id=${discussionInfo.topicId}`}>
                        {discussionInfo.topic}
                    </Link>
                </TopicText>
                <DateText>
                    <small>October 22, 2023</small>
                </DateText>
            </TopicDateContainer>
            <DescrpitionText>{discussionInfo.description}</DescrpitionText>
            {discussionInfo.pageContent && 
            <DiscussionPageContent pageContent={discussionInfo.pageContent}/>}
        </ContentContainer>
    );
}