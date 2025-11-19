import { createBrowserRouter } from "react-router";
import './index.css';
import App from './App.jsx';
import FeedsList from "./routes/feeds/list.jsx";
import FeedsView from "./routes/feeds/view.jsx";
import FeedEdit from "./routes/feeds/edit.jsx";
import FeedsLayout from "./routes/feeds/_layout.jsx";
import FeedsCreate from "./routes/feeds/create.jsx";
import UpdatesList from "./components/updates/list.jsx";

import { redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


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
