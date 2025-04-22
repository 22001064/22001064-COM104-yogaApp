import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const DashboardLayout = () => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  const DashboardItems = [
    ...(user?.role === 'admin' ? [{ name: "Overview", path: "/overview" }] : []),
    { name: "Schedule", path: "/schedule" },
    { name: "Available Classes", path: "/available-classes" },
  ];

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Header />
      {/* Header */}
      <Row className="bg-light p-3 align-items-center">
        <Col md={3} className="fw-bold">YogaApp</Col>
        <Col md={9}></Col>
      </Row>

      {/* Sidebar + Main Content */}
      <Row className="flex-grow-1">
        <Col md={2} className="bg-light d-flex flex-column p-3">
          {DashboardItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `btn w-100 text-start mb-3 ${isActive ? "btn-primary" : "btn-outline-secondary"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </Col>
        <Col md={10} className="bg-white p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;