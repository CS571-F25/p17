import { Card } from "react-bootstrap";

export default function LocationCard({ location }) {
    const {
        name,
        continent,
        climate,
        price,
        environment = [],
        activities = [],
        description
    } = location;

    const activitiesText = activities.slice(0, 3).join(", ");
    const hasMoreActivities = activities.length > 3;

    return (
        <Card
            className="shadow-sm text-start"
            style={{
                maxWidth: "420px",
                maxHeight: "520px",
                margin: "0 auto",
                overflowY: "auto"
            }}
        >
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <strong>Continent:</strong> {continent} <br />
                    <strong>Climate:</strong> {climate} <br />
                    <strong>Price:</strong> {price} <br />
                    <strong>Environment:</strong> {environment.join(", ")} <br />
                    <strong>Activities:</strong> {activitiesText}
                    {hasMoreActivities ? "..." : ""}
                </Card.Text>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}
