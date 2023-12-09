import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { UtilityMenuButton } from "./UtilityMenuButton";
import { styled, css } from "styled-components";

const NavBarContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 20px;
    top: 0px;
    left: 0px;
    right: 0px;
    padding: var(--nav-bar-padding);

    & > * {
        margin-top: auto;
        margin-bottom: auto;

    }
    a {
        text-decoration: none;
        color: inherit;
    }
    a:visited {
        color: inherit;
    }
`;

const LogoText = styled.h2`
    font-family: 'Kreon';

    color: ${props => props.theme.secondaryColor};
`;

const SearchBarContainer = styled.div`
    position: absolute;
    left: 50vw;
    top: calc(var(--nav-bar-height) / 2);
    transform: translate(-50%, -50%);
    width: var(--main-content-width);

    @media only screen and (max-width: 1115px) {
        position: static;
        left: auto;
        top: auto;
        transform: none;
        flex-basis: auto;
        flex: 1 1 auto;
    }
    @media only screen and (max-width: 580px) {
        display: none;
    }
`;

const SearchBarStyle = css`
    width: min(500px, 100%);
`;

const UtilityMenuContainer = styled.div`
    margin-left: auto;
    height: 100%;
`;

const Spacer = styled.div`
    height: var(--nav-bar-height);
`;

interface NavBarProps {
    hideSearchBar?: boolean,
    hideLogo?: boolean,
    hideProfile?: boolean,
    disablePhysicalHeight?: boolean
}

export function NavBar({hideSearchBar, hideLogo, hideProfile, disablePhysicalHeight}: NavBarProps) {
    const navigate = useNavigate();

    function handleSearch(searchPhrase: string): void {
        if (searchPhrase) {
            navigate(`/discussion?search=${searchPhrase}`);
        }
        else {
            navigate(`/discussion`);
        }
    }

    return (
        <>
        <NavBarContainer>
            {!hideLogo &&
            <LogoText>
                <Link to='/discussion'>FribbleQuibble</Link>
            </LogoText>}
            {!hideSearchBar &&
            <SearchBarContainer>
                <SearchBar
                    onSearch={handleSearch}
                    customCss={SearchBarStyle}
                />
            </SearchBarContainer>}
            {!hideProfile &&
            <UtilityMenuContainer>
                <UtilityMenuButton/>
            </UtilityMenuContainer>}
        </NavBarContainer>
        {!disablePhysicalHeight && <Spacer/>}
        </>
    );
}