import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInfoContext } from "../features/auth";
import { styled, CSSProp } from "styled-components";

const MenuContainer = styled.div<{$customCss: CSSProp}>`
    position: absolute;
    top: 0px;
    right: 0px;
    min-width: 240px;
    max-width: 320px;
    border-radius: var(--large-border-radius);
    padding: var(--large-text-padding);
    padding-left: calc(var(--large-text-padding) - var(--small-text-padding));
    padding-right: calc(var(--large-text-padding) - var(--small-text-padding));
    transition: all 0.2s;

    background-color: ${props => props.theme.backgroundColorLight};

    & > * {
        padding-left: var(--small-text-padding);
        padding-right: var(--small-text-padding);
    }
    &.hidden {
        opacity: 0;
        pointer-events: none;
        transform: translateY(-20px);
    }

    ${props => props.$customCss};
`;

const LoggedInAsText = styled.p`
    font-size: var(--small-font-size);  
`;

const UsernameText = styled.h3`
    margin-bottom: 10px;
`;

const MenuButton = styled.button`
    display: block;
    text-align: left;
    font-size: var(--p-font-size);
    width: 100%;
    border: 0px;
    border-radius: var(--small-border-radius);
    padding: var(--small-text-padding);
    background-color: transparent;

    color: ${props => props.theme.secondaryColor};

    &:hover {
        text-decoration: none;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

interface UtilityMenuProps {
    hidden?: boolean,
    className?: string,
    customCss?: CSSProp
}

export function UtilityMenu({hidden, customCss}: UtilityMenuProps) {
    const {loginInfo, clearLoginInfo} = useContext(LoginInfoContext);
    const navigate = useNavigate();

    return (
        <MenuContainer
            className={hidden ? 'hidden' : undefined}
            $customCss={customCss}>
            {loginInfo && <>
                <LoggedInAsText>Logged in as</LoggedInAsText>
                <UsernameText>{loginInfo.username}</UsernameText>
                <MenuButton
                    onClick={() => {navigate(`/user/${loginInfo.id}`)}}>
                    Profile
                </MenuButton>
                <MenuButton
                    onClick={clearLoginInfo}>
                    Logout
                </MenuButton>
            </>}
            {loginInfo === null && <>
                <MenuButton
                    onClick={() => {navigate('/login')}}>
                    Login
                </MenuButton>
            </>}
            {loginInfo === undefined && <>
                {/* TODO: Add loading symbol */}
            </>}
        </MenuContainer>
    );
}