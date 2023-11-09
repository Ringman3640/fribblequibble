import styled from "styled-components";

const ContentContainer = styled.div`
    p {
        text-align: center;
        margin-top: 10px;
    }
`;

interface ChoiceResultsDisplayProps {
    voteCount: number | undefined
}

export function ChoiceResultsDisplay({voteCount}: ChoiceResultsDisplayProps) {
    if (voteCount === undefined) {
        return <></>;
    }

    return (
        <ContentContainer>
            <p>{voteCount} {voteCount === 1 ? 'Vote' : 'Votes'}</p>
        </ContentContainer>
    );
}