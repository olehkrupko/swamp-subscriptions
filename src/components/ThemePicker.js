const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';


function getTheme() {
    if (window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches) {
        return THEME_DARK;
    } else {
        return THEME_LIGHT;
    }
}


export function getThemeHighlight() {
    if (window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches) {
        return THEME_LIGHT;
    } else {
        return THEME_DARK;
    }
}


function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
}


export function watchTheme() {
    window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).addEventListener('change', function() {
        console.log(`changed to ${getTheme()} mode`);
        setTheme(getTheme());
    });
}


export default function themeRunner() {
    setTheme(getTheme());
    watchTheme();
}
