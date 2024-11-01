import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getProfile = async (token) => {
            // ambil data user dari API
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET"
            })

            //get data dari response
            const result = await response.json();
            if (result.success) {
                dispatch(setUser(result.data));
                return;
            }
            
            // jika gagal, maka hapus data user dan token
            dispatch(setUser(null));
            dispatch(setToken(null));
            // redirect ke halaman login
            navigate({ to: "/login" });
        }
        if (token) {
            // jika ada token, maka ambil data user
            getProfile(token);
        }
    }, [token, navigate, dispatch])

    const logout = (event) => {
        event.preventDefault();
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate({ to: "/login" });
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