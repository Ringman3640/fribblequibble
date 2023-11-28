import { useState } from "react";
import { Link } from "react-router-dom";
import { QuibbleInfo } from "../types/QuibbleInfo";
import { QuibbleCondemner } from "./QuibbleCondemner";
import { formatTimestamp } from "../../../scripts/formatTimestamp";
import styled from "styled-components";

const QuibbleContainer = styled.div`
    margin-bottom: 40px;

    & > * {
        margin-top: 10px;
    }
    & > *:nth-child(1) {
        margin-top: 0px;
    }
`;

const AuthorName = styled.a`
    display: inline-block;
    font-size: var(--h3-font-size);

    color: ${props => props.theme.secondaryColor};
`;

const ChoiceText = styled.p`
    display: inline-block;
    margin-left: 1rem;
    font-size: var(--small-font-size);
`;

const FromDiscussionText = styled.p`
    font-size: var(--small-font-size);
`;

const DateCondemnRow = styled.span`
    display: flex;
`;

const DateDisplay = styled.p`
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
`;

const CondemnCountDisplay = styled.p`
    align-items: center;
    min-width: 50px;
    margin-left: 8px;
    margin-top: auto;
    margin-bottom: auto;
`;

interface QuibbleProps {
    quibbleInfo: QuibbleInfo,
    userChoice?: string
}

export function Quibble({ quibbleInfo, userChoice }: QuibbleProps) {
    const [condemnCount, setCondemnCount] = useState<number>(quibbleInfo.condemns || 0);

    function increaseCondemnCount() {
        setCondemnCount(condemnCount + 1);
    }

    const isDiscussionQuibble = 'authorName' in quibbleInfo;
    return (
        <QuibbleContainer>
            {isDiscussionQuibble ? 
                <span>
                    <AuthorName>
                        <Link to={`/user/${quibbleInfo.authorId}`}>
                            {quibbleInfo.authorName}
                        </Link>
                    </AuthorName>
                    <ChoiceText>{userChoice}</ChoiceText>
                </span>
                :
                <FromDiscussionText>
                    From &nbsp;
                    <Link to={`/discussion/${quibbleInfo.discussionId}`}>
                        {quibbleInfo.discussion}
                    </Link>
                </FromDiscussionText>
            }
            <p>{quibbleInfo.content}</p>
            <DateCondemnRow>
                <DateDisplay><small>{formatTimestamp(quibbleInfo.timestamp)}</small></DateDisplay>
                <QuibbleCondemner
                    quibbleInfo={quibbleInfo}
                    handleCondemn={increaseCondemnCount}
                    visualOnly={!isDiscussionQuibble}
                />
                <CondemnCountDisplay>
                    {condemnCount || ''}
                </CondemnCountDisplay>
            </DateCondemnRow>
        </QuibbleContainer>
    );
}