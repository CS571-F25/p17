import { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import LocationCard from './LocationCard';
import { BucketListContext, AuthContext } from '../App';
import Searchbar from './Searchbar';

export default function BucketList() {
    const { bucketList } = useContext(BucketListContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBucketList = bucketList.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const isSingleResult = filteredBucketList.length === 1;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Searchbar value={searchTerm} onChange={handleSearchChange} />
            <Container style={{ paddingTop: "180px", paddingBottom: "40px" }}>
                <h1 className="mb-4">Bucket List</h1>
                {bucketList.length === 0 ? (
                    <>
                        {!isLoggedIn ? (
                            <div className="alert alert-secondary text-center">
                                <p className="mb-2">Please log in to create and manage your bucket list.</p>
                                <Link to="/login" className="btn btn-primary">Log In</Link>
                            </div>
                        ) : (
                            <>
                                <div className="alert alert-info">Your bucket list is empty. Add some destinations to see them here.</div>
                                <p className="text-center mt-3">
                                    <Link to="/locations" className="btn btn-primary me-2">Browse All Locations</Link>
                                    <span className="mx-2">or</span>
                                    <Link to="/questionnaire" className="btn btn-success">Find Your Best Fit</Link>
                                </p>
                            </>
                        )}
                    </>
                ) : filteredBucketList.length === 0 ? (
                    <div className="alert alert-warning">No destinations match your search.</div>
                ) : (
                    <Row className="g-4 justify-content-center">
                        {filteredBucketList.map(destination => (
                            <Col
                                key={destination.id}
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                className="mb-4 d-flex justify-content-center"
                            >
                                <LocationCard location={destination} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}
