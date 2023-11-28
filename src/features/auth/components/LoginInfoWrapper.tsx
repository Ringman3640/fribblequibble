import { useEffect, useState } from "react";
import { LoginInfo } from "../types/LoginInfo";
import { LoginInfoContext } from "../contexts/LoginInfoContext";

interface AccessTokenJWT {
    id: number,
    access_level: number,
    username: string,
    iat: number,
    exp: number
}

export function LoginInfoWrapper({children}: React.PropsWithChildren) {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(undefined);

    useEffect(() => {
        const accessToken: string | null = getCookie('access_token');

        // In an access token is not found, the user is not logged in
        if (!accessToken) {
            setLoginInfo(null);
            return;
        }

        const jwt: AccessTokenJWT = parseJwt(accessToken);
        const currTimestampSeconds: number = Math.floor(Date.now() / 1000);

        // If the access token is not expired, accept login info
        if (jwt.exp > currTimestampSeconds) {
            setLoginInfo({
                id: jwt.id,
                username: jwt.username,
                accessLevel: jwt.access_level
            });
            return;
        }

        // Attempt to renew access token
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/renew-access-token`, {
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
            if ('error' in json) {
                setLoginInfo(null);
                return;
            }
            const newAccessToken: string | null = getCookie('access_token');
            if (!newAccessToken) {
                setLoginInfo(null);
                return;
            }
            const newJwt = parseJwt(newAccessToken);
            setLoginInfo({
                id: newJwt.id,
                username: newJwt.username,
                accessLevel: newJwt.access_level
            });
        })
        .catch(err => {
            console.log(err);
            setLoginInfo(null);
        });
    }, []);

    function clearLoginInfo(): void {
        console.log('balls');
        setLoginInfo(null);
        document.cookie = "access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        document.cookie = "refresh_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }

    return (
        <LoginInfoContext.Provider value={{loginInfo, clearLoginInfo}}>
            {children}
        </LoginInfoContext.Provider>
    );
}

// getCookie
// 
// Finds a cookie by name and returns its contents if found. Otherwise, returns
// null.
// 
// Taken from: https://stackoverflow.com/a/52406518
function getCookie(name: string): string | null {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}

// parseJwt
// 
// Decodes an encoded JWT and returns its JSON payload.
// 
// Taken from: https://stackoverflow.com/a/38552302
function parseJwt (token: string): AccessTokenJWT {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}