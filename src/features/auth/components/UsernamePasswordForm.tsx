import { useState } from "react";
import { FormLabel, ShortTextBox, baseSmallButton } from "../../styles";
import { FormInfo } from "../types/FormInfo";
import styled from "styled-components";

const ErrorText = styled.p`
    margin-bottom: 30px;

    color: ${props => props.theme.tertiaryColor};
`;

const SubmitButton = styled.input`
    ${baseSmallButton};
`;

interface UsernamePasswordFormProps {
    submitText: string,
    onSubmit: (formInfo: FormInfo) => Promise<void>
}

export function UsernamePasswordForm({submitText, onSubmit}: UsernamePasswordFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [waitingForAPI, setWaitingForAPI] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!validateUsername() || !validatePassword()) {
            return;
        }

        setWaitingForAPI(true);
        await onSubmit({
            username: username,
            password: password,
            setErrorMsg: setErrorMsg
        });
        setWaitingForAPI(false);
        setUsername('');
        setPassword('');
    }

    function validateUsername(): boolean {
        const maxLength = +import.meta.env.VITE_USERNAME_MAX_LENGTH;
        if (username.length === 0) {
            setErrorMsg('A username must be provided');
            return false;
        }
        if (username.length > maxLength) {
            setErrorMsg(`Username cannot exceed ${maxLength} characters`);
            return false;
        }
        return true;
    }

    function validatePassword(): boolean {
        const minLength = +import.meta.env.VITE_PASSWORD_MIN_LENGTH;
        const maxLength = +import.meta.env.VITE_PASSWORD_MAX_LENGTH;
        if (password.length === 0) {
            setErrorMsg('A password must be provided');
            return false;
        }
        if (password.length < minLength) {
            setErrorMsg(`Password must be at least ${minLength} characters`);
            return false;
        }
        if (password.length > maxLength) {
            setErrorMsg(`Password cannot exceed ${maxLength} characters`);
            return false;
        }
        if (!(/^[\x00-\x7F]*$/.test(password))) {
            setErrorMsg('Password may only consist of ASCII characters');
            return false;
        }
        return true;
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <FormLabel htmlFor='usernameIn'>Username</FormLabel>
            <ShortTextBox 
                value={username}
                onChange={event => setUsername(event.target.value)}
                name='usernameIn'
                disabled={waitingForAPI}
            />
            <FormLabel htmlFor='passwordIn'>Password</FormLabel>
            <ShortTextBox
                value={password}
                onChange={event => setPassword(event.target.value)}
                name='passwordIn'
                disabled={waitingForAPI}
            />
            {errorMsg.length > 0 && <ErrorText>{errorMsg}</ErrorText>}
            <SubmitButton
                type='submit'
                disabled={waitingForAPI || username.length === 0 || password.length === 0}
                value={submitText}/> 
        </form>
    );
}