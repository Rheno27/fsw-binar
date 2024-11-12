import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const StudentItem = ({ student }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Col md={3}>
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={student?.profile_picture} />
                <Card.Body>
                    <Card.Title>{student?.name}</Card.Title>
                    <Card.Text>{student?.nick_name}</Card.Text>
                    <col />
                    <Button
                        as={Link}
                        href={`/students/${student?.id}`}
                        variant="primary"
                    >
                        Detail Student
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

StudentItem.propTypes = {
    student: PropTypes.object,
};

export default StudentItem;