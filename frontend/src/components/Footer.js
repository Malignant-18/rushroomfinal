import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#f8f9fa",
    padding: "1rem 0",
    textAlign: "center",
    borderTop: "1px solid #dee2e6",
    marginTop: "auto",
  };

  const linkStyle = {
    margin: "0 10px",
    color: "#007bff",
    textDecoration: "none",
  };

  const linkHoverStyle = {
    ...linkStyle,
    textDecoration: "underline",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Rushroom. All Rights Reserved.</p>
      <div>
        <a
          href="https://twitter.com"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://facebook.com"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="mailto:support@rushroom.com"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
}
