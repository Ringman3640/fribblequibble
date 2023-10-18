import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchBackend from '../hooks/useFetchBackend';
import { FetchMethod } from '../types/BackendFetchInfo';
import { DiscussionHead } from '../features/discussions';
import { DiscussionVote } from '../features/discussions';
import { QuibbleList, QuibbleEntryBox, QuibbleInfo } from '../features/quibbles';

export default function Discussion() {
    const {id} = useParams();
    const [quibbles, setQuibbles] = useState<QuibbleInfo[] | undefined | null>(undefined);
    const [discussionInfo, discussionError, discussionLoading] = useFetchBackend({
        route: `/discussion/${id}`,
        method: FetchMethod.Get
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${id}/quibbles`, {
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
            setQuibbles(json.quibbles);
        })
        .catch(err => {
            setQuibbles(null);
            console.log(err);
        });
    }, []);

    function insertQuibble(newQuibble: QuibbleInfo): void {
        if (!quibbles) {
            return;
        }

        let inserted = false;
        const updatedQuibbles = new Array();
        for (const quibble of quibbles) {
            if (quibble.id === newQuibble.id) {
                return;
            }
            if (!inserted && quibble.id < newQuibble.id) {
                updatedQuibbles.push(newQuibble);
                inserted = true;
            }
            updatedQuibbles.push(quibble);
        }

        setQuibbles(updatedQuibbles);
    }

    if (!id) {
        return (
            <h1>Discussion ID not provided</h1>
        );
    }

    if (discussionLoading) {
        return (
            <h1>Discussion Loading</h1>
        );
    }

    if (discussionError) {
        return (
            <h1>Could Not Access Discussion</h1>
        );
    }

    return (
        <>
        <h1>Discussion Page</h1>
        <DiscussionHead discussionInfo={discussionInfo}/>
        <DiscussionVote choices={discussionInfo.choices} discussionId={+id}/>
        <QuibbleEntryBox discussionId={id} handleAddQuibble={insertQuibble}/>
        {quibbles && <QuibbleList quibbles={quibbles}/>}
        </>
    );
}