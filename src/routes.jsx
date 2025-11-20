import { createBrowserRouter } from "react-router";
import './index.css';
import App from './App.jsx';
import FeedsList from "./components/feeds/list.jsx";
import FeedsView from "./components/feeds/view.jsx";
import FeedEdit from "./components/feeds/edit.jsx";
import FeedsLayout from "./components/feeds/_layout.jsx";
import FeedsCreate from "./components/feeds/create.jsx";
import UpdatesList from "./components/updates/index.jsx";

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
                    {path: ":feedId/edit", Component: FeedEdit},
                ]
            },
            {path: "updates", Component: UpdatesList},
            {path: "*", Component: () => <h1>404: Route Not Found</h1>}
        ]
    },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);
