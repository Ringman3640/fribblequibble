import { Link } from "react-router-dom";
import { DiscussionPostInfo } from "..";
import { formatTimestamp } from "../../../scripts/formatTimestamp";
import { QuibblesIcon, VotesIcon } from "../../icons";
import styled from "styled-components";

const PostConatiner = styled.div`
    position: relative;
    display: flex;
    padding: var(--large-text-padding);
    border-radius: var(--large-border-radius);
    margin-top: 10px;
    overflow: hidden;

    background-color: ${props => props.theme.backgroundColorLight};

    // Reset styling from anchor element
    color: inherit;
    text-decoration: inherit;
    font-weight: inherit;
    &:visited {
        color: inherit;
        text-decoration: inherit;
        font-weight: inherit;
    }
`;

const PostLink = styled(Link)`
    position: absolute;
    display: block;
    border-radius: var(--large-border-radius);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 1;
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 1;
`;

const StatsContainer = styled.div`
    flex-shrink: 0;
`;

const StatsRow = styled.div`
    display: flex;

    p {
        margin: auto;
        margin-right: 4px;
        text-align: right;
        min-width: 40px;
    }
`;

const IconContainer = styled.div`
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-top: auto;
    margin-bottom: auto;
`;

const TopicDateRow = styled.div`
    display: flex;
    gap: 20px;
`;

const TopicText = styled.h3`
    display: inline-block;
    margin-top: 4px;
    z-index: 2;

    color: ${props => props.theme.secondaryColor};

    a {
        text-decoration: none;
    }
    a:visited {
        color: ${props => props.theme.secondaryColor};
    }
    a:hover {
        text-decoration: underline;
    }
`;

const DateText = styled.p`
    font-size: var(--small-font-size);
    margin-top: auto;
`;

const DescriptionText = styled.p`
    margin-top: 10px;
`;


interface DiscussionPostProps {
    discussionPost: DiscussionPostInfo
}

export function DiscussionPost({discussionPost}: DiscussionPostProps) {
    return (
        <PostConatiner>
            <PostLink to={`/discussion/${discussionPost.id}`}/>
            <InfoContainer>
                <h3>{discussionPost.title}</h3>
                <TopicDateRow>
                    <TopicText>
                        <Link to='google.com'>{discussionPost.topic}</Link>
                    </TopicText>
                    <DateText>
                        Posted {formatTimestamp(discussionPost.timestamp)}
                    </DateText>
                    <DateText>
                        Last activity {formatTimestamp(discussionPost.lastActivity)}
                    </DateText>
                </TopicDateRow>
                {discussionPost.description &&
                <DescriptionText>{discussionPost.description}</DescriptionText>}
            </InfoContainer>
            <StatsContainer>
                <StatsRow>
                    <p>{discussionPost.voteCount}</p>
                    <IconContainer>
                        <VotesIcon/>
                    </IconContainer>
                </StatsRow>
                <StatsRow>
                    <p>{discussionPost.quibbleCount}</p>
                    <IconContainer>
                        <QuibblesIcon/>
                    </IconContainer>
                </StatsRow>
            </StatsContainer>
        </PostConatiner>
    );
}