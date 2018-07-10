// @flow

// Deprecated / legacy types
export type ThemeModes = 'light' | 'dark';
export type Theme = { mode: ThemeModes };
export type ThemeProps = {
  theme: { __ATLASKIT_THEME__: Theme },
};
export type ThemedValue = (props: ?ThemeProps) => string | number;

// Non-deprecated types
export type colorPaletteType = '8' | '16' | '24';

// New types
export type ThemeInput = { [string]: ThemeInputValue };
export type ThemeOutput = { [string]: ThemeOutputValue };
export type ThemeBaseValue = boolean | number | string;
export type ThemeInputValue = ((*, ThemeOutput) => *) | ThemeBaseValue;
export type ThemeOutputValue = *;
