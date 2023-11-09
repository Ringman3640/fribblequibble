import { DiscussionInfo, DiscussionInfoError } from "../types/DiscussionInfo";
import { DiscussionTags } from "./DiscussionTags";
import { SectionHeader } from "../../styles";
import styled from "styled-components";

const ContentContainer = styled.div`
    margin-bottom: 50px;
`;

const TopicDateContainer = styled.span`
    display: inline-block;
    margin-top: 20px;
`;

const TopicText = styled.h3`
    display: inline-block;

    color: ${props => props.theme.secondaryColor};
`;

const DateText = styled.div`
    display: inline-block;
    margin-left: 0.6rem;
`;

const DescrpitionText = styled.p`
    margin-top: 30px;
`;

const ConditionsContainer = styled.div`
    ul {
        margin-top: 10px;
    }
`;

interface DiscussionHeadProps {
    discussionInfo: DiscussionInfo | DiscussionInfoError | undefined,
    discussionId: number
}

export function DiscussionHead({ discussionInfo, discussionId }: DiscussionHeadProps) {
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
                    <a>{discussionInfo.topic}</a>
                </TopicText>
                <DateText>
                    <small>October 22, 2023</small>
                </DateText>
            </TopicDateContainer>
            <DiscussionTags discussionId={discussionId}/>
            <DescrpitionText>{discussionInfo.description}</DescrpitionText>
            {discussionInfo.conditions ? (
                <ConditionsContainer>
                    <SectionHeader>Conditions</SectionHeader>
                    <ul>
                        {discussionInfo.conditions.map((condition, idx) =>
                        <li key={idx}>{condition}</li>
                        )}
                    </ul>
                </ConditionsContainer>
            ) : null}
        </ContentContainer>
    );
}