import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from 'react-router-dom';
import NotFound from './pages/notFound/NotFound.jsx';
import Header from "./components/layout/header/Header.jsx";
import Footer from "./components/layout/footer/Footer.jsx";
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signIn/SignIn.jsx';
import Profile from './pages/profile/Profile.jsx';
import ProtectedRoute from './components/profile/protectedRoute/ProtectedRoute.jsx';

const Router = () => {
    const AppLayout = () => (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/sign-in",
                    element: <SignIn/>,
                },
                {
                    path: "/profile",
                    element: <ProtectedRoute />,
                },
                {
                    path: "*",
                    element: <NotFound/>,
                },
            ]
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;

