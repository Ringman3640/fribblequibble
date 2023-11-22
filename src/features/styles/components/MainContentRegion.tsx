import { styled, CSSProp } from "styled-components";

const RegionContainer = styled.div<{$customCss?: CSSProp}>`
    position: relative;
    margin: auto;
    margin-top: 140px;
    width: var(--main-content-width);
    ${props => props.$customCss};
`;

interface MainContentRegionProps {
    children?: React.ReactNode,
    customCss?: CSSProp
}

export function MainContentRegion({children, customCss}: MainContentRegionProps) {
    return (
        <RegionContainer $customCss={customCss}>
            {children}
        </RegionContainer>
    );
}