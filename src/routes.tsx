import { createBrowserRouter } from 'react-router-dom';
import Home from "./features/client/components/Home"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
]);

export default routes;