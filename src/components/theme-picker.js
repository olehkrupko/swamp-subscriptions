const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';


export function getTheme() {
    if (window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches) {
        return THEME_DARK;
    } else {
        return THEME_LIGHT;
    }
}


function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
}


export function watchTheme() {
    window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).addEventListener('change', event => {
        console.log(`changed to ${getTheme()} mode`);
        setTheme(getTheme());
    });
}


export default function themeRunner() {
    setTheme(getTheme());
    watchTheme();
}
