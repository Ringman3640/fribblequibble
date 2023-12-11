import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { MainContentRegion, SectionHeader } from "../features/styles";
import { ProfileInfoBar, UserStatistics, UserTopDiscussion } from "../features/users";
import { useLoadQuibbles } from "../hooks/useLoadQuibbles";
import { QuibbleList } from "../features/quibbles";
import { VisibilityTrigger } from "../components/VisibilityTrigger";
import { styled, css } from "styled-components";
import { LoadingRowIcon } from "../features/icons";
import { ErrorDisplay, ErrorDisplayType } from "../components/ErrorDisplay";

const MainContentRegionStyle = css`
    h1 {
        margin-bottom: 30px;
    }
`;

const CenteredContainer = styled.div`
    position: fixed;
    top: 50vh;  
    left: 50vw;
    transform: translate(-50%, -50%);
`

export default function UserProfile() {
    const {id} = useParams();
    const [userStats, setUserStats] = useState<UserStatistics | null | undefined>(undefined);
    const [topDiscussions, setTopDiscussions] = useState<UserTopDiscussion[] | null | undefined>(undefined);
    const [serverError, setServerError] = useState<boolean>(false);
    const {quibbles, quibblesLoading, quibblesLoadable, loadNextQuibbles} = useLoadQuibbles({
        type: 'Profile',
        identifier: id || '-1'
    });

    useEffect(() => {
        if (id === undefined || !Number.isInteger(+id)) {
            setUserStats(null);
            return;
        }
        loadStatistics();
        loadTopDiscussions();
        loadNextQuibbles(true);
    }, []);

    function loadStatistics(): void {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}/statistics`, {
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
            setUserStats(('error' in json) ? null : json);
        })
        .catch(err => {
            console.error(err);
            setUserStats(null);
            setServerError(true);
        })
    }

    function loadTopDiscussions(): void {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}/top-discussions`, {
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
            setTopDiscussions(('error' in json) ? null : json.discussions);
        })
        .catch(err => {
            console.error(err);
            setUserStats(null);
            setServerError(true);
        })
    }

    function onLoadVisibilityTrigger(isVisible: boolean) {
        if (isVisible) {
            loadNextQuibbles();
        }
    }

    if (userStats === undefined && topDiscussions === undefined) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                <CenteredContainer>
                    <LoadingRowIcon visibilityDelay={1}/>
                </CenteredContainer>
            </MainContentRegion>
            </>
        );
    }

    if (!userStats || !topDiscussions || serverError) {
        let errorTitle: ErrorDisplayType;
        let errorMessage: string;
        if (serverError) {
            errorTitle = ErrorDisplayType.ServerError;
            errorMessage = 'Unable to get use profile, please try again later';
        }
        else if (id === undefined) {
            errorTitle = ErrorDisplayType.Invalid;
            errorMessage = 'A user ID was not specified';
        }
        else {
            errorTitle = ErrorDisplayType.NotFound;
            errorMessage = `No user with ID '${id}' was found`;
        }

        return (
            <>
            <NavBar/>
            <ErrorDisplay title={errorTitle}>
                {errorMessage}
            </ErrorDisplay>
            </>
        );
    }
    
    return (
        <>
        <NavBar/>
        <MainContentRegion customCss={MainContentRegionStyle}>
            <h1>{userStats.username}</h1>
            <ProfileInfoBar
                statistics={userStats}
                topDiscussions={topDiscussions}
            />
            <SectionHeader>Quibbles</SectionHeader>
            <QuibbleList quibbles={quibbles}/>
            <VisibilityTrigger
                callback={onLoadVisibilityTrigger}
                disabled={!quibblesLoadable}>
                {quibblesLoading && <LoadingRowIcon visibilityDelay={0}/>}
            </VisibilityTrigger>
        </MainContentRegion>
        </>
    );
}