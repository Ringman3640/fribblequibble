import { DiscussionSortMethod } from "..";
import { baseSmallButton } from "../../styles";
import styled from "styled-components";

const ContentContainer = styled.div`
    display: flex;
    gap: 4px;
`;

const LabelText = styled.p`
    
`;

const OptionButton = styled.button`
    ${baseSmallButton};
    background-color: transparent;
    transition: background-color 0.1s;

    color: ${props => props.theme.primaryColor};

    &.selected {
        background-color: ${props => props.theme.backgroundColorLight};
    }
`

interface SortMethodSelectorProps {
    currentMethod: DiscussionSortMethod,
    handleSortChange: (newMethod: DiscussionSortMethod) => void
}

export function SortMethodSelector({currentMethod, handleSortChange}: SortMethodSelectorProps) {
    return (
        <ContentContainer>
            <p><small>Sort by</small></p>
            <OptionButton
                className={currentMethod === DiscussionSortMethod.Acvitity ? 'selected' : undefined}
                onClick={() => handleSortChange(DiscussionSortMethod.Acvitity)}>
                Activity
            </OptionButton>
            <OptionButton
                className={currentMethod === DiscussionSortMethod.Quibbles ? 'selected' : undefined}
                onClick={() => handleSortChange(DiscussionSortMethod.Quibbles)}>
                Quibbles
            </OptionButton>
            <OptionButton
                className={currentMethod === DiscussionSortMethod.Votes ? 'selected' : undefined}
                onClick={() => handleSortChange(DiscussionSortMethod.Votes)}>
                Votes
            </OptionButton>
            <OptionButton
                className={currentMethod === DiscussionSortMethod.New ? 'selected' : undefined}
                onClick={() => handleSortChange(DiscussionSortMethod.New)}>
                New
            </OptionButton>
            <OptionButton
                className={currentMethod === DiscussionSortMethod.Old ? 'selected' : undefined}
                onClick={() => handleSortChange(DiscussionSortMethod.Old)}>
                Old
            </OptionButton>
        </ContentContainer>
    );
}