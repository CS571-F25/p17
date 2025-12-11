// src/components/Home.jsx

import { Container, Row, Col, Button, Card } from "react-bootstrap";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#FAFAF5", minHeight: "100vh", paddingTop: "80px", paddingBottom: "60px" }}>
    <Container>
      
      {/* HERO SECTION */}
      <Row className="text-center mb-5" style={{ 
        backgroundColor: "#1e3a5f", 
        color: "white", 
        padding: "60px 20px", 
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <Col>
          <h1 className="display-5 fw-bold">Discover Your Next Destination</h1>
          <p className="lead mt-3">
            Our travel recommendation tool helps you find the perfect vacation  
            spot based on your preferences — from climate and activities  
            to budget and environment.
          </p>
          <Button 
            size="lg" 
            href="#/questionnaire" 
            className="mt-3"
            style={{
              backgroundColor: "#34A7D5",
              border: "none",
              padding: "12px 30px",
              fontSize: "1.1rem",
              fontWeight: "bold"
            }}
          >
            Start Your Questionnaire
          </Button>
        </Col>
      </Row>

      {/* "HOW IT WORKS" SECTION */}
      <Row className="justify-content-center" style={{ marginTop: "60px" }}>
        <Col md={10}>
          <h2 className="text-center mb-4" style={{ color: "#1e3a5f", fontWeight: "bold" }}>How It Works</h2>
          <Row xs={1} md={4} className="g-4">
            
            <Col>
              <Card className="h-100" style={{ 
                backgroundColor: "#FFFEF0", 
                border: "2px solid #34A7D5",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <Card.Body>
                  <Card.Title style={{ color: "#1e3a5f", fontWeight: "bold" }}>1. Answer a Few Questions</Card.Title>
                  <Card.Text style={{ color: "#4a4a4a" }}>
                    Tell us what kind of trip you're looking for — weather,
                    activities, budget, and more.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100" style={{ 
                backgroundColor: "#FFFEF0", 
                border: "2px solid #34A7D5",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <Card.Body>
                  <Card.Title style={{ color: "#1e3a5f", fontWeight: "bold" }}>2. Get Personalized Matches</Card.Title>
                  <Card.Text style={{ color: "#4a4a4a" }}>
                    Based on your answers, we match you with destinations that
                    best fit your preferences.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100" style={{ 
                backgroundColor: "#FFFEF0", 
                border: "2px solid #34A7D5",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <Card.Body>
                  <Card.Title style={{ color: "#1e3a5f", fontWeight: "bold" }}>3. Build Your Bucket List</Card.Title>
                  <Card.Text style={{ color: "#4a4a4a" }}>
                    Save your favorite destinations to review later and start
                    planning your trip.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100" style={{ 
                backgroundColor: "#FFFEF0", 
                border: "2px solid #34A7D5",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <Card.Body>
                  <Card.Title style={{ color: "#1e3a5f", fontWeight: "bold" }}>4. Share Your Experiences</Card.Title>
                  <Card.Text style={{ color: "#4a4a4a" }}>
                    Read travel posts from other travelers and share your own
                    experiences to help others discover amazing destinations.
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
          <div style={{
            backgroundColor: "#e8e8e8",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}>
            <h2 className="text-center mb-3" style={{ color: "#1e3a5f", fontWeight: "bold" }}>Why Use This Website?</h2>
            <p className="text-center fs-5" style={{ color: "#4a4a4a" }}>
              Whether you're dreaming of a warm beach, a snowy mountain escape,
              or a bustling cultural city, our platform helps you discover  
              destinations that truly match your travel style — quickly and easily.
            </p>
          </div>
        </Col>
      </Row>

    </Container>
    </div>
  );
}
