import { Outlet } from 'react-router-dom';

import Navigation from './components/navbar.jsx';

import themeRunner from './components/theme-picker';
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
