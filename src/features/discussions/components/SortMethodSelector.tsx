import { DiscussionSortMethod } from "..";
import { styled, CSSProp } from "styled-components";

const ContentContainer = styled.div<{$customStyle: CSSProp}>`
    display: flex;
    flex-shrink: 0;
    gap: 4px;

    ${props => props.$customStyle};
`;

const LabelText = styled.p`
    background-color: transparent;
    font-size: var(--small-font-size);
    padding: var(--medium-text-padding);

    color: ${props => props.theme.primaryColorLight};
`;

const OptionButton = styled.button`
    background-color: transparent;
    padding: var(--medium-text-padding);
    border: 0px;
    border-radius: var(--medium-border-radius);
    font-size: var(--p-font-size);
    transition: background-color 0.1s;

    color: ${props => props.theme.primaryColor};

    &:hover {
        cursor: pointer;
    }
    &.selected {
        background-color: ${props => props.theme.backgroundColorLight};
    }
`

interface SortMethodSelectorProps {
    currentMethod: DiscussionSortMethod,
    handleSortChange: (newMethod: DiscussionSortMethod) => void,
    customStyle?: CSSProp
}

export function SortMethodSelector({currentMethod, handleSortChange, customStyle}: SortMethodSelectorProps) {
    return (
        <ContentContainer $customStyle={customStyle}>
            <LabelText>Sort by</LabelText>
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