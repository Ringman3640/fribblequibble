import { useNavigate } from "react-router-dom";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { FormInfo } from "../types/FormInfo";

export function LoginForm() {
    const navigate = useNavigate();

    async function handleSubmit(formInfo: FormInfo): Promise<void> {
        return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': formInfo.username,
                'password': formInfo.password
            })
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if (!('error' in json)) {
                navigate('/');
                return;
            }
            formInfo.setErrorMsg(json.message);
        })
        .catch(err => {
            formInfo.setErrorMsg('Connection failed; please try again later');
            console.error(err);
        });
    }
    
    return (
        <UsernamePasswordForm submitText='Login' onSubmit={handleSubmit}/>
    );
}