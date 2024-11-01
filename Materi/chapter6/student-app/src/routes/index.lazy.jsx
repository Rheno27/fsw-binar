import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getStudents } from "../services/students";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    const { token } = useSelector((state) => state.auth);

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudentData = async () => {
            const result = await getStudents();
            if (result.success) {
                setStudents(result.data);
            }
        };

        if (token) {
            getStudentData();
        }
    }, [token]);

    return (
        <Row className="mt-4">
            {!token && (
                <Col>
                    <h1>Please login first to get student data!</h1>
                </Col>
            )}

            {students.length > 0 &&
                students.map((student) => (
                    <Col key={student.id} md={3}>
                        <Card style={{ width: "15rem" }}>
                            <Card.Img
                                variant="top"
                                src={student.profile_picture}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    display: "block",
                                    margin: "auto"
                                }}
                            />
                            <Card.Body>
                                <Card.Title>{student?.name}</Card.Title>
                                <Card.Text>{student?.nick_name}</Card.Text>
                                <Button variant="primary">
                                    Detail Student
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
        </Row>
    );
}