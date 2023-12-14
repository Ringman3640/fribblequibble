import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DiscussionPostLoader, DiscussionSortMethod, SortMethodSelector } from "../features/discussions";
import { FetchMethod } from "../types/BackendFetchInfo";
import { NavBar } from "../components/NavBar";
import { DiscussionSearchBlobsIcon } from "../features/icons/components/DiscussionSearchBlobsIcon";
import { MainContentRegion } from "../features/styles";
import { ErrorDisplay, ErrorDisplayType } from "../components/ErrorDisplay";
import { styled, css } from "styled-components";

const BlobIconContainer = styled.div`
    position: absolute;
    top: -190px;
    left: -200px;
    width: 350px;
    height: 350px;
    z-index: -8;
    
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

const TopicTitle = styled.h1`
    & > em {
        color: ${props => props.theme.secondaryColor};
    }
`;

const SearchSortBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 40px;
    row-gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;

    @media only screen and (max-width: 630px) {
        flex-direction: column;
    }
`;

const SearchBarStyle = css`
    flex-shrink: 1;
    flex-grow: 1;
    min-width: 100px;
`;

const SortBarStyle = css`
    margin-left: auto;
`;

// Query Parameters:
//   - search: The search term used to filter the discussion retrieval
//   - topic-id: The topic ID of discussions to retrieve

export default function DiscussionSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortMethod, setSortMethod] = useState<DiscussionSortMethod>(DiscussionSortMethod.Acvitity);
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
    const [topicId, setTopicId] = useState<string>(searchParams.get('topic-id') || '');
    const [topicName, setTopicName] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        const search = searchParams.get('search') || '';
        const topicId = searchParams.get('topic-id') || '';
        document.title = search ? `Discussions - ${search}` : 'Discussions';
        setSearchTerm(search);
        setTopicId(topicId);
    }, [searchParams]);

    useEffect(() => {
        setTopicName(undefined);
        if (topicId) {
            getTopicName();
        }
    }, [topicId]);

    function getTopicName() {
        if (!topicId || !Number.isInteger(+topicId)) {
            setTopicName(null);
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/topic/${topicId}`, {
            method: FetchMethod.Get,
            credentials: 'omit',
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
                throw json.message;
            }
            setTopicName(json.topicName);
        })
        .catch(err => {
            console.error(err);
            setTopicName(null);
        });
    }

    function handleSearch(searchPhrase: string): void {
        if (searchPhrase == (searchParams.get('search') || '')) {
            return;
        }

        let updatedQueryParams = new URLSearchParams(searchParams.toString());
        if (searchPhrase) {
            updatedQueryParams.set('search', searchPhrase);
        }
        else {
            updatedQueryParams.delete('search');
        }
        setSearchParams(updatedQueryParams.toString());
    }

    if (topicId && topicName === undefined) {
        return <></>;
    }

    if (topicId && topicName === null) {
        return (
            <>
            <NavBar/>
            <ErrorDisplay title={ErrorDisplayType.NotFound}>
                No topic with ID '{topicId}' was found
            </ErrorDisplay>
            </>
        );
    }

    return (
        <>
        <NavBar hideSearchBar={true}/>
        <MainContentRegion>
            <BlobIconContainer>
                <DiscussionSearchBlobsIcon/>
            </BlobIconContainer>
            {!topicName && <h1>Discussions</h1>}
            {topicName && <TopicTitle>Discussions - <em>{topicName}</em></TopicTitle>}
            <SearchSortBar>
                <SearchBar
                    onSearch={handleSearch}
                    defaultValue={searchTerm}
                    customCss={SearchBarStyle}
                />
                <SortMethodSelector
                    currentMethod={sortMethod}
                    handleSortChange={newSort => setSortMethod(newSort)}
                    customStyle={SortBarStyle}
                />
            </SearchSortBar>
            <DiscussionPostLoader
                sortMethod={sortMethod}
                search={searchTerm}
                topicId={topicId ? +topicId : undefined}
            />
        </MainContentRegion>
        </>
    );
}