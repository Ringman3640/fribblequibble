import styled from "styled-components";

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

export enum ErrorDisplayType {
    Invalid = 'Invalid',
    Unauthorized = 'Unauthorized',
    NotFound = 'Not found',
    ServerError = 'Server error',
    Unspecified = 'Uh oh...'
}

interface ErrorDisplayProps {
    title?: ErrorDisplayType,
    children?: React.ReactNode
}

export function ErrorDisplay({title, children}: ErrorDisplayProps) {
    return (
        <ContentContainer>
            <ErrorTitle>{title || ErrorDisplayType.Unspecified}</ErrorTitle>
            {children}
        </ContentContainer>
    );
}