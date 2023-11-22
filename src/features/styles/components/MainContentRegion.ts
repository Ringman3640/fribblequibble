import { styled, CSSProp } from "styled-components";

export const MainContentRegion = styled.div<{customCss?: CSSProp}>`
    position: relative;
    margin: auto;
    margin-top: 140px;
    width: var(--main-content-width);
    ${props => props.customCss}
`;