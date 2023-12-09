import { styled, CSSProp } from "styled-components";

const RegionContainer = styled.div<{$customCss?: CSSProp}>`
    position: relative;
    margin: auto;
    margin-top: 140px;
    width: var(--main-content-width);
    ${props => props.$customCss};

    @media only screen and (max-width: 950px) {
        margin-top: 80px;
    }
    @media only screen and (max-width: 480px) {
        margin-top: 40px;
    }
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