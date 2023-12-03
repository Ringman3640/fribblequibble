import { useContext, useEffect, useRef, useState } from "react";
import { DiscussionPostInfo, DiscussionPostList, DiscussionSortMethod } from "..";
import { VisibilityTrigger } from "../../../components/VisibilityTrigger";
import { LoadingRowIcon } from "../../icons";
import { PopupMessageContext } from "../../../contexts/PopupMessageContext";
import { styled, css } from "styled-components";

const NotificationText = styled.p`
    text-align: center;
`;

const VisibilityTriggerCss = css`
    width: 100%;
    height: 60px;
`;

interface DiscussionPostLoaderProps {
    sortMethod: DiscussionSortMethod,
    search?: string,
    topicId?: number,
    retrieveCount?: number,
    maxRetrieves?: number
}

export function DiscussionPostLoader({sortMethod, search, topicId, retrieveCount, maxRetrieves}: DiscussionPostLoaderProps) {
    const {setPopupMessage} = useContext(PopupMessageContext);
    const [discussions, setDiscussions] = useState<DiscussionPostInfo[]>([]);
    const [discussionsLoading, setDiscussionsLoading] = useState<boolean>(false);
    const [discussionsLoadable, setDiscussionsLoadable] = useState<boolean>(false);
    const [getDiscussions, setGetDiscussions] = useState<boolean>(false);
    const [totalRetrieves, setTotalRetrieves] = useState<number>(0);
    const [loadFailed, setLoadFailed] = useState<boolean>(false);
    const discussionIndex = useRef<number>(0);
    const searchTerm = useRef<string>('');

    useEffect(() => {
        if (getDiscussions) {
            setGetDiscussions(false);
            loadNextDiscussions(true);
        }
    }, [getDiscussions]);

    useEffect(() => {
        searchTerm.current = search || '';
        reloadDiscussions();
    }, [sortMethod, search, topicId]);

    function reloadDiscussions(): void {
        setDiscussions([]);
        setDiscussionsLoading(false);
        setDiscussionsLoadable(false);
        discussionIndex.current = 0;
        setGetDiscussions(true);
    }

    function loadNextDiscussions(initialLoad?: boolean): void {
        if (discussionsLoading) {
            return;
        }
        if (maxRetrieves && totalRetrieves >= maxRetrieves) {
            return;
        }
        if (!discussionsLoadable && !initialLoad) {
            return;
        }
        setDiscussionsLoading(true);
        setTotalRetrieves(totalRetrieves + 1);

        let count = retrieveCount;
        if (count && count > import.meta.env.VITE_MAX_DISCUSSIONS_PER_LOAD) {
            count = import.meta.env.VITE_MAX_DISCUSSIONS_PER_LOAD;
        }
        let fetchURL = `${import.meta.env.VITE_BACKEND_URL}/discussions`
                + `?sort-by=${sortMethod}`
                + `&after-index=${discussionIndex.current}`
                + (searchTerm.current.length !== 0 ? `&search=${searchTerm.current}` : '')
                + (topicId ? `&topic-id=${topicId}` : '')
                + (count ? `&count=${count}` : '');
        
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
            if ('error' in json) {
                console.log(json);
                throw {};
            }
            setDiscussionsLoadable(json.discussions.length == import.meta.env.VITE_MAX_DISCUSSIONS_PER_LOAD);
            for (const discussion of json.discussions) {
                insertDiscussion(discussion);
            }
            if ('lastIndex' in json) {
                discussionIndex.current = json.lastIndex;
            }
        })
        .catch(err => {
            console.error(err);
            setDiscussionsLoadable(false);
            setLoadFailed(true);
            setPopupMessage('Could not get discussions, please try again later');
        })
        .finally(() => {
            setDiscussionsLoading(false);
        });
    }

    function insertDiscussion(discussion: DiscussionPostInfo): void {
        setDiscussions(prevDiscussions => {
            for (const prevDiscussion of prevDiscussions) {
                if (prevDiscussion.id === discussion.id) {
                    return prevDiscussions;
                }
            }
            prevDiscussions.push(discussion);
            return prevDiscussions;
        });
    }

    return (
        <>
        <DiscussionPostList discussionPosts={discussions}/>
        {loadFailed &&
        <NotificationText>
            Failed to load discussions
        </NotificationText>}
        {!loadFailed && !discussionsLoadable && discussions.length === 0 &&
        <NotificationText>
            No discussions found
        </NotificationText>}
        <VisibilityTrigger
            callback={() => setGetDiscussions(true)}
            customCss={VisibilityTriggerCss}
            disabled={!discussionsLoadable || discussionsLoading}>
            {discussionsLoading && <LoadingRowIcon visibilityDelay={0}/>}
        </VisibilityTrigger>
        </>
    );
}