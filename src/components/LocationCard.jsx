import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useContext } from "react";
import { BucketListContext, AuthContext } from "../App";
import bucketIcon from "../assets/bucketlist.png";
import { useNavigate } from "react-router";

export default function LocationCard({ location }) {
  const { bucketList, toggleBucketItem } = useContext(BucketListContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    name,
    continent,
    climate,
    price,
    environment = [],
    activities = [],
    description,
    id
  } = location;

  const activitiesText = activities.slice(0, 3).join(", ");
  const hasMoreActivities = activities.length > 3;
  const isInBucket = bucketList.some((item) => item.id === id);

  const handleBucketToggle = () => {
    console.log("Bucket toggle clicked!", { isLoggedIn, location });
    if (!isLoggedIn) {
      alert("Please log in to add destinations to your bucket list!");
      navigate("/login");
      return;
    }
    if (location) {
      console.log("Calling toggleBucketItem with:", location);
      toggleBucketItem(location);
    }
  };

  return (
    <Card className="shadow-sm text-start h-100 position-relative" style={{ width: "100%", minWidth: "280px", maxWidth: "400px", margin: "0 auto" }}>
      <Card.Body className="d-flex flex-column">
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id={`bucket-tooltip-${id || name}`}>
              Click to add to Bucket List
            </Tooltip>
          }
        >
          <button
            type="button"
            className={`btn btn-sm ${
              isInBucket ? "btn-info" : "btn-outline-secondary"
            } position-absolute top-0 end-0 m-2 p-2`}
            onClick={handleBucketToggle}
            aria-pressed={isInBucket}
            aria-label={
              isInBucket ? "Remove from bucket list" : "Add to bucket list"
            }
            style={{ width: "40px", height: "40px" }}
          >
            <img
              src={bucketIcon}
              alt="Bucket list"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </button>
        </OverlayTrigger>

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
