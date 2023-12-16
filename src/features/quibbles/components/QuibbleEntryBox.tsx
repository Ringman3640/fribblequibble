import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../../auth";
import { PopupMessageContext } from "../../../contexts/PopupMessageContext";
import { QuibbleInfo } from "..";
import { baseSmallButton } from "../../styles";
import { styled, css } from "styled-components";

const MAX_QUIBBLE_LEN = import.meta.env.VITE_QUIBBLE_MAX_LEN;
const MIN_ENTRY_BOX_HEIGHT = 100;

const BaseEntryBox = css`
    width: 100%;
    border-radius: var(--large-border-radius);
    overflow: hidden;
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
`;

const UnauthorizedEntryBox = styled.div`
    ${BaseEntryBox};
    padding: var(--large-text-padding);
`;

const EntryBoxForm = styled.form`
    ${BaseEntryBox};
    position: relative;

    textarea {
        resize: none;
        width: 100%;
        height: ${MIN_ENTRY_BOX_HEIGHT + 'px'};
        border: none;
        outline: none;
        padding: var(--large-text-padding);
        overflow: hidden;

        background-color: ${props => props.theme.backgroundColorLight};
        color: ${props => props.theme.primaryColorLight};
    }
`;

const CharCounter = styled.p`
    position: absolute;
    left: 0px;
    bottom: 0px;
    margin-left: 20px;
    margin-bottom: 10px;

    &.overflow {
        color: ${props => props.theme.tertiaryColor};
    }
`;

const InputButton = styled.input`
    ${baseSmallButton}
    position: absolute;
    right: 0px;
    bottom: 0px;
    margin-right: 20px;
    margin-bottom: 10px;
`;

interface QuibbleEntryBoxProps {
    discussionId: string | undefined,
    handleAddQuibble: (a: QuibbleInfo) => void
}

export function QuibbleEntryBox({ discussionId, handleAddQuibble }: QuibbleEntryBoxProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const {setPopupMessage} = useContext(PopupMessageContext);
    const [quibbleEntry, setQuibbleEntry] = useState<string>('');
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const entryBoxRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        window.addEventListener('resize', resizeEntryBoxHeight);

        return () => {
            window.removeEventListener('resize', resizeEntryBoxHeight);
        };
    }, []);
    
    useEffect(() => {
        resizeEntryBoxHeight();
    }, [quibbleEntry]);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!loginInfo || !discussionId) {
            return;
        }
        if (quibbleEntry.length > MAX_QUIBBLE_LEN || quibbleEntry.length === 0) {
            return;
        }
        
        setWaitingAPI(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/quibble`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'discussion-id': discussionId,
                'content': quibbleEntry
            })
        })
        .then(res => {
            if (res.status === 429) {
                return Promise.reject(429);
            }
            return res.json();
        })
        .then(json => {
            handleAddQuibble(json);
            setQuibbleEntry('');
            setPopupMessage('Quibble sent');
        })
        .catch(err => {
            if (err === 429) {
                setPopupMessage('Please wait before sending another quibble');
                return;
            }
            console.error(err);
            setPopupMessage('An error has occured, please try again later');
        })
        .finally(() => {
            setWaitingAPI(false);
        });
    }

    // Resize the entry box reference height to fit the text contents
    function resizeEntryBoxHeight() {
        if (entryBoxRef.current === null) {
            return;
        }
        entryBoxRef.current.style.height = '0px';
        const nextHeight = Math.max(entryBoxRef.current.scrollHeight + 20, MIN_ENTRY_BOX_HEIGHT);
        entryBoxRef.current.style.height = nextHeight + 'px';
    }

    if (loginInfo === null) {
        return (
            <UnauthorizedEntryBox>
                <Link to='/login'>Login</Link> or <Link to='/signup'>sign up</Link> to join the discussion
            </UnauthorizedEntryBox>
        );
    }

    return (
        <EntryBoxForm onSubmit={handleSubmit}>
            <textarea 
                ref={entryBoxRef}
                name='quibbleTextArea'
                onChange={event => setQuibbleEntry(event.target.value)}
                placeholder='Add a quibble . . .'
                value={quibbleEntry}
            />
            <CharCounter className={quibbleEntry.length > MAX_QUIBBLE_LEN ? 'overflow' : undefined}>
                <small>{quibbleEntry.length}/{MAX_QUIBBLE_LEN}</small>
            </CharCounter>
            <InputButton
                type='submit' 
                disabled={quibbleEntry.length > MAX_QUIBBLE_LEN
                    || quibbleEntry.length <= 0
                    || waitingAPI}
            />
        </EntryBoxForm>
    );
}