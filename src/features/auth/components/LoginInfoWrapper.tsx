import { useEffect, useState } from "react";
import { LoginInfo } from "../types/LoginInfo";
import { LoginInfoContext } from "../contexts/LoginInfoContext";

const MS_PER_SECOND: number = 1000;

export function LoginInfoWrapper({children}: React.PropsWithChildren) {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(undefined);

    useEffect(() => {
        refreshLoginInfo(true);
    }, []);

    function refreshLoginInfo(useCachedInfo?: boolean): void {
        setLoginInfo(undefined);

        // Check if valid login info exists cached in localstorage
        if (useCachedInfo) {
            const savedLoginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');
            if (savedLoginInfo 
                    && 'id' in savedLoginInfo
                    && Date.now() / MS_PER_SECOND < savedLoginInfo.expTimestamp) {
                setLoginInfo({
                    id: savedLoginInfo.id,
                    username: savedLoginInfo.username,
                    accessLevel: savedLoginInfo.accessLevel
                });
                return;
            }
        }
        else {
            localStorage.removeItem('loginInfo');
        }

        // Try to get login info from backend
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/info`, {
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
            if ('error' in json) {
                throw null;
            }
            localStorage.setItem('loginInfo', JSON.stringify(json));
            setLoginInfo({
                id: json.id,
                username: json.username,
                accessLevel: json.accessLevel
            });
        })
        .catch(err => {
            if (err) {
                console.error(err);
            }
            setLoginInfo(null);
            localStorage.removeItem('loginInfo');
        });
    }

    return (
        <LoginInfoContext.Provider value={{loginInfo, refreshLoginInfo}}>
            {children}
        </LoginInfoContext.Provider>
    );
}
