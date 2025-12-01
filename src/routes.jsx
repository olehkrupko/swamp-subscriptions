import { createBrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import FeedsLayout from "./components/feeds/Feeds.jsx";
import FeedsCreate from "./components/feeds/FeedsCreate.jsx";
import FeedsEdit from "./components/feeds/FeedsEdit.jsx";
import FeedsList from "./components/feeds/FeedsList.jsx";
import FeedsView from "./components/feeds/FeedsView.jsx";
import UpdatesFeed from "./components/updates/UpdatesFeed.jsx";

import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN


const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "feeds",
                Component: FeedsLayout,
                children: [
                    {path: "list", Component: FeedsList},
                    {path: "create", Component: FeedsCreate},
                    {path: ":feedId", Component: FeedsView},
                    {path: ":feedId/edit", Component: FeedsEdit},
                ]
            },
            {path: "updates", Component: UpdatesFeed},
            {path: "*", Component: () => <h1>404: Route Not Found</h1>}
        ]
    },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);
