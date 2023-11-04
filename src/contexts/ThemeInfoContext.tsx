import { createContext } from "react"
import { ThemeInfo, DEFAULT_THEME_INFO } from "../types/ThemeInfo";

interface ThemeInfoContext {
    themeInfo: ThemeInfo,
    setThemeInfo: (c: ThemeInfo) => void
}

export const ThemeInfoContext = createContext<ThemeInfoContext>({
    themeInfo: DEFAULT_THEME_INFO,
    setThemeInfo: () => {}
});