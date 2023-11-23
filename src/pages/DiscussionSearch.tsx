import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DiscussionPostLoader, DiscussionSortMethod, SortMethodSelector } from "../features/discussions";
import { FetchMethod } from "../types/BackendFetchInfo";
import { NavBar } from "../components/NavBar";
import { DiscussionSearchBlobsIcon } from "../features/icons/components/DiscussionSearchBlobsIcon";
import { MainContentRegion } from "../features/styles";
import { styled, css } from "styled-components";

const ErrorScreen = styled.h1`
    position: fixed;
    left: 0px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
`;

const BlobIconContainer = styled.div`
    position: absolute;
    top: -190px;
    left: -200px;
    width: 350px;
    height: 350px;
    z-index: -8;
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
        setSearchTerm(searchParams.get('search') || '');
        setTopicId(searchParams.get('topic-id') || '');
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
            console.log(json.topicName);
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
            <ErrorScreen>
                Topic ID {topicId} does not exist
            </ErrorScreen>
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