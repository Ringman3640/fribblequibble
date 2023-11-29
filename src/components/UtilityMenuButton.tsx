import { useEffect, useState } from "react";
import { MenuIcon } from "../features/icons";
import { UtilityMenu } from "./UtilityMenu";
import { styled, css } from "styled-components";

const ContentContainer = styled.div`
    position: relative;
`;

const MenuIconButton = styled.button`
    object-fit: contain;
    width: var(--h3-font-size);
    height: var(--h3-font-size);
    border: 0px;
    padding: 0px;
    background-color: transparent;
    transition: color 0.2s;

    color: ${props => props.theme.secondaryColor};

    &:enabled:hover {
        cursor: pointer;
    }
    &:disabled {
        color: ${props => props.theme.backgroundColor};
    }
`;

const UtilityMenuStyle = css`
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    z-index: 2;
`;

const UtitliyMenuBackdrop = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 1;
    transition: all 0.2s;
    background-color: transparent;

    &.active {
        pointer-events: none;
    }
`;

export function UtilityMenuButton() {
    const [menuHidden, setMenuHidden] = useState<boolean>(true);

    useEffect(() => {
        function onScroll() {
            menuHidden && setMenuHidden(true);
        }
        
        document.addEventListener('scroll', onScroll);

        return (() => {
            document.removeEventListener('scroll', onScroll);
        })
    }, []);

    return (
        <ContentContainer>
            <MenuIconButton
                onClick={() => {setMenuHidden(false)}}
                disabled={!menuHidden}>
                <MenuIcon/>
            </MenuIconButton>
            <UtilityMenu
                hidden={menuHidden}
                customCss={UtilityMenuStyle}
            />
            <UtitliyMenuBackdrop
                className={menuHidden ? 'active' : undefined}
                onClick={() => {setMenuHidden(true)}}>
            </UtitliyMenuBackdrop>
        </ContentContainer>
    );
}