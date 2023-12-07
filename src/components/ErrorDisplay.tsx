import styled from "styled-components";

const DEFAULT_ERROR_TITLE = 'Uh oh...';

const ContentContainer  = styled.div`
    position: fixed;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    font-size: var(--p-font-size);
    
    color: ${props => props.theme.primaryColorLight};
`;

const ErrorTitle = styled.h1`
    margin-top: var(--section-margin-top);
    margin-bottom: var(--section-margin-bottom);
`;

interface ErrorDisplayProps {
    title?: string,
    children?: React.ReactNode
}

export function ErrorDisplay({title, children}: ErrorDisplayProps) {
    return (
        <ContentContainer>
            <ErrorTitle>{title || DEFAULT_ERROR_TITLE}</ErrorTitle>
            {children}
        </ContentContainer>
    );
}