import { useContext, useEffect, useRef, useState } from "react";
import { LoginInfoContext } from "../../auth";
import { QuibbleInfo } from "..";
import { styled, css } from "styled-components";

const MAX_QUIBBLE_LEN = import.meta.env.VITE_QUIBBLE_MAX_LEN;
const MIN_ENTRY_BOX_HEIGHT = 100;

const BaseEntryBox = css`
    width: 100%;
    border-radius: 26px;
    overflow: hidden;
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
`;

const UnauthorizedEntryBox = styled.div`
    ${BaseEntryBox};
    padding: 20px;
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
        padding: 20px;
        padding-bottom: 20px;
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
    position: absolute;
    right: 0px;
    bottom: 0px;
    font-size: var(--p-font-size);
    border: none;
    border-radius: 0.6rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right: 20px;
    margin-bottom: 10px;
    transition: background-color 0.1s;

    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.backgroundColorLight};

    &:enabled:hover {
        cursor: pointer;
    }

    &:disabled {
        background-color: ${props => props.theme.primaryColorLight};
    }
`

interface QuibbleEntryBoxProps {
    discussionId: string | undefined,
    handleAddQuibble: (a: QuibbleInfo) => void
}

export function QuibbleEntryBox({ discussionId, handleAddQuibble }: QuibbleEntryBoxProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [quibbleEntry, setQuibbleEntry] = useState<string>('');
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const entryBoxRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        window.addEventListener('resize', resizeEntryBoxHeight);

        return () => {
            window.removeEventListener('resize', resizeEntryBoxHeight);
        };
    }, []);

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
            return res.json();
        })
        .then(json => {
            handleAddQuibble(json);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            setQuibbleEntry('');
            setWaitingAPI(false);
        });
    }

    function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let nextValue = event.target.value;
/*         if (nextValue.length > MAX_QUIBBLE_LEN) {
            nextValue = event.target.value.substring(0, MAX_QUIBBLE_LEN);
        } */
        setQuibbleEntry(nextValue);
        resizeEntryBoxHeight();
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
                Login or signup to join the discussion
            </UnauthorizedEntryBox>
        );
    }

    return (
        <EntryBoxForm onSubmit={handleSubmit}>
            <textarea 
                ref={entryBoxRef}
                name='quibbleTextArea'
                onChange={handleOnChange}
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