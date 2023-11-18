import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DiscussionPostInfo, DiscussionPostList, DiscussionSortMethod } from "../features/discussions";

// Query Parameters:
//   - search: The search term used to filter the discussion retrieval
//   - topic-id: The topic ID of discussions to retrieve

export default function DiscussionSearch() {
    const [searchParams] = useSearchParams();
    const [discussions, setDiscussions] = useState<DiscussionPostInfo[]>([]);
    const [discussionsLoading, setDiscussionsLoading] = useState<boolean>(false);
    const [discussionsLoadable, setDiscussionsLoadable] = useState<boolean>(false);
    const [sortMethod, setSortMethod] = useState<DiscussionSortMethod>(DiscussionSortMethod.Acvitity);
    const [getDiscussions, setGetDiscussions] = useState<boolean>(true);
    const discussionIndex = useRef<number>(0);
    const searchTerm = useRef<string>(searchParams.get('search') || '');

    useEffect(() => {
        if (getDiscussions) {
            setGetDiscussions(false);
            loadNextDiscussions(true);
        }
    }, [getDiscussions]);

    function reloadDiscussions(newSortMethod?: DiscussionSortMethod): void {
        if (newSortMethod) {
            setSortMethod(newSortMethod);
        }
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

        const topicId = searchParams.get('topic-id');
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
                return;
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

    function handleSearch(searchPhrase: string): void {
        if (searchTerm.current === searchPhrase) {
            return;
        }
        searchTerm.current = searchPhrase;
        reloadDiscussions();
    }

    return (
        <>
        <h1>Discussions</h1>
        <SearchBar onSearch={handleSearch}/>
        <DiscussionPostList discussionPosts={discussions}/>
        <button 
            disabled={discussionsLoading || !discussionsLoadable}
            onClick={() => loadNextDiscussions()}>
            Load More Discussions
        </button>
        </>
    );
}