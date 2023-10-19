import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [waitingForAPI, setWaitingForAPI] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setWaitingForAPI(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            setWaitingForAPI(false);
            if (!('error' in json)) {
                navigate('/');
                return;
            }
            setErrorMsg(json.message);
        })
        .catch(err => {
            setWaitingForAPI(false);
            setErrorMsg('Connection failed. Please try again later.');
            console.error(err);
        })
        .finally(() => {
            setUsername('');
            setPassword('');
        });
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='usernameIn'>Username</label><br />
            <input 
                value={username}
                onChange={event => setUsername(event.target.value)}
                name='usernameIn'
                disabled={waitingForAPI} /><br />
            <label htmlFor='passwordIn'>Password</label><br />
            <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                name='passwordIn'
                disabled={waitingForAPI} /><br /><br />
            <input type='submit' disabled={waitingForAPI} />
        </form>
        {errorMsg.length > 0 && <h3>{errorMsg}</h3>}
        </>
    );
}