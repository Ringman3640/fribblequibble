import styled from "styled-components";

const IconSVG = styled.svg`
    color: inherit;
`;

export function MenuIcon() {
    return (
        <IconSVG xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 64 64">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" d="M-3 0h56" transform="translate(7 12)"/>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" d="M-3 0h56" transform="translate(7 32)"/>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="6" d="M-3 0h56" transform="translate(7 52)"/>
        </IconSVG>
    );
}