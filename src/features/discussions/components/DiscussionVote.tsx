import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DiscussionChoiceInfo } from "..";
import { LoginInfoContext } from "../../auth";

interface DiscussionVoteProps {
    choices: DiscussionChoiceInfo[],
    discussionId: number
}

const ChoiceContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export function DiscussionVote({ choices, discussionId }: DiscussionVoteProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const [userVoted, setUserVoted] = useState<boolean>(false);
    const [choiceVotes, setChoiceVotes] = useState(undefined);

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
            setUserVoted(true);
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
            setUserVoted(true);
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
        })
        .finally(() => {
            setUserVoted(true);
        });
    }

    return (
        <ChoiceContainer>
            {choices.map(choice => {
                return (
                    <div key={choice.id}>
                        <button
                            disabled={!loginInfo || waitingAPI || userVoted}
                            onClick={() => sendUserVote(choice.id)}>
                            {choice.name}
                        </button>
                        {choiceVotes && <p>
                            Votes: {choiceVotes[choice.id]}
                        </p>}
                    </div>
                );
            })}
        </ChoiceContainer>
    );
}