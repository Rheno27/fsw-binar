import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

export const Route = createLazyFileRoute('/profile')({
    component: Profile,
})

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getProfile(token);
        }
    }, [])

    const getProfile = async (token) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json();
        if (result.success) {
            setUser(result.data);
            return;
        }
        alert(result.message)
    }
    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Img
                        variant="top"
                        src={user?.profile_picture}
                        style={{
                            width: "100px",
                            height: "100px",
                            display: "block",
                            margin: "auto"
                        }}
                    />
                    <Card.Body>
                        <Card.Title>{user?.name}</Card.Title>
                        <Card.Text>{user?.email}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
