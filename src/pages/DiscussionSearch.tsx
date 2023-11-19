import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DiscussionPostLoader, DiscussionSortMethod, SortMethodSelector } from "../features/discussions";
import { styled, css } from "styled-components";

const SearchSortBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 40px;
    row-gap: 10px;
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
    const [searchParams] = useSearchParams();
    const [sortMethod, setSortMethod] = useState<DiscussionSortMethod>(DiscussionSortMethod.Acvitity);
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');

    function handleSearch(searchPhrase: string): void {
        setSearchTerm(searchPhrase);
    }

    return (
        <>
        <h1>Discussions</h1>
        <SearchSortBar>
            <SearchBar
                onSearch={handleSearch}
                formCss={SearchBarStyle}
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
        />
        </>
    );
}