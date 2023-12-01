import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { FormInfo } from "../types/FormInfo";
import { LoginInfoContext } from "..";

export function LoginForm() {
    const {refreshLoginInfo} = useContext(LoginInfoContext);
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
            if (res.status === 429) {
                return Promise.reject(429);
            }
            return res.json();
        })
        .then(json => {
            if ('error' in json) {
                formInfo.setErrorMsg(json.message);
                return;
            }
            refreshLoginInfo();
            navigate('/discussion');
        })
        .catch(err => {
            if (err === 429) {
                formInfo.setErrorMsg('Too many attempts, please try again in a few minutes');
            }
            else {
                formInfo.setErrorMsg('Connection failed, please try again later');
                console.error(err);
            }
        });
    }
    
    return (
        <UsernamePasswordForm submitText='Login' onSubmit={handleSubmit}/>
    );
}