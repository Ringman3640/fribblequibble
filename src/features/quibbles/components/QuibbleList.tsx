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
    function getUserChoice(choiceId: number | undefined): string {
        if (!choiceId || !discussionChoices) {
            return '';
        }

        for (const discussionChoice of discussionChoices) {
            if (choiceId === discussionChoice.id) {
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
                    userChoice={getUserChoice(quibble.choiceId)}
                    key={quibble.id}
                />
            )}
        </ContentContainer>
    );
}