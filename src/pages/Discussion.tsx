import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { FetchMethod } from '../types/BackendFetchInfo';
import { DiscussionHead, DiscussionVote } from '../features/discussions';
import { QuibbleList, QuibbleEntryBox, QuibbleInfo } from '../features/quibbles';
import { MainContentRegion, SectionHeader } from '../features/styles';
import { DiscussionBlobsIcon } from '../features/icons';
import { VisibilityTrigger } from '../components/VisibilityTrigger';
import { NavBar } from '../components/NavBar';
import { styled, css } from 'styled-components';

const BlobIconContainer = styled.div`
    position: absolute;
    top: -150px;
    left: -260px;
    width: 300px;
    height: 300px;
    z-index: -8;
`;

const QuibbleListStyle = css`
    margin-top: 30px;  
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

    if (!id || discussionError) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                <h1>{!id ? 'Discussion ID not provided' : 'Could not access discussion'}</h1>
            </MainContentRegion>
            </>
        );
    }

    if (discussionLoading) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                {/* TODO: add loading icon or something */}
            </MainContentRegion>
            </>
        );
    }

    return (
        <>
        <NavBar/>
        <MainContentRegion>
            <BlobIconContainer>
                    <DiscussionBlobsIcon/>
            </BlobIconContainer>
            <DiscussionHead discussionInfo={discussionInfo}/>
            <DiscussionVote
                choices={discussionInfo.choices}
                discussionId={+id}
            />
            <SectionHeader>Discussion</SectionHeader>
            <QuibbleEntryBox
                discussionId={id}
                handleAddQuibble={insertQuibble}
            />
            {quibbles &&
            <QuibbleList
                quibbles={quibbles}
                discussionChoices={discussionInfo.choices}
                customCss={QuibbleListStyle}
            />}
            {quibblesLoadable && 
            <VisibilityTrigger callback={onLoadVisibilityTrigger}/>}
        </MainContentRegion>
        </>
    );
}