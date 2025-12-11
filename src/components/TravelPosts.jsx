import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../App";
import Cookies from "js-cookie";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { getAllPosts, createPost } from "../utils/posts";
import Searchbar from "./Searchbar";

export default function TravelPosts() {
    const { isLoggedIn } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        (async () => {
            const data = await getAllPosts();
            // Sort posts by createdAt in descending order (most recent first)
            const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
            setPosts(sortedData);
        })();
    }, []);

    const filteredPosts = posts.filter(post => {
        const searchLower = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchLower) ||
            post.text.toLowerCase().includes(searchLower) ||
            post.username.toLowerCase().includes(searchLower)
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    async function handleSubmit() {
        setMessage("");

        if (!title || !text) {
            setMessage("Title and text are required.");
            return;
        }

        const token = Cookies.get("auth");
        if (!token) {
            setMessage("You must be logged in to create a post.");
            return;
        }

        const decoded = JSON.parse(atob(token));

        const newPost = {
            title,
            text,
            username: decoded.username,
            createdAt: Date.now()
        };

        await createPost(newPost);

        setPosts([newPost, ...posts]);

        setTitle("");
        setText("");
        setShowModal(false);
        setMessage("");
    }

    return (
        <>
            <Searchbar value={searchTerm} onChange={handleSearchChange} placeholder="Search by Location/Text" />
            <Container style={{ marginTop: "180px", marginBottom: "40px" }}>
                <h1 className="text-center mb-4">Travel Posts</h1>

            {isLoggedIn && (
                <div className="text-center mb-4">
                    <Button
                        onClick={() => setShowModal(true)}
                        style={{ borderRadius: "25px", padding: "10px 24px" }}
                    >
                        Create a Post
                    </Button>
                </div>
            )}

            {!isLoggedIn && (
                <p className="text-center text-muted mb-4">
                    <Link to="/login" style={{ textDecoration: "none" }}>Log in</Link> to share your own travel experience.
                </p>
            )}

            {/* ⭐ Responsive Bootstrap Grid */}
            <Row className="justify-content-start g-4 px-5">
                {filteredPosts.map((post, idx) => (
                    <Col
                        xs={12} sm={6} md={6} lg={4}
                        key={idx}
                        className="d-flex justify-content-center"
                        // style={{ padding: "10px" }}
                    >
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: "320px",
                                minWidth: "260px", // ⭐ prevents vertical text collapse
                                borderRadius: "12px",
                                padding: "12px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        textAlign: "left",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        marginBottom: "8px",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {post.title}
                                </Card.Title>

                                <Card.Text
                                    style={{
                                        textAlign: "left",
                                        fontSize: "15px",
                                        lineHeight: "1.5",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {post.text}
                                </Card.Text>

                                <Card.Text
                                    style={{
                                        textAlign: "left",
                                        fontSize: "13px",
                                        color: "#666"
                                    }}
                                >
                                    Posted by: {post.username}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ⭐ Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Post Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Post Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Write about your trip..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </Form.Group>

                        {message && (
                            <p className="text-danger text-center">
                                {message}
                            </p>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
}
