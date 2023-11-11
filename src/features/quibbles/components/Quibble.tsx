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
    justify-content: space-between;
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
                <p><small>{formatTimestamp(quibbleInfo.timestamp)}</small></p>
                <p>{quibbleInfo.condemns}</p>
            </DateCondemnRow>
        </QuibbleContainer>
    );

    return (
        <div>
            <h2>Quibble ID: {quibbleInfo.id}</h2>
            <h2>Author: {quibbleInfo.authorName}</h2>
            <h2>Author ID: {quibbleInfo.authorId}</h2>
            <h2>Date: {quibbleInfo.timestamp}</h2>
            <h2>Choice ID: {quibbleInfo.choiceId || 'None'}</h2>
            <h2>Content: {quibbleInfo.content}</h2>
            <h2>Condemns: {condemnCount}</h2>
            <h2>Condemned: {quibbleInfo.condemned ? "True" : "False"}</h2>
            <QuibbleCondemner
                quibbleInfo={quibbleInfo}
                handleCondemn={increaseCondemnCount}
            />
            <p><br /></p>
        </div>
    );
}