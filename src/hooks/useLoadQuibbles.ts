import { useState } from "react";
import { QuibbleInfo } from "../features/quibbles";

interface useLoadQuibblesProps {
    type: 'Discussion' | 'Profile',
    identifier: string
}

export function useLoadQuibbles({type, identifier}: useLoadQuibblesProps) {
    const [quibbles, setQuibbles] = useState<QuibbleInfo[]>([]);
    const [quibblesLoading, setQuibblesLoading] = useState<boolean>(false);
    const [quibblesLoadable, setQuibblesLoadable] = useState<boolean>(false);

    function loadNextQuibbles(initialLoad?: boolean) {
        if (quibblesLoading) {
            return;
        }
        if (!quibblesLoadable && !initialLoad) {
            return;
        }
        setQuibblesLoading(true);

        let fetchURL: string = import.meta.env.VITE_BACKEND_URL;
        if (type === 'Discussion') {
            fetchURL += `/discussion/${identifier}/quibbles`;
        }
        else {
            fetchURL += `/user/${identifier}/quibbles`;
        }
        if (quibbles.length > 0) {
            const afterQuibbleId = quibbles[quibbles.length - 1].id;
            fetchURL += `?after-quibble-id=${afterQuibbleId}`;
        }
        fetch(fetchURL, {
            method: 'GET',
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
            setQuibblesLoadable(json.quibbles.length === +import.meta.env.VITE_MAX_QUIBBLES_PER_LOAD);
            for (const quibble of json.quibbles) {
                insertQuibble(quibble);
            }
        })
        .catch(err => {
            console.error(err);
            setQuibblesLoadable(false);
        })
        .finally(() => {
            setQuibblesLoading(false);
        });
    }

    function insertQuibble(newQuibble: QuibbleInfo): void {
        setQuibbles(prev => {
            let inserted = false;
            const updatedQuibbles = new Array();
            for (const quibble of prev || quibbles) {
                if (quibble.id === newQuibble.id) {
                    return prev || quibbles;
                }
                if (!inserted && BigInt(quibble.id) < BigInt(newQuibble.id)) {
                    updatedQuibbles.push(newQuibble);
                    inserted = true;
                }
                updatedQuibbles.push(quibble);
            }
            if (!inserted) {
                updatedQuibbles.push(newQuibble);
            }

            return updatedQuibbles;
        });
    }

    return {quibbles, quibblesLoading, quibblesLoadable, loadNextQuibbles};
}