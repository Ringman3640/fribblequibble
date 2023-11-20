import { useEffect, useState } from "react";
import { styled, CSSProp } from "styled-components";
import { SearchIcon } from "./SearchIcon";

const SearchBarForm = styled.form<{$customStyle?: CSSProp}>`
    position: relative;
    font-size: var(--p-font-size);
    border-radius: 999px;
    overflow: hidden;

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
    ${props => props.$customStyle}
`;

const SearchBarEntryBox = styled.input`
    display: block;
    background-color: inherit;
    border: 0px;
    border-radius: inherit;
    width: 100%;
    color: inherit;
    font-size: inherit;
    padding: var(--medium-text-padding);

    &:focus {
    }
`;

const SearchBarButton = styled.input`
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 50px;
    border: 0px;

    background-color: inherit;
    opacity: 0;

    &:hover {
        cursor: pointer;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    width: 50px;
    padding: 4px;
    pointer-events: none;
`;

interface SearchBarProps {
    onSearch: (searchPhrase: string, clearSearch: () => void) => void
    defaultValue?: string,
    disabled?: boolean,
    clearOnSearch?: boolean,
    formCss?: CSSProp
}

export function SearchBar({onSearch, defaultValue, disabled, clearOnSearch, formCss}: SearchBarProps) {
    const [searchText, setSearchText] = useState<string>(defaultValue || '');

    useEffect(() => {
        setSearchText(defaultValue || '');
    }, [defaultValue]);

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();
        onSearch(searchText, () => setSearchText(''));
        if (clearOnSearch) {
            setSearchText('');
        }
    }

    return (
        <SearchBarForm onSubmit={handleSubmit} $customStyle={formCss}>
            <SearchBarEntryBox
                placeholder='Search...'
                value={searchText}
                disabled={disabled}
                onChange={event => setSearchText(event.target.value)}
            />
            <SearchBarButton type='submit' value=''/>
            <IconContainer>
                <SearchIcon/>
            </IconContainer>
        </SearchBarForm>
    );
}