import { useState } from "react";
import { baseSmallButton } from "../../styles";
import { FormInfo } from "../types/FormInfo";
import styled from "styled-components";

const EntryBoxLabel = styled.label`
    display: block;
    font-size: var(--p-font-size);
    margin-bottom: 6px;
    
    color: ${props => props.theme.primaryColor};
`;

const EntryBox = styled.input`
    display: block;
    width: 300px;
    padding: var(--medium-text-padding);
    margin-bottom: 30px;
    border: 0px;
    border-radius: var(--medium-border-radius);
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
`;

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
        console.log('Entering await');
        await onSubmit({
            username: username,
            password: password,
            setErrorMsg: setErrorMsg
        });
        console.log('Exited await');
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
            <EntryBoxLabel htmlFor='usernameIn'>Username</EntryBoxLabel>
            <EntryBox 
                value={username}
                onChange={event => setUsername(event.target.value)}
                name='usernameIn'
                disabled={waitingForAPI}
            />
            <EntryBoxLabel htmlFor='passwordIn'>Password</EntryBoxLabel>
            <EntryBox
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