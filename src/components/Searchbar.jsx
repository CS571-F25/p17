import { Form } from "react-bootstrap";

export default function Searchbar({ value, onChange, placeholder = "Search by City/Country" }) {
    return (
        <div
            style={{
                position: "fixed",
                top: "54px",
                left: 0,
                width: "100%",
                padding: "16px 24px",
                backgroundColor: "rgba(255, 255, 255)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
            }}
        >
            <Form style={{ width: "100%", maxWidth: "520px" }}>
                <Form.Label htmlFor="search-locations" className="visually-hidden">
                    Search by City or Country
                </Form.Label>
                <Form.Control
                    id="search-locations"
                    type="text"
                    placeholder={placeholder}
                    size="lg"
                    value={value}
                    onChange={onChange}
                    style={{
                        borderRadius: "999px",
                        paddingLeft: "20px",
                        paddingRight: "20px"
                    }}
                />
            </Form>
        </div>
    );
}
