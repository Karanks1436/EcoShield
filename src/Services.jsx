import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaShieldAlt,
  FaBug,
  FaChartLine,
  FaExclamationTriangle,
  FaUserSecret,
  FaLock,
  FaNetworkWired,
  FaCloud,
  FaKey,
  FaDatabase,
} from "react-icons/fa";
import "./App.css";

export default function Services() {
  return (
    <div id="services" className="services-section text-center py-5">
      {/* Section Title */}
      <h2 className="services-title metalicgold fw-bold">OUR SERVICES</h2>
      <p className="services-subtitle text-white">
        Comprehensive cybersecurity solutions to protect your business and data
      </p>

      <Container>
        {/* Row 1 */}
        <Row className="mt-5">
          <Col md={6} lg={4} className="mb-5">
            <FaShieldAlt className="service-icon teal" />
            <h4 className="service-heading metalicgold">
              Vulnerability Assessment
            </h4>
            <p className="service-text text-light">
              Identify and eliminate weaknesses before hackers exploit them.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaBug className="service-icon teal" />
            <h4 className="service-heading metalicgold">Penetration Testing</h4>
            <p className="service-text text-light">
              Simulate real-world cyberattacks to uncover vulnerabilities.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaChartLine className="service-icon teal" />
            <h4 className="service-heading metalicgold">Security Monitoring</h4>
            <p className="service-text text-light">
              24/7 monitoring to detect and prevent suspicious activities.
            </p>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row>
          <Col md={6} lg={4} className="mb-5">
            <FaExclamationTriangle className="service-icon teal" />
            <h4 className="service-heading metalicgold">Incident Response</h4>
            <p className="service-text text-light">
              Rapid response teams to contain and fix cyber incidents quickly.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaUserSecret className="service-icon teal" />
            <h4 className="service-heading metalicgold">Threat Intelligence</h4>
            <p className="service-text text-light">
              Stay ahead with real-time global threat data and insights.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaLock className="service-icon teal" />
            <h4 className="service-heading metalicgold">Data Encryption</h4>
            <p className="service-text text-light">
              Secure sensitive data with strong encryption technologies.
            </p>
          </Col>
        </Row>

        {/* Row 3 */}
        <Row>
          <Col md={6} lg={4} className="mb-5">
            <FaNetworkWired className="service-icon teal" />
            <h4 className="service-heading metalicgold">Network Security</h4>
            <p className="service-text text-light">
              Protect your entire IT infrastructure from cyberattacks.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaCloud className="service-icon teal" />
            <h4 className="service-heading metalicgold">Cloud Security</h4>
            <p className="service-text text-light">
              Secure your cloud environments with advanced protections.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-5">
            <FaKey className="service-icon teal" />
            <h4 className="service-heading metalicgold">Identity Protection</h4>
            <p className="service-text text-light">
              Prevent unauthorized access with robust authentication solutions.
            </p>
          </Col>
        </Row>

        {/* Row 4 */}
        <Row>
          <Col md={12} lg={6} className="mb-5">
            <FaDatabase className="service-icon teal" />
            <h4 className="service-heading metalicgold">Database Security</h4>
            <p className="service-text text-light">
              Safeguard databases from breaches, leaks, and unauthorized access.
            </p>
          </Col>

          <Col md={12} lg={6} className="mb-5">
            <FaShieldAlt className="service-icon teal" />
            <h4 className="service-heading metalicgold">Compliance Audits</h4>
            <p className="service-text text-light">
              Ensure compliance with GDPR, ISO, HIPAA, and other standards.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
