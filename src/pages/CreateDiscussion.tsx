import { useContext, useState } from "react";
import { NavBar } from "../components/NavBar";
import { LoginInfoContext } from "../features/auth";
import { FormLabel, FormTextArea, FormTextBox, MainContentRegion } from "../features/styles";
import { ErrorDisplay } from "../components/ErrorDisplay";
import styled from "styled-components";

const PageForm = styled.form`
    margin-top: var(--section-margin-top);
`;

export default function CreateDiscussion() {
    const {loginInfo} = useContext(LoginInfoContext);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');

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
            <PageForm>
                <FormLabel htmlFor='titleIn'>Title</FormLabel>
                <FormTextBox
                    value={title}
                    setValue={setTitle}
                    name='titleIn'
                    length='medium'
                    maxChars={50}
                />
                <FormLabel htmlFor='descriptionIn'>Description</FormLabel>
                <FormTextArea
                    value={description}
                    setValue={setDescription}
                    name='descriptionIn'
                    length='medium'
                />
                <FormLabel htmlFor='contentIn'>Content</FormLabel>
                <FormTextArea
                    value={content}
                    setValue={setContent}
                    name='contentIn'
                    length='maximum'
                    height='large'
                />
            </PageForm>
        </MainContentRegion>
        </>
    );
}