import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FeedsList from "./routes/feeds/list";
import FeedsView from "./routes/feeds/view";
import FeedEdit from "./routes/feeds/edit";
import FeedsCreate from "./routes/feeds/create";
import FeedsLayout from "./routes/feeds/_layout"
import FeedUpdatesLayout from "./routes/feed-updates/_layout"
import FeedUpdatesList from "./routes/feed-updates/list"

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={<App />}
            >
                <Route
                    path="feeds"
                    element={<FeedsLayout />}
                >
                    <Route
                        index  // not working?
                        path="list"
                        element={<FeedsList />}
                    />
                    <Route path="create" element={<FeedsCreate />} />
                    <Route path=":feedId" element={<FeedsView />} />
                    <Route path=":feedId/edit" element={<FeedEdit />} />
                </Route>
                <Route
                    path="feed-updates"
                    element={<FeedUpdatesLayout />}
                >
                    <Route
                        path="list"
                        element={<FeedUpdatesList />}
                    />
                    <Route path="create" element={<FeedsCreate />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <h1>404</h1>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
