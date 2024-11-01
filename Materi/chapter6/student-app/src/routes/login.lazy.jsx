import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../services/auth";

export const Route = createLazyFileRoute("/login")({
  component: Login,
}); 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate({ to: "/" });
    }
  }, [navigate])

  const onSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      email,
      password,
    };

    const result = await login(body);
    if (result.success) {
      dispatch(setToken(result.data.token));
      navigate({ to: "/" });
      return;
    }
    alert(result.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card className="text-center">
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="email"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="password"
              >
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">Login</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
