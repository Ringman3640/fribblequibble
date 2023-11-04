import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeInfoContext } from "../contexts/ThemeInfoContext";
import { DEFAULT_THEME_INFO, ThemeInfo } from "../types/ThemeInfo";

const LOCAL_STORAGE_THEME_KEY = 'fqThemeData';

export function ThemeInfoWrapper({children}: React.PropsWithChildren) {
    const [theme, setTheme] = useState<ThemeInfo>(DEFAULT_THEME_INFO);

    useEffect(() => {
        loadThemeLocalStorage();
    }, []);

    function updateTheme(newTheme: ThemeInfo) {
        setTheme(newTheme);
        saveThemeLocalStorage(newTheme);
    }

    function loadThemeLocalStorage() {
        const loadedThemeString = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        if (!loadedThemeString) {
            return;
        }

        let themeJSON: ThemeInfo;
        try {
            themeJSON = JSON.parse(loadedThemeString);
        } catch(err) {
            console.error(err);
            localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
            return;
        }
        
        setTheme(themeJSON);
    }

    function saveThemeLocalStorage(newTheme: ThemeInfo) {
        try {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(newTheme));
        } catch {
            // Failed to set item, so do nothing (user likely disabled localstorage)
        }
    }

    return (
        <ThemeInfoContext.Provider value={{themeInfo: theme, setThemeInfo: updateTheme}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeInfoContext.Provider>
    );
}