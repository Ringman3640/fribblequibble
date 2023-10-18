import { useContext, useEffect, useState } from "react";
import { DiscussionChoiceInfo } from "..";
import LoginInfoContext from "../../../contexts/LoginInfoContext";

interface DiscussionVoteProps {
    choices: DiscussionChoiceInfo[],
    discussionId: number
}

export function DiscussionVote({ choices, discussionId }: DiscussionVoteProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const [userVoted, setUserVoted] = useState<boolean>(false);

    // Use effect to check if the user has already voted
    useEffect(() => {
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
            return res.json();
        })
        .then(json => {
            // API returns an error response if the user has not voted yet
            if ('error' in json && json.error === 'USER_HAS_NO_CHOICE') {
                return;
            }
            setUserVoted(true);
            // TODO: get discusion results
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
        .then(res => {
            return res.json();
        })
        .then(json => {
            console.log(json);
        })
        .finally(() => {
            setUserVoted(true);
        });
    }

    return (
        <div>
            {choices.map((choice) => {
                return (
                    <button
                        key={choice.id}
                        disabled={!loginInfo || waitingAPI || userVoted}
                        onClick={() => sendUserVote(choice.id)}>
                        {choice.name}
                    </button>
                );
            })}
        </div>
    );
}