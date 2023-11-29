import { LoadingBlobIcon } from "..";
import { styled, keyframes, CSSProp } from "styled-components";

const appear = keyframes`
    from {
        color: transparent;
    }
    to {
        color: inherit;
    }
`;

const IconContainer = styled.div<{$animDelay: number, $customStyle: CSSProp}>`
    display: flex;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    color: inherit;

    &.delay {
        color: transparent;
        animation: ${appear} 0.5s;
        animation-delay: ${props => props.$animDelay + 's'};
        animation-fill-mode: forwards;
    }

    ${props => props.$customStyle};
`;

const SingleBlobContainer = styled.div`
    width: 32px;
    height: 32px;
`;

interface LoadingRowIconProps {
    visibilityDelay?: number,
    customCss?: CSSProp
}

export function LoadingRowIcon({visibilityDelay, customCss}: LoadingRowIconProps) {
    return (
        <IconContainer
            className={visibilityDelay !== undefined ? 'delay' : undefined}
            $animDelay={visibilityDelay || 0}
            $customStyle={customCss}>
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