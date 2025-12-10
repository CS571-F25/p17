import { useContext } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BucketListContext, AuthContext } from '../App';
import bucketIcon from '../assets/bucketlist.png';
import { useNavigate } from 'react-router';

export default function QuestionnaireCard({ destination }) {
    const { bucketList, toggleBucketItem } = useContext(BucketListContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        name,
        continent,
        climate,
        price,
        pace,
        environment = [],
        activities = [],
        season = [],
        description,
        score
    } = destination || {};

    const displayPace = Array.isArray(pace) ? pace.join(', ') : pace;
    const isInBucket = bucketList.some(item => item.id === destination?.id);

    const handleBucketToggle = () => {
        if (!isLoggedIn) {
            alert("Please log in to add destinations to your bucket list!");
            navigate("/login");
            return;
        }
        if (destination) {
            toggleBucketItem(destination);
        }
    };

    return (
        <div className="card h-100 position-relative">
            <div className="card-body d-flex flex-column">
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={`bucket-tooltip-${destination?.id || name}`}>Click to add to Bucket List</Tooltip>}
                >
                    <button
                        type="button"
                        className={`btn btn-sm ${isInBucket ? 'btn-info' : 'btn-outline-secondary'} position-absolute top-0 end-0 m-2 p-2`}
                        onClick={handleBucketToggle}
                        aria-pressed={isInBucket}
                        aria-label={isInBucket ? 'Remove from bucket list' : 'Add to bucket list'}
                        style={{ width: '40px', height: '40px' }}
                    >
                        <img
                            src={bucketIcon}
                            alt="Bucket list"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </button>
                </OverlayTrigger>
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                    <strong>Continent:</strong> {continent}<br />
                    <strong>Climate:</strong> {climate}<br />
                    <strong>Price:</strong> {price}<br />
                    <strong>Pace:</strong> {displayPace}<br />
                    <strong>Environment:</strong> {environment.join(', ')}<br />
                    <strong>Activities:</strong> {activities.join(', ')}<br />
                    <strong>Season:</strong> {season.join(', ')}<br />
                </p>
                <p className="card-text">
                    <small className="text-muted">{description}</small>
                </p>
                <p className="card-text mt-auto">
                    <span className="badge bg-primary">Match Score: {score}</span>
                </p>
            </div>
        </div>
    );
}
