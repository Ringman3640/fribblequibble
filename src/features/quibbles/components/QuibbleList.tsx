import { QuibbleInfo } from "../types/QuibbleInfo";
import { Quibble } from "./Quibble";
import { DiscussionChoiceInfo } from "../../discussions";
import { styled, CSSProp } from "styled-components";

const ContentContainer = styled.div<{$customCss: CSSProp}>`
    ${props => props.$customCss};
`;

interface QuibbleListProps {
    quibbles: QuibbleInfo[],
    discussionChoices?: DiscussionChoiceInfo[],
    customCss?: CSSProp;
}

export function QuibbleList({quibbles, discussionChoices, customCss}: QuibbleListProps) {
    function getUserChoice(quibble: QuibbleInfo): string {
        if (!('choiceId' in quibble) || !discussionChoices) {
            return '';
        }

        for (const discussionChoice of discussionChoices) {
            if (quibble.choiceId === discussionChoice.id) {
                return discussionChoice.name;
            }
        }

        return '';
    }

    return (
        <ContentContainer $customCss={customCss}>
            {quibbles && quibbles.map((quibble) =>
                <Quibble
                    quibbleInfo={quibble}
                    userChoice={getUserChoice(quibble)}
                    key={quibble.id}
                />
            )}
        </ContentContainer>
    );
}