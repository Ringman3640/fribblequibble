import { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { LoginInfoContext } from "../features/auth";
import { FormLabel, FormTextArea, FormTextBox, MainContentRegion, baseSmallButton, baseTextInputRegion } from "../features/styles";
import { ErrorDisplay } from "../components/ErrorDisplay";
import styled from "styled-components";
import { PopupMessageContext } from "../contexts/PopupMessageContext";

const TITLE_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_TITLE_MAX_LENGTH;
const TOPIC_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_TOPIC_MAX_LENGTH;
const DESC_MAX_LENGTH = import.meta.env.VITE_DISCUSSION_DESC_MAX_LENGTH;

const PageForm = styled.form`
    margin-top: var(--section-margin-top);
`;

const DatalistInput = styled.input`
    ${baseTextInputRegion};
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

        let topicId: number | null = null;
        for (const topicInfo of topicList) {
            if (topicInfo.name === topic) {
                topicId = topicInfo.id;
                break;
            }
        }
        if (topicId === null) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/topic`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': topic
                })
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                topicId = json.topicId;
                setTopicList([...topicList, { id: json.topicId, name: topic }])
                console.log('topic created');
            })
            .catch(err => {
                console.error(err);
                setPopupMessage('Failed to add topic (check logs)');
            });
            console.log('done with create topic fetch');
        }
        if (topicId === null) {
            return;
        }

        const discussionBody: any = {};
        discussionBody['title'] = title;
        discussionBody['topic-id'] = +topicId;
        description && (discussionBody['description'] = description);
        content && (discussionBody['page-content'] = content);

        console.log(discussionBody);

        await fetch(`${import.meta.env.VITE_BACKEND_URL}/discussion`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discussionBody)
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            if ('error' in json) {
                console.error(json);
                return Promise.reject();
            }
            setPopupMessage('Successfully created discussion post');
            setTitle('');
            setTopic('');
            setDescription('');
            setContent('');
        })
        .catch(err => {
            err && console.error(err);
            setPopupMessage('Failed to post discussion (check logs)');
        });

        setWaitingAPI(false);
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