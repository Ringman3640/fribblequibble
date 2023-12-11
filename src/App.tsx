import { Route, Routes } from 'react-router-dom';
import { LoginInfoWrapper } from './features/auth';
import { ThemeInfoWrapper } from './components/ThemeInfoWrapper.tsx';
import { PopupMessageWrapper } from './components/PopupMessageWrapper.tsx';
import { styled, createGlobalStyle } from 'styled-components';
import Home from './pages/Home.tsx';
import DiscussionSearch from './pages/DiscussionSearch.tsx';
import Discussion from './pages/Discussion.tsx'
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import UserProfile from './pages/UserProfile.tsx';
import CreateDiscussion from './pages/CreateDiscussion.tsx';
import NewUserWelcome from './pages/NewUserWelcome.tsx';
import './global.css';

const BackgroundColor = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -10;
    top: 0px;
    left: 0px;

    background-color: ${props => props.theme.backgroundColor};
`;

const DefaultFontThemes = createGlobalStyle`
    :root {
        color: ${props => props.theme.primaryColorLight};
    }
    h1, h2, h3, h4, h5, h6 {
        color: ${props => props.theme.primaryColor};
    }
    a {
        color: ${props => props.theme.secondaryColor};
        text-decoration: inherit;

        &:visited {
            color: ${props => props.theme.secondaryColor};
        }
        &:hover {
            text-decoration: underline;
        }
    }
    input:focus {
        outline-color: ${props => props.theme.primaryColorLight};
    }
`;

function AppWrapperGrouping({children}: React.PropsWithChildren) {
    return (
        <LoginInfoWrapper>
            <ThemeInfoWrapper>
                <PopupMessageWrapper>
                    {children}
                </PopupMessageWrapper>
            </ThemeInfoWrapper>
        </LoginInfoWrapper>
    );
}

export default function App() {
    return (
        <AppWrapperGrouping>
            <BackgroundColor/>
            <DefaultFontThemes/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/discussion' element={<DiscussionSearch />} />
                <Route path='/discussion/:id' element={<Discussion />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/user/:id' element={<UserProfile />} />
                <Route path='/create' element={<CreateDiscussion />} />
                <Route path='/welcome' element={<NewUserWelcome />} />
            </Routes>
        </AppWrapperGrouping>
    );
}
