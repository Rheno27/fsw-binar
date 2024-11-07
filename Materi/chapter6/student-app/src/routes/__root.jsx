import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from 'react-bootstrap/Container';
import NavigationBar from '../components/Navbar';
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
    component: () => (
        <>
            {/* <Navbar /> */}
            <NavigationBar />

            <Container>
                <Outlet />
            </Container>

            <TanStackRouterDevtools />
        </>
    ),
});