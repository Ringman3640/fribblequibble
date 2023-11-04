export interface ThemeInfo {
    backgroundColor: string,
    backgroundColorLight: string,
    backgroundColorDark: string,
    primaryColor: string,
    primaryColorLight: string,
    secondaryColor: string,
    tertiaryColor: string
}

export const DEFAULT_THEME_INFO: ThemeInfo =  {
    backgroundColor: import.meta.env.VITE_DEFAULT_BACKGROUND_COLOR,
    backgroundColorLight: import.meta.env.VITE_DEFAULT_BACKGROUND_COLOR_LIGHT,
    backgroundColorDark: import.meta.env.VITE_DEFAULT_BACKGROUND_COLOR_DARK,
    primaryColor: import.meta.env.VITE_DEFAULT_PRIMARY_COLOR,
    primaryColorLight: import.meta.env.VITE_DEFAULT_PRIMARY_COLOR_LIGHT,
    secondaryColor: import.meta.env.VITE_DEFAULT_SECONDARY_COLOR,
    tertiaryColor: import.meta.env.VITE_DEFAULT_TERTIARY_COLOR
}
