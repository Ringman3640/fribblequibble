import { useContext, useState } from "react";
import LoginInfoContext from "../../../contexts/LoginInfoContext";
import { QuibbleInfo } from "..";

interface QuibbleEntryBoxProps {
    discussionId: string | undefined,
    handleAddQuibble: (a: QuibbleInfo) => void
}

export function QuibbleEntryBox({ discussionId, handleAddQuibble }: QuibbleEntryBoxProps) {
    const [quibbleEntry, setQuibbleEntry] = useState<string>('');
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const {loginInfo} = useContext(LoginInfoContext);
    const maxQuibbleLen = import.meta.env.VITE_QUIBBLE_MAX_LEN;

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!loginInfo || !discussionId) {
            return;
        }
        if (quibbleEntry.length > maxQuibbleLen) {
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

    if (loginInfo === null) {
        return (
            <div>
                Login or signup to join the discussion
            </div>
        );
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='quibbleTextArea'>Add Quibble</label><br />
            <textarea 
                id='quibbleTextArea' 
                name='quibbleTextArea'
                onChange={event => setQuibbleEntry(event.target.value)}
                value={quibbleEntry}/>
            <p>
                {quibbleEntry.length}/{maxQuibbleLen}
            </p>
            <input
                type='submit' 
                disabled={quibbleEntry.length > maxQuibbleLen || waitingAPI}/>
        </form>
    );
}