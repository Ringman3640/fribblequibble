import { useContext, useEffect, useState } from "react";
import { DiscussionChoiceInfo } from "..";
import { ChoiceVoteInfo } from "..";
import { LoginInfoContext } from "../../auth";
import { ChoiceResultsDisplay } from "./ChoiceResultsDisplay";
import { SectionHeader } from "../../styles";
import { baseLargeButton } from "../../styles";
import styled from "styled-components";

const ChoicesRegion = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const ChoiceButton = styled.button`
    ${baseLargeButton}
    
    &.selected {
        border: none;
        filter: brightness(100%);

        background-color: ${props => props.theme.secondaryColor};
        color: ${props => props.theme.backgroundColor};
    }
`;

interface DiscussionVoteProps {
    choices: DiscussionChoiceInfo[],
    discussionId: number
}

export function DiscussionVote({ choices, discussionId }: DiscussionVoteProps) {
    const {loginInfo} = useContext(LoginInfoContext);
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);
    const [userChoiceId, setUserChoiceId] = useState<number | undefined>(undefined);

    // choiceVotes is a dictionary object where a choice ID is used to obtain
    // a corresponding choice vote count and percent.
    const [choiceVotes, setChoiceVotes] = useState<Record<number, ChoiceVoteInfo> | undefined>(undefined);

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
                return Promise.reject();
            }
            getChoiceVotes();
            return res.json();
        })
        .then(json => {
            setUserChoiceId(json.choiceId);
            getChoiceVotes();
        })
        .catch(() => {
            // This catch only exists to silence an error if the first promise
            // handler returns Promise.reject(). It servers no other purpose.
        })
        .finally(() => {
            setWaitingAPI(false);
        });
    }, [loginInfo]);

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
            processUserChoiceVotes(json.choiceVotes);
        });
    }

    function processUserChoiceVotes(choiceVotes: any) {
        let totalVotes = 0;
        for (const choiceVote of choiceVotes) {
            totalVotes += choiceVote.voteCount;
        }

        // Set estimate vote percents
        let totalPercent = 0;
        const newChoiceVotes: Record<number, ChoiceVoteInfo> = {};
        for (const choiceVote of choiceVotes) {
            newChoiceVotes[choiceVote.choiceId] = {
                voteCount: choiceVote.voteCount,
                votePercent: Math.ceil(choiceVote.voteCount / totalVotes * 100)
            }
            totalPercent += newChoiceVotes[choiceVote.choiceId].votePercent;
        }

        // Adjust percents if total vote percent is not 100%
        // Not a good distribution algorithm but will work for now
        // Could potentially cause a negative percent
        for (const choiceId in newChoiceVotes) {
            if (totalPercent === 100) {
                break;
            }
            if (totalPercent > 100) {
                --totalPercent;
                --newChoiceVotes[choiceId].votePercent;
            }
            else {
                ++totalPercent;
                ++newChoiceVotes[choiceId].votePercent;
            }
        }
        setChoiceVotes(newChoiceVotes);
    }

    if (choices.length === 0) {
        return (
            <div>
                <h3>Vote</h3>
                <p>This discussion has no vote options</p>
            </div>
        )
    }

    return (
        <div>
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
                    {choiceVotes && <ChoiceResultsDisplay voteInfo={choiceVotes[choice.id]}/>}
                </div>
                )}
            </ChoicesRegion>
        </div>
    );
}