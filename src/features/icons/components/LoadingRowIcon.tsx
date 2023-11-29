import { LoadingBlobIcon } from "..";
import { styled, keyframes } from "styled-components";

const appear = keyframes`
    from {
        color: transparent;
    }
    to {
        color: inherit;
    }
`;

const IconContainer = styled.div<{$animDelay: number}>`
    display: flex;
    color: inherit;

    &.delay {
        color: transparent;
        animation: ${appear} 0.5s;
        animation-delay: ${props => props.$animDelay + 's'};
        animation-fill-mode: forwards;
    }
`;

const SingleBlobContainer = styled.div`
    width: 32px;
    height: 32px;
`;

interface LoadingRowIconProps {
    visibilityDelay?: number
}

export function LoadingRowIcon({visibilityDelay}: LoadingRowIconProps) {
    return (
        <IconContainer
            className={visibilityDelay ? 'delay' : undefined}
            $animDelay={visibilityDelay || 0}>
            <SingleBlobContainer>
                <LoadingBlobIcon delaySeconds={0}/>
            </SingleBlobContainer>
            <SingleBlobContainer>
                <LoadingBlobIcon delaySeconds={0.1}/>
            </SingleBlobContainer>
            <SingleBlobContainer>
                <LoadingBlobIcon delaySeconds={0.2}/>
            </SingleBlobContainer>
        </IconContainer>
    );
}