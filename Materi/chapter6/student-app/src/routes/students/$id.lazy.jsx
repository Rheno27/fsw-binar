import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { deleteStudent, getDetailStudent } from "../../services/students";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/students/$id")({
    component: StudentDetail,
});

function StudentDetail() {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const { user } = useSelector((state) => state.auth);
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const getDetailStudentData = async (id) => {
            setIsLoading(true);
            const result = await getDetailStudent(id);
            if (result?.success) {
                setStudent(result.data);
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
            setIsLoading(false);
        };

        if (id) {
            getDetailStudentData(id);
        }
    }, [id]);

    if (isLoading) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Loading...</h1>
                </Col>
            </Row>
        );
    }

    if (isNotFound) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Student is not found!</h1>
                </Col>
            </Row>
        );
    }

    const onDelete = async (event) => {
        event.preventDefault();
        if (confirm("Are you sure want to delete this student?")) {
            const result = await deleteStudent(id);
            if (result?.success) {
                navigate({ to: "/" });
                return;
            }
            alert(result?.message);
        }
    }

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Img
                        variant="top"
                        src={student?.profile_picture}
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
                        <Card.Text>{student?.classes?.class}</Card.Text>
                        <Card.Text>{student?.universities?.name}</Card.Text>
                    </Card.Body>
                    {user && user?.role_id === 1 && (
                        <Card.Footer>
                            <Button as={Link} to={`/students/edit/${student?.id}`} variant="primary">Edit</Button>
                            <Button onClick={onDelete} variant="danger">Delete</Button>
                        </Card.Footer>
                    )}
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}