import { useContext, useState } from "react";
import { QuibbleInfo } from "..";
import LoginInfoContext from "../../../contexts/LoginInfoContext";

interface QuibbleCondemnerProps {
    quibbleInfo: QuibbleInfo,
    handleCondemn: () => void
}

export function QuibbleCondemner({ quibbleInfo, handleCondemn }: QuibbleCondemnerProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [isCondemned, setIsCondemned] = useState(quibbleInfo.condemned);
    const [waitingForApi, setWaitingForAPI] = useState(false);

    function clickHandler() {
        setWaitingForAPI(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/quibble/${quibbleInfo.id}/condemning-user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if ('error' in json) {
                return;
            }
            handleCondemn();
        })
        .finally(() => {
            setIsCondemned(true);
            setWaitingForAPI(false);
        });
    }

    return (
        <button 
            disabled={isCondemned || !loginInfo || waitingForApi} 
            onClick={clickHandler}>
            Condemn
        </button>
    );
}