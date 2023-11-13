import { useEffect, useRef } from "react";
import { styled, keyframes } from "styled-components";

const pop = keyframes`
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(1.2);
    }
    50% {
        transform: scale(1.25);
    }
    70% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`

const wobble = keyframes`
    0% {
        transform: rotate(0);
    }
    20% {
        transform: rotate(18deg);
    }
    25% {
        transform: rotate(20deg);
    }
    30% {
        transform: rotate(18deg);
    }
    50% {
        transform: rotate(0);
    }
    70% {
        transform: rotate(-18deg);
    }
    75% {
        transform: rotate(-20deg);
    }
    80% {
        transform: rotate(-18deg);
    }
    100% {
        transform: rotate(0);
    }
`;

const WobbleWrapper = styled.div`
    &.active {
        animation: ${wobble} 0.2s linear;
    }
`;

const IconSVG = styled.svg`
    display: block;
    transition: color 0.2s;
    color: ${props => props.theme.secondaryColor};

    &.loading {
        color: ${props => props.theme.primaryColorLight};
    }
    &.active {
        animation: ${pop} 0.2s ease-in-out;

        color: ${props => props.theme.tertiaryColor};
    }
`;

interface CondemnIconProps {
    active: boolean,
    loading?: boolean
}

export function CondemnIcon({active, loading}: CondemnIconProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (active) {
            triggerAnimation();
        }
    }, [active])

    function triggerAnimation() {
        if (!svgRef.current) {
            return;
        }
        for (const animateElement of svgRef.current.getElementsByTagName('animate')) {
            animateElement.beginElement();
        }
    }

    let iconStatus: string = '';
    if (loading) {
        iconStatus = 'loading';
    }
    if (active) {
        iconStatus = 'active';
    }

    // SVG raw data copied from /src/assets/graphics/condemn-icon.svg and
    // slightly modified to support JSX
    return (
        <WobbleWrapper className={iconStatus}>
            <IconSVG ref={svgRef} className={iconStatus} id="condemn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                <ellipse id="head-outline" rx="9.686473" ry="9.686473" transform="matrix(1.557858 0 0 1.557858 16 16)" fill="none" stroke="currentColor"/>
                <circle id="eye-left" r="2" cx="10" cy="12" fill="currentColor">
                    <animate
                        attributeName="cy"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="12.2"/>
                </circle>
                <circle id="eye-right" r="2" cx="22" cy="12" fill="currentColor">
                    <animate
                        attributeName="cy"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="12.2"/>
                </circle>
                <path id="mouth" d="M8.130967,18.820509c0,0,2.775702-.510082,7.869032-.510082s7.869032.510082,7.869032.510082" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <animate
                        attributeName="d"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="M10.130968,20.347478c0,0,.775701-3.366637,5.869031-3.366637s5.869031,3.366637,5.869031,3.366637"/>
                    <animateTransform 
                        attributeName="transform"
                        type="translate"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        from="0 1"
                        to="0 1.2"/>
                </path>
                <path id="eyebrow-left" d="M8,7l5,1" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0" strokeLinecap="round">
                    <animate
                        attributeName="opacity"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="1"/>
                    <animate
                        attributeName="d"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="M8,8.5l5,3"/>
                </path>
                <path id="eyebrow-right" d="M24,7l-5,1" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0" strokeLinecap="round">
                    <animate
                        attributeName="opacity"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="1"/>
                    <animate
                        attributeName="d"
                        begin="indefinite"
                        dur="0.2s"
                        fill="freeze"
                        to="M24,8.5l-5,3"/>
                </path>
            </IconSVG>
        </WobbleWrapper>
    );
}