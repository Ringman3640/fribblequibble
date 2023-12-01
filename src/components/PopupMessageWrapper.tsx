import { useEffect, useRef, useState } from "react";
import { PopupMessageContext } from "../contexts/PopupMessageContext";
import styled from "styled-components";

const POPUP_DURATION_MS = 2000;

const PopupMessageContainer = styled.div`
    position: fixed;
    bottom: 10vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    padding: var(--medium-text-padding);
    border-radius: var(--medium-border-radius);
    opacity: 0.8;

    background-color: ${props => props.theme.primaryColor};
    
    p {
        color: ${props => props.theme.backgroundColorLight};
    }

    &.visible {
        transition: opacity 0.2s;
        opacity: 0.8;

        &:hover {
            cursor: pointer;
        }

        p {
            transition: inherit;
            opacity: 1;
        }
    }

    &.invisible {
        pointer-events: none;
        transition: opacity 1s;
        opacity: 0;

        p {
            transition: inherit;
            opacity: 0;
        }
    }
`;

export function PopupMessageWrapper({children}: React.PropsWithChildren) {
    const [popupMessage, setPopupMessage] = useState<string>('');
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const timeout = useRef<number | null>(null);

    useEffect(() => {console.log(popupMessage)}, [popupMessage]);

    useEffect(() => {
        if (popupVisible) {
            applyDisappearTimeout();
        }
    }, [popupVisible]);

    function applyDisappearTimeout() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            setPopupVisible(false);
            timeout.current = null;
        }, POPUP_DURATION_MS);
    }

    function showPopupMessage(message: string): void {
        setPopupMessage(message);
        setPopupVisible(true);
        applyDisappearTimeout();
    }

    return (
        <PopupMessageContext.Provider value={{setPopupMessage: showPopupMessage}}>
            {children}
            <PopupMessageContainer
                className={popupVisible? 'visible' : 'invisible'}
                onClick={() => setPopupVisible(false)}>
                <p>{popupMessage}</p>
            </PopupMessageContainer>
        </PopupMessageContext.Provider>
    );
}