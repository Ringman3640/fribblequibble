import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { styled, css } from "styled-components";

const NavBarContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 20px;
    top: 0px;
    left: 0px;
    right: 0px;
    height: var(--nav-bar-height);
    padding: var(--nav-bar-padding);
    overflow: hidden;

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
`;

const SearchBarStyle = css`
    width: 500px;
`;

const ProfileText = styled.h2`
    margin-left: auto;
`;

const Spacer = styled.div`
    height: var(--nav-bar-height);
`;

interface NavBarProps {
    hideSearchBar?: boolean
}

export function NavBar({hideSearchBar}: NavBarProps) {
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
            <LogoText>
                <Link to='/'>FribbleQuibble</Link>
            </LogoText>
            {!hideSearchBar &&
            <SearchBarContainer>
                <SearchBar
                    onSearch={handleSearch}
                    customCss={SearchBarStyle}
                />
            </SearchBarContainer>}
            <ProfileText>GRAAAAA</ProfileText>
        </NavBarContainer>
        <Spacer/>
        </>
    );
}