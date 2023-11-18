import styled from "styled-components";

const IconSVG = styled.svg`
    width: 100%;
    height: 100%;
`;

export function SearchIcon() {
    return (
        <IconSVG xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 32 32">
            <g fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-45 16 16)">
                <circle r="7.5" transform="matrix(.93 0 0 .93 16 10)"/>
                <path strokeLinecap="round" d="M0-6V8" transform="matrix(-1 0 0 .83 16 22)"/>
            </g>
        </IconSVG>
    );
}