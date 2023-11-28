import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { MainContentRegion, SectionHeader } from "../features/styles";
import { ProfileInfoBar, UserStatistics, UserTopDiscussion } from "../features/users";
import { useLoadQuibbles } from "../hooks/useLoadQuibbles";
import { QuibbleList } from "../features/quibbles";
import { css } from "styled-components";
import { VisibilityTrigger } from "../components/VisibilityTrigger";

const MainContentRegionStyle = css`
    h1 {
        margin-bottom: 30px;
    }
`

export default function UserProfile() {
    const {id} = useParams();
    const [userStats, setUserStats] = useState<UserStatistics | null | undefined>(undefined);
    const [topDiscussions, setTopDiscussions] = useState<UserTopDiscussion[] | null | undefined>(undefined);
    const {quibbles, quibblesLoading, quibblesLoadable, loadNextQuibbles} = useLoadQuibbles({
        type: 'Profile',
        identifier: id || '-1'
    });

    useEffect(() => {
        if (id === undefined) {
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
        })
    }

    function onLoadVisibilityTrigger(isVisible: boolean) {
        if (isVisible) {
            loadNextQuibbles();
        }
    }

    if (userStats === null || topDiscussions === null) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                <h1>Could not find user with ID {id}</h1>
            </MainContentRegion>
            </>
        );
    }

    if (userStats === undefined || topDiscussions === undefined) {
        return (
            <>
            <NavBar/>
            <MainContentRegion>
                {/* TODO: Add loading symbol */}
            </MainContentRegion>
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
                {/* TODO: Add loading symbol */}
            </VisibilityTrigger>
        </MainContentRegion>
        </>
    );
}