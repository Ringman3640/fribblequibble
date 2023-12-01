import { useNavigate } from "react-router-dom";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { FormInfo } from "../types/FormInfo";

export function SignUpForm() {
    const navigate = useNavigate();

    async function handleSubmit(formInfo: FormInfo): Promise<void> {
        return fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
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
            if ('error' in json) {
                formInfo.setErrorMsg(json.message);
                return;
            }
            navigate('/discussion');
        })
        .catch(err => {
            formInfo.setErrorMsg('Connection failed; please try again later');
            console.error(err);
        });
    }

    return (
        <UsernamePasswordForm submitText='Sign Up' onSubmit={handleSubmit}/>
    );
}