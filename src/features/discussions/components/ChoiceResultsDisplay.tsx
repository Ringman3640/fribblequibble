import { useEffect, useRef } from "react";
import { ChoiceVoteInfo } from "..";
import { styled, keyframes, useTheme } from "styled-components";

const FADE_DROPDOWN_SECONDS = 0.4;

const fadeDropdown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const ContentContainer = styled.div`
    z-index: -1;
    animation: ${fadeDropdown} ${FADE_DROPDOWN_SECONDS}s ease-out;

    p {
        text-align: center;
        margin-top: 10px;
    }
`;

const PercentBarContainer = styled.div`
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    height: 100px;
    
    canvas {
        width: 100%;
        height: 100%;
    }
    p {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        margin: 0px;
        width: 100%;
        text-align: center;
    }
`

interface ChoiceResultsDisplayProps {
    voteInfo: ChoiceVoteInfo
}

export function ChoiceResultsDisplay({voteInfo}: ChoiceResultsDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const theme = useTheme();

    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        const context = canvasRef.current.getContext('2d')!;
        drawPercentGraphic(context, 0);
        setTimeout(() => {
            animatePercentGraphic(context, voteInfo.votePercent);
        }, FADE_DROPDOWN_SECONDS * 500);
        
    }, []);

    function animatePercentGraphic(canvasContext: CanvasRenderingContext2D, percent: number) {
        const animationDurationMs = 600;
        const startTime = Date.now();
        const endTime = startTime + animationDurationMs;

        function animationIteration() {
            if (Date.now() >= endTime) {
                drawPercentGraphic(canvasContext, percent);
                return;
            }

            const animationTime = Date.now() - startTime;
            const animationPercent = easeInOutValue(animationTime / animationDurationMs);
            drawPercentGraphic(canvasContext, animationPercent * percent);
            setTimeout(animationIteration, 10);
        }

        animationIteration();
    }

    function drawPercentGraphic(canvasContext: CanvasRenderingContext2D, percent: number) {
        canvasContext.lineWidth = 20;

        // Base circle
        canvasContext.strokeStyle = theme.backgroundColorDark;
        canvasContext.beginPath();
        canvasContext.arc(100, 100, 90, 0, 2 * Math.PI);
        canvasContext.stroke();

        // Percent circle
        canvasContext.strokeStyle = theme.tertiaryColor;
        canvasContext.beginPath();
        canvasContext.arc(100, 100, 90, -Math.PI / 2, ((percent / 100) * (2 * Math.PI)) - Math.PI / 2);
        canvasContext.stroke();
    }

    return (
        <ContentContainer>
            <p>{voteInfo.voteCount} {voteInfo.voteCount === 1 ? 'Vote' : 'Votes'}</p>
            <PercentBarContainer>
                <canvas ref={canvasRef} width={200} height={200}></canvas>
                <p>{voteInfo.votePercent}%</p>
            </PercentBarContainer>
        </ContentContainer>
    );
}

// Easing function for values between 0 and 1. Easing function taken from:
// https://stackoverflow.com/a/30007935
function easeInOutValue(value: number) {
    if (value < 0) {
        return 0;
    }
    if (value > 1) {
        return 1;
    }

    return 1 - ((Math.cos(Math.PI * value) + 1) / 2);
}