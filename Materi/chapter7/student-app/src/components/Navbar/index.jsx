import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";
import { profile } from "../../services/auth";
import { useQuery } from "@tanstack/react-query";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth);

    const handleLogout = useCallback((event) => {
        event.preventDefault();
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate({ to: "/login" });
    }, [dispatch, navigate]);

    const {data, isSuccess, isError} = useQuery({
        queryKey: ["profile"],
        queryFn: profile,
        enabled: token ? true : false,
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(data.data));
        } else if (isError) {
            handleLogout();
        }
    }, [isSuccess, isError, data, handleLogout, dispatch]);

    const logout = (event) => {
        event.preventDefault();
        handleLogout();
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Student App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {user && user?.role_id === 1 && (
                            <Nav.Link as={Link} to="/students/create">
                                Create Student
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">
                                    <Image
                                        src={user?.profile_picture}
                                        fluid
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            display: "inline-block",
                                            overflow: "hidden",
                                            borderRadius: "50%",
                                        }}
                                    />{" "}
                                    {user?.name}
                                </Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;