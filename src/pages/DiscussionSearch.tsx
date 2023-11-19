import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DiscussionPostLoader, DiscussionSortMethod, SortMethodSelector } from "../features/discussions";

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
        <SearchBar onSearch={handleSearch}/>
        <SortMethodSelector
            currentMethod={sortMethod}
            handleSortChange={newSort => setSortMethod(newSort)}
        />
        <DiscussionPostLoader
            sortMethod={sortMethod}
            search={searchTerm}
        />
        </>
    );
}