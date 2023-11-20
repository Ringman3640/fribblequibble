import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { FetchMethod } from '../types/BackendFetchInfo';
import { DiscussionHead, DiscussionVote } from '../features/discussions';
import { QuibbleList, QuibbleEntryBox, QuibbleInfo } from '../features/quibbles';
import { SectionHeader } from '../features/styles';
import { DiscussionBlobsIcon } from '../features/icons';
import { VisibilityTrigger } from '../components/VisibilityTrigger';
import { NavBar } from '../components/NavBar';
import styled from 'styled-components';

const ContentContainer = styled.div`
    position: relative;
    margin-top: 60px;
`;

const BlobIconContainer = styled.div`
    position: absolute;
    top: -160px;
    left: -300px;
    width: 350px;
    height: 350px;
    z-index: -8;
`;

export default function Discussion() {
    const {id} = useParams();
    const [quibbles, setQuibbles] = useState<QuibbleInfo[]>([]);
    const [quibblesLoading, setQuibblesLoading] = useState<boolean>(false);
    const [quibblesLoadable, setQuibblesLoadable] = useState<boolean>(false);
    const [discussionInfo, discussionError, discussionLoading] = useFetchBackend({
        route: `/discussion/${id}`,
        method: FetchMethod.Get
    });

    useEffect(() => {
        loadNextQuibbles(true);
    }, []);

    function loadNextQuibbles(initialLoad?: boolean) {
        if (quibblesLoading) {
            return;
        }
        if (!quibblesLoadable && !initialLoad) {
            return;
        }
        setQuibblesLoading(true);

        let fetchURL = `${import.meta.env.VITE_BACKEND_URL}/discussion/${id}/quibbles`;
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
            setQuibblesLoadable(json.quibbles.length == import.meta.env.VITE_MAX_QUIBBLES_PER_LOAD);
            for (const quibble of json.quibbles) {
                insertQuibble(quibble);
            }
        })
        .catch(err => {
            setQuibblesLoadable(false);
            console.log(err);
        })
        .finally(() => {
            setQuibblesLoading(false);
        });
    }

    function insertQuibble(newQuibble: QuibbleInfo): void {
        if (!quibbles) {
            return;
        }

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

    function onLoadVisibilityTrigger(isVisible: boolean) {
        if (!isVisible) {
            return;
        }
        loadNextQuibbles();
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
        <NavBar/>
        <ContentContainer>
            <BlobIconContainer>
                <DiscussionBlobsIcon/>
            </BlobIconContainer>
            <DiscussionHead discussionInfo={discussionInfo} discussionId={+id}/>
            <DiscussionVote choices={discussionInfo.choices} discussionId={+id}/>
            <SectionHeader>Discussion</SectionHeader>
            <QuibbleEntryBox discussionId={id} handleAddQuibble={insertQuibble}/>
            {quibbles &&
            <QuibbleList
                quibbles={quibbles}
                discussionChoices={discussionInfo.choices}
            />}
            {quibblesLoadable && <VisibilityTrigger callback={onLoadVisibilityTrigger}/>}
        </ContentContainer>
        </>
    );
}