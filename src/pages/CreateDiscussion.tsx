import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { LoginInfoContext } from "../features/auth";
import { FormLabel, FormTextArea, FormTextBox, MainContentRegion, baseLargeButton, baseSmallButton, baseTextInputRegion } from "../features/styles";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { PopupMessageContext } from "../contexts/PopupMessageContext";
import { styled, css } from "styled-components";

const TITLE_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_TITLE_MAX_LENGTH;
const TOPIC_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_TOPIC_MAX_LENGTH;
const DESC_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_DESC_MAX_LENGTH;

const PageForm = styled.form`
    margin-top: var(--section-margin-top);
`;

const DatalistInput = styled.input`
    ${baseTextInputRegion};
`;

const ChoiceTextBoxCss = css`
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
`;

const ChoiceAddButton = styled.button`
    ${baseSmallButton};
`;

const ChoiceList = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
`;

const ChoiceItem = styled.button`
    ${baseLargeButton};
`;

const SubmitButton = styled.input`
    ${baseSmallButton};
`;

interface TopicInfo {
    id: number,
    name: string
}

export default function CreateDiscussion() {
    const {loginInfo} = useContext(LoginInfoContext);
    const {setPopupMessage} = useContext(PopupMessageContext);
    const [title, setTitle] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [choiceText, setChoiceText] = useState<string>('');
    const [choices, setChoices] = useState<string[]>([]);
    const [topicList, setTopicList] = useState<TopicInfo[]>([]);
    const [waitingAPI, setWaitingAPI] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/topics`, {
            method: 'GET',
            credentials: 'omit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if ('error' in json) {
                console.error(json);
                return Promise.reject();
            }
            setTopicList(json.topics);
        })
        .catch(err => {
            err && console.error(err);
            setPopupMessage('Failed to retrieve topic list');
        });
    }, []);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setWaitingAPI(true);

        try {
            let topicId: number | null = null;
            for (const topicInfo of topicList) {
                if (topicInfo.name === topic) {
                    topicId = topicInfo.id;
                    break;
                }
            }
            if (topicId === null) {
                try {
                    topicId = await postTopic(topic);
                } catch(err) {
                    setPopupMessage('Failed to add topic (check logs)');
                    throw err;
                }
            }

            try {
                await postDiscussion(title, topicId, description, content);
                setPopupMessage('Successfully created discussion post');
                setTitle('');
                setTopic('');
                setDescription('');
                setContent('');
            } catch(err) {
                setPopupMessage('Failed to post discussion (check logs)');
                throw err;
            }
        } catch(err) {
            console.error(err);
        } finally {
            setWaitingAPI(false);
        }
    }

    async function postTopic(topicName: string): Promise<number> {
        const apiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/topic`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': topicName
            })
        })
        .then(res => res.json());

        if ('error' in apiRes) {
            throw apiRes;
        }
        return apiRes.topicId;
    }

    async function postDiscussion(title: string, topicId: number, description?: string, content?: string): Promise<void> {
        const discussionBody: any = {};
        discussionBody['title'] = title;
        discussionBody['topic-id'] = +topicId;
        description && (discussionBody['description'] = description);
        content && (discussionBody['page-content'] = content);

        return fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discussionBody)
        })
        .then(res => res.json())
        .then(json => {
            if ('error' in json) {
                throw json;
            }
        });
    }

    function handleAddChoice() {
        if (!choices.includes(choiceText)) {
            setChoices([...choices, choiceText]);
        }
        setChoiceText('');
    }

    function removeChoice(choiceName: string) {
        setChoices(choices.filter(choice => choice !== choiceName));
    }

    if (!loginInfo || loginInfo.accessLevel < import.meta.env.VITE_ACCESS_LEVEL_ADMIN) {
        return (
            <>
            <NavBar/>
            <ErrorDisplay title='Unauthorized'>
                Only admin-level users can create discussions
            </ErrorDisplay>
            </>
        )
    }

    return (
        <>
        <NavBar/>
        <MainContentRegion>
            <h1>Create Discussion</h1>
            <PageForm onSubmit={handleSubmit}>
                <FormLabel htmlFor='titleIn'>Title ({title.length}/{TITLE_MAX_LENGTH})</FormLabel>
                <FormTextBox
                    value={title}
                    setValue={setTitle}
                    name='titleIn'
                    length='medium'
                    maxChars={TITLE_MAX_LENGTH}
                />
                <FormLabel htmlFor='topicIn'>Topic ({topic.length}/{TOPIC_MAX_LENGTH})</FormLabel>
                <DatalistInput 
                    list='topic-list'
                    name='topicIn'
                    value={topic}
                    onChange={event => setTopic(event.target.value)}
                />
                <datalist id='topic-list'>
                    {topicList && topicList.map(topicInfo =>
                        <option key={topicInfo.id} value={topicInfo.name}/>
                    )}
                </datalist>
                <FormLabel htmlFor='descriptionIn'>Description ({description.length}/{DESC_MAX_LENGTH})</FormLabel>
                <FormTextArea
                    value={description}
                    setValue={setDescription}
                    name='descriptionIn'
                    length='medium'
                    maxChars={DESC_MAX_LENGTH}
                />
                <FormLabel htmlFor='contentIn'>Content</FormLabel>
                <FormTextArea
                    value={content}
                    setValue={setContent}
                    name='contentIn'
                    length='maximum'
                    height='large'
                />
                <FormLabel htmlFor='choiceIn'>Choices</FormLabel>
                <FormTextBox
                    value={choiceText}
                    setValue={setChoiceText}
                    customCss={ChoiceTextBoxCss}
                />
                <ChoiceAddButton
                    onClick={handleAddChoice}
                    disabled={!choiceText}>
                    Add
                </ChoiceAddButton>
                <ChoiceList>
                    {choices.map(choice =>
                        <ChoiceItem 
                            key={choice}
                            onClick={() => removeChoice(choice)}>
                            {choice}
                        </ChoiceItem>
                    )}
                </ChoiceList>
                <SubmitButton
                    type='submit'
                    disabled={!title || !topic || waitingAPI}
                    value='Send'
                />
            </PageForm>
        </MainContentRegion>
        </>
    );
}