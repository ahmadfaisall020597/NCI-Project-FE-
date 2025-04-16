import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/6281365517664"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "40px",
        zIndex: 1000,
        textDecoration: "none" // Optional: Remove underline from the link
      }}
    >
      <button
        className="btn btn-success btn-lg rounded-circle"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none", // Optional: remove default button border
          outline: "none" // Optional: remove outline on focus
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: "4rem" }}></i>
      </button>
    </a>
  );
};

export default WhatsAppButton;
