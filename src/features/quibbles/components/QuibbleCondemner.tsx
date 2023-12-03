import { useContext, useState } from "react";
import { QuibbleInfo } from "..";
import { LoginInfoContext } from "../../auth";
import { CondemnIcon } from "../../icons";
import styled from "styled-components";
import { PopupMessageContext } from "../../../contexts/PopupMessageContext";

const CondemnButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: auto;
    padding: 0px;
    border: 0px;
    border-radius: 1000px;

    &:enabled {
        cursor: pointer;
    }
    &:disabled {
        background-color: transparent;
    }
`;

interface QuibbleCondemnerProps {
    quibbleInfo: QuibbleInfo,
    handleCondemn: () => void,
    visualOnly?: boolean
}

export function QuibbleCondemner({quibbleInfo, handleCondemn, visualOnly}: QuibbleCondemnerProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const {setPopupMessage} = useContext(PopupMessageContext);
    const [isCondemned, setIsCondemned] = useState<boolean | undefined>(quibbleInfo.condemned);
    const [waitingForApi, setWaitingForAPI] = useState<boolean>(false);

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
            setIsCondemned(true);
            if (!('error' in json)) {
                handleCondemn();
            }
        })
        .catch(err => {
            console.error(err);
            setPopupMessage('Could not condemn quibble, please try again later');
        })
        .finally(() => {
            setWaitingForAPI(false);
        });
    }

    return (
        <CondemnButton 
            disabled={isCondemned || !loginInfo || waitingForApi || visualOnly}
            onClick={clickHandler}>
            <CondemnIcon 
                active={isCondemned || false}
                loading={waitingForApi || visualOnly}
            />
        </CondemnButton>
    );
}