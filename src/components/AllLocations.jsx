import { useState } from "react";
import vacations from "../../vacations.json";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";

export default function AllLocations() {
    const itemsPerPage = 12; 
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(vacations.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentLocations = vacations.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Container style={{ paddingTop: "60px", paddingBottom: "40px" }}>
            <h1 className="mb-4">All Travel Locations</h1>

            <Row xs={1} md={3} className="g-4">
                {currentLocations.map(loc => (
                    <Col key={loc.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{loc.name}</Card.Title>
                                <Card.Text>
                                    <strong>Continent:</strong> {loc.continent} <br />
                                    <strong>Climate:</strong> {loc.climate} <br />
                                    <strong>Price:</strong> {loc.price} <br />
                                    <strong>Environment:</strong> {loc.environment.join(", ")} <br />
                                    <strong>Activities:</strong> {loc.activities.slice(0,3).join(", ")}...
                                </Card.Text>
                                <Card.Text>{loc.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* PAGINATION */}
            <Pagination className="justify-content-center mt-4">

                <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                />

                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === currentPage}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </Container>
    );
}