import { useEffect, useState } from "react";
import { BackendFetchInfo } from "../types/BackendFetchInfo";

export default function useFetchBackend(fetchInfo: BackendFetchInfo) {
    const [data, setData] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        let path: string;
        try {
            path = new URL(fetchInfo.route, import.meta.env.VITE_BACKEND_URL).href;
        } catch(err) {
            setError("INVALID_URL_PATH");
            setIsLoading(false);
            return;
        }

        fetch(path, {
            method: fetchInfo.method,
            credentials: fetchInfo.sendCookies ? 'include' : 'omit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: fetchInfo.body ? JSON.stringify(fetchInfo.body) : undefined
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            setData(json);
        })
        .catch(err => {
            setError(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    return [data, error, isLoading];
}