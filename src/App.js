import { Outlet } from "react-router-dom";

import Navigation from './components/navbar';

import './App.css';


export default function App() {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    );
  }
