// src/components/Home.jsx

import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function Home() {
  return (
    <Container style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      
      {/* HERO SECTION */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-5 fw-bold">Discover Your Next Destination</h1>
          <p className="lead mt-3">
            Our travel recommendation tool helps you find the perfect vacation  
            spot based on your preferences — from climate and activities  
            to budget and environment.
          </p>
          <Button variant="primary" size="lg" href="#/questionnaire" className="mt-3">
            Start Your Questionnaire
          </Button>
        </Col>
      </Row>

      {/* "HOW IT WORKS" SECTION */}
      <Row className="justify-content-center">
        <Col md={10}>
          <h3 className="text-center mb-4">How It Works</h3>
          <Row xs={1} md={3} className="g-4">
            
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>1. Answer a Few Questions</Card.Title>
                  <Card.Text>
                    Tell us what kind of trip you're looking for — weather,
                    activities, budget, and more.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>2. Get Personalized Matches</Card.Title>
                  <Card.Text>
                    Based on your answers, we match you with destinations that
                    best fit your preferences.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>3. Build Your Bucket List</Card.Title>
                  <Card.Text>
                    Save your favorite destinations to review later and start
                    planning your trip.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Col>
      </Row>

      {/* WHY USE OUR SITE */}
      <Row className="mt-5 justify-content-center">
        <Col md={10}>
          <h3 className="text-center mb-3">Why Use This Website?</h3>
          <p className="text-center fs-5">
            Whether you're dreaming of a warm beach, a snowy mountain escape,
            or a bustling cultural city, our platform helps you discover  
            destinations that truly match your travel style — quickly and easily.
          </p>
        </Col>
      </Row>

    </Container>
  );
}
