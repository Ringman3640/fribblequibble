import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DiscussionChoiceInfo } from "..";
import { LoginInfoContext } from "../../auth";
import { ChoiceResultsDisplay } from "./ChoiceResultsDisplay";
import { SectionHeader } from "../../styles";

interface DiscussionVoteProps {
    choices: DiscussionChoiceInfo[],
    discussionId: number
}

const ContentContainer = styled.div`
    margin-bottom: 30px; // TEMP
`;

const ChoicesRegion = styled.div`
    display: flex;
    gap: 20px;
`;

const ChoiceButton = styled.button`
    height: 50px;
    min-width: 160px;
    font-size: var(--p-font-size);
    border-radius: 100px;
    border-style: solid;
    border-width: thin;
    transition: all 0.1s;

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColorLight};
    border-color: ${props => props.theme.primaryColorLight};

    &:enabled:hover {
        filter: brightness(90%);
    }

    &:disabled {
        filter: brightness(90%);
    }
    
    &.selected {
        border: none;
        filter: brightness(100%);

        background-color: ${props => props.theme.secondaryColor};
        color: ${props => props.theme.backgroundColor};
    }
`;

export function DiscussionVote({ choices, discussionId }: DiscussionVoteProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const [userChoiceId, setUserChoiceId] = useState<number | undefined>(undefined);

    // choiceVotes is a dictionary object where a choice ID is used to obtain
    // a corresponding choice vote count. I ended up using the any type since
    // using Record<number, number> wouldn't seem to add any semantic value.
    const [choiceVotes, setChoiceVotes] = useState<any>(undefined);

    // Use effect to check if the user has already voted
    useEffect(() => {
        if (!loginInfo) {
            return;
        }
        setWaitingAPI(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${discussionId}/user-choice`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            // API returns an error response if the user has not voted yet
            if (res.status === 400) {
                return;
            }
            getChoiceVotes();
            return res.json();
        })
        .then(json => {
            setUserChoiceId(json.choiceId);
            getChoiceVotes();
        })
        .finally(() => {
            setWaitingAPI(false);
        });
    }, []);

    function sendUserVote(choiceId: number) {
        setWaitingAPI(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/choice/${choiceId}/user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            getChoiceVotes();
            setUserChoiceId(choiceId);
        })
        .finally(() => {
            setWaitingAPI(false);
        });
    }

    function getChoiceVotes() {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion/${discussionId}/choice-votes`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            const newChoiceVotes: any = {};
            for (const choiceVote of json.choiceVotes) {
                newChoiceVotes[choiceVote.choiceId] = choiceVote.voteCount;
            }
            setChoiceVotes(newChoiceVotes);
        });
    }

    if (choices.length === 0) {
        return (
            <ContentContainer>
                <h3>Vote</h3>
                <p>This discussion has no vote options</p>
            </ContentContainer>
        )
    }

    return (
        <ContentContainer>
            <SectionHeader>Vote</SectionHeader>
            <ChoicesRegion>
                {choices.map(choice =>
                <div key={choice.id}>
                    <ChoiceButton
                        className={userChoiceId === choice.id ? 'selected' : undefined}
                        disabled={!loginInfo || waitingAPI || !!userChoiceId}
                        onClick={() => sendUserVote(choice.id)}>
                        {choice.name}
                    </ChoiceButton>
                    <ChoiceResultsDisplay voteCount={choiceVotes && choiceVotes[choice.id]}/>
                </div>
                )}
            </ChoicesRegion>
        </ContentContainer>
    );
}