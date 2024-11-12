import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux'

export const Route = createLazyFileRoute('/profile')({
    component: Profile,
})

function Profile() {
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            navigate({ to: "/login" });
        }
    }, [navigate, token])

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
