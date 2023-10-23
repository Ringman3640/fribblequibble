import { Route, Routes } from 'react-router-dom'
import { LoginInfoWrapper } from './features/auth';
import Home from './pages/Home.tsx'
import DiscussionList from './pages/DiscussionList.tsx'
import Discussion from './pages/Discussion.tsx'
import Login from './pages/Login.tsx';

export default function App() {
    return (
        <LoginInfoWrapper>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/discussion' element={<DiscussionList />} />
                <Route path='/discussion/:id' element={<Discussion />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </LoginInfoWrapper>
    );
}
