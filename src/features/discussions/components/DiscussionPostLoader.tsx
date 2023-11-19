import { useEffect, useRef, useState } from "react";
import { DiscussionPostInfo, DiscussionPostList, DiscussionSortMethod } from "..";

interface DiscussionPostLoaderProps {
    sortMethod: DiscussionSortMethod,
    search?: string,
    topicId?: number
}

export function DiscussionPostLoader({sortMethod, search, topicId}: DiscussionPostLoaderProps) {
    const [discussions, setDiscussions] = useState<DiscussionPostInfo[]>([]);
    const [discussionsLoading, setDiscussionsLoading] = useState<boolean>(false);
    const [discussionsLoadable, setDiscussionsLoadable] = useState<boolean>(false);
    const [getDiscussions, setGetDiscussions] = useState<boolean>(false);
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
        if (!discussionsLoadable && !initialLoad) {
            return;
        }
        setDiscussionsLoading(true);

        let fetchURL = `${import.meta.env.VITE_BACKEND_URL}/discussions`
                + `?sort-by=${sortMethod}`
                + `&after-index=${discussionIndex.current}`
                + (topicId ? `&topic-id=${topicId}` : '')
                + (searchTerm.current.length !== 0 ? `&search=${searchTerm.current}` : '')
                + `&count=${import.meta.env.VITE_MAX_DISCUSSIONS_PER_LOAD}`; // TEMP
        console.log(fetchURL);
        
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
            setDiscussionsLoadable(false);
            console.log(err);
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
        <button 
            disabled={discussionsLoading || !discussionsLoadable}
            onClick={() => loadNextDiscussions()}>
            Load More Discussions
        </button></>
    );
}