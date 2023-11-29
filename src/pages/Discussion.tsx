import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { useLoadQuibbles } from '../hooks/useLoadQuibbles';
import { FetchMethod } from '../types/BackendFetchInfo';
import { DiscussionHead, DiscussionVote } from '../features/discussions';
import { QuibbleList, QuibbleEntryBox, QuibbleInfo } from '../features/quibbles';
import { MainContentRegion, SectionHeader } from '../features/styles';
import { DiscussionBlobsIcon, LoadingRowIcon } from '../features/icons';
import { VisibilityTrigger } from '../components/VisibilityTrigger';
import { NavBar } from '../components/NavBar';
import { styled, css } from 'styled-components';

const CenteredContainer = styled.div`
    position: fixed;
    top: 50vh;  
    left: 50vw;
    transform: translate(-50%, -50%);
`;

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
    const [discussionInfo, discussionError, discussionLoading] = useFetchBackend({
        route: `/discussion/${id}`,
        method: FetchMethod.Get
    });
    const {quibbles, quibblesLoading, quibblesLoadable, loadNextQuibbles, insertQuibble} = useLoadQuibbles({
        type: 'Discussion',
        identifier: id || '-1'
    });

    useEffect(() => {
        loadNextQuibbles(true);
    }, []);

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
                <CenteredContainer>
                    <h1>{!id ? 'Discussion ID not provided' : 'Could not access discussion'}</h1>
                </CenteredContainer>
            </MainContentRegion>
            </>
        );
    }

    if (discussionLoading) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                <CenteredContainer>
                    <LoadingRowIcon visibilityDelay={1}/>
                </CenteredContainer>
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
            <VisibilityTrigger
                callback={onLoadVisibilityTrigger}
                disabled={!quibblesLoadable}>
                {quibblesLoading && <LoadingRowIcon visibilityDelay={0}/>}
            </VisibilityTrigger>
        </MainContentRegion>
        </>
    );
}