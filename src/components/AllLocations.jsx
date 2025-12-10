import { useState } from "react";
import vacations from "../../vacations.json";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import LocationCard from "./LocationCard";
import Searchbar from "./Searchbar";

export default function AllLocations() {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = vacations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLocations.length / itemsPerPage)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Adjust these props if your Searchbar expects different ones */}
      <Searchbar value={searchTerm} onChange={handleSearchChange} />

      <Container style={{ paddingTop: "180px", paddingBottom: "40px" }}>
        <h1 className="mb-4 text-center">All Travel Locations</h1>

        {/* 3 cards per row on md and up; 1–2 cards centered */}
        <Row className="justify-content-center g-4">
          {currentLocations.map((loc) => (
            <Col
              key={loc.id}
              xs={12}
              sm={8}
              md={4}
              className="mb-4 d-flex justify-content-center"
            >
              <LocationCard location={loc} />
            </Col>
          ))}
        </Row>

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
    </>
  );
}
