import { Outlet } from 'react-router';

import Navigation from './components/Navigation.jsx';

import themeRunner from './components/ThemePicker';
import './App.css';


export default function App() {
    themeRunner();

    return (
        <div>
            <Navigation /> 
            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}
