import { useState } from "react";
import { QuibbleInfo } from "../types/QuibbleInfo";
import { QuibbleCondemner } from "./QuibbleCondemner";
import { formatTimestamp } from "../../../scripts/formatTimestamp";
import styled from "styled-components";

const QuibbleContainer = styled.div`
    margin-bottom: 40px;
`;

const AuthorName = styled.a`
display: inline-block;
    font-size: var(--h3-font-size);
    margin-bottom: 10px;

    color: ${props => props.theme.secondaryColor};
`;

const ChoiceText = styled.p`
    display: inline-block;
    margin-left: 1rem;
`;

const ContentText = styled.p`
    margin-bottom: 10px;
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

    return (
        <QuibbleContainer>
            <span>
                <AuthorName>{quibbleInfo.authorName}</AuthorName>
                <ChoiceText><small>{userChoice}</small></ChoiceText>
            </span>
            <ContentText>{quibbleInfo.content}</ContentText>
            <DateCondemnRow>
                <DateDisplay><small>{formatTimestamp(quibbleInfo.timestamp)}</small></DateDisplay>
                <QuibbleCondemner
                    quibbleInfo={quibbleInfo}
                    handleCondemn={increaseCondemnCount}
                />
                <CondemnCountDisplay>{condemnCount || ''}</CondemnCountDisplay>
            </DateCondemnRow>
        </QuibbleContainer>
    );
}