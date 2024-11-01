import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export const Route = createLazyFileRoute('/register')({
    component: Register,
})

function Register() {
    const navigate = useNavigate(); 

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState('')


    useEffect(() => {
        // jika ada token, maka redirect ke halaman home
        const token = localStorage.getItem("token");
        if (token) {
            navigate({ to: "/" });
        }
    }, [navigate])

    const onSubmit = async (event) => {
        event.preventDefault()

        if (password != confirmPassword) {
            alert('Password and password confirmation must be same!')
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('profile_picture', profilePicture)

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/register`, {
            body: formData,
            method: 'POST',
        })

        const result = await response.json()
        // jika berhasil, maka redirect ke halaman login
        if (result.success) {
            navigate({ to: "/login" });
            return
        }

        alert(result.message)
    } 

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
        <Card>
            <Card.Header className="text-center">Register</Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm={3}>
                            Name
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm={3}>
                            Email
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm={3}>
                            Password
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                        <Form.Label column sm={3}>
                            Confirm Password
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value)
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                        <Form.Label column sm={3}>
                            Profile Picture
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="file"
                                placeholder="Choose file"
                                required
                                onChange={(event) => {
                                    setProfilePicture(event.target.files[0])
                                }}
                                accept=".jpg,.png"
                            />
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    )
}