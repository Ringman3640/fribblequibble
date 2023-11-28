import { QuibbleInfo } from "../types/QuibbleInfo";
import { Quibble } from "./Quibble";
import { DiscussionChoiceInfo } from "../../discussions";
import styled from "styled-components";

const ContentContainer = styled.div`
    margin-top: 30px;
`;

interface QuibbleListProps {
    quibbles: QuibbleInfo[],
    discussionChoices?: DiscussionChoiceInfo[]
}

export function QuibbleList({ quibbles, discussionChoices }: QuibbleListProps) {
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
        <ContentContainer>
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