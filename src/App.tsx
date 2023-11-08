import { Route, Routes } from 'react-router-dom'
import { LoginInfoWrapper } from './features/auth';
import { ThemeInfoWrapper } from './components/ThemeInfoWrapper.tsx';
import styled from 'styled-components';
import Home from './pages/Home.tsx'
import DiscussionList from './pages/DiscussionList.tsx'
import Discussion from './pages/Discussion.tsx'
import Login from './pages/Login.tsx';
import './global.css';

const MainContentRegion = styled.div`
    margin: auto;
    margin-top: 100px;
    width: var(--main-content-width);
`;

const BackgroundColor = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -10;
    top: 0px;
    left: 0px;

    background-color: ${props => props.theme.backgroundColor};
`;

function AppWrapperGrouping({children}: React.PropsWithChildren) {
    return (
        <LoginInfoWrapper>
            <ThemeInfoWrapper>
                <MainContentRegion>
                    {children}
                </MainContentRegion>
            </ThemeInfoWrapper>
        </LoginInfoWrapper>
    );
}

export default function App() {
    return (
        <AppWrapperGrouping>
            <BackgroundColor/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/discussion' element={<DiscussionList />} />
                <Route path='/discussion/:id' element={<Discussion />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </AppWrapperGrouping>
    );
}
