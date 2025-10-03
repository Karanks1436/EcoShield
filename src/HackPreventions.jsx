import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ShieldLockFill,
  KeyFill,
  LockFill,
  PersonCheckFill,
  Globe2,
  ArrowRepeat,
  WifiOff,
  FileEarmarkLock2Fill,
  BugFill,
  ShieldShaded,
  ChatSquareTextFill,
  CreditCard2BackFill,
  Incognito,
  PersonXFill,
  EyeSlashFill,
  BoxArrowUpRight,
  Phone,
  FileLockFill,
  Lock,
  CloudCheck,
} from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

const tips = [
  {
    icon: <ShieldLockFill size={40} />,
    title: "Use Firewall",
    detail: "Firewalls block unauthorized access to your system and monitor network traffic.",
  },
  {
    icon: <KeyFill size={40} />,
    title: "Strong Passwords",
    detail: "Use long, complex passwords with a mix of letters, numbers, and symbols.",
  },
  {
    icon: <LockFill size={40} />,
    title: "Enable 2FA",
    detail: "Two-factor authentication adds an extra layer of protection to your accounts.",
  },
  {
    icon: <PersonCheckFill size={40} />,
    title: "Verify Logins",
    detail: "Always verify login attempts and check for suspicious account activity.",
  },
  {
    icon: <Globe2 size={40} />,
    title: "Secure Hosting",
    detail: "Choose trusted hosting providers with strong security policies.",
  },
  {
    icon: <ArrowRepeat size={40} />,
    title: "Regular Updates",
    detail: "Keep your OS, software, and apps updated to patch security vulnerabilities.",
  },
  {
    icon: <WifiOff size={40} />,
    title: "Avoid Public Wi-Fi",
    detail: "Hackers can intercept your data on unsecured public Wi-Fi networks.",
  },
  {
    icon: <CloudCheck size={40} />,
    title: "Use VPN for Privacy",
    detail: "A VPN encrypts your internet connection, keeping your browsing private.",
  },
  {
    icon: <FileEarmarkLock2Fill size={40} />,
    title: "Encrypt Files",
    detail: "Encryption ensures sensitive files remain unreadable if stolen.",
  },
  {
    icon: <BugFill size={40} />,
    title: "Use Anti-Virus & Anti-Malware",
    detail: "Protect your devices with trusted antivirus and anti-malware software.",
  },
  {
    icon: <ShieldShaded size={40} />,
    title: "Install Security Patches",
    detail: "Patch updates fix known vulnerabilities hackers might exploit.",
  },
  {
    icon: <ChatSquareTextFill size={40} />,
    title: "Beware of Phishing Emails",
    detail: "Never click suspicious links or download unknown attachments.",
  },
  {
    icon: <CreditCard2BackFill size={40} />,
    title: "Secure Online Payments",
    detail: "Always use secure payment gateways with SSL protection.",
  },
  {
    icon: <Incognito size={40} />,
    title: "Browse in Incognito Mode",
    detail: "Private browsing reduces data tracking and cookie storage.",
  },
  {
    icon: <PersonXFill size={40} />,
    title: "Limit App Permissions",
    detail: "Only give apps permissions they absolutely need.",
  },
  {
    icon: <EyeSlashFill size={40} />,
    title: "Cover Webcam & Mic",
    detail: "Physically block your webcam/mic to prevent spying.",
  },
  {
    icon: <BoxArrowUpRight size={40} />,
    title: "Logout After Sessions",
    detail: "Always log out from accounts, especially on shared devices.",
  },
  {
    icon: <Phone size={40} />,
    title: "Lock Your Devices",
    detail: "Always lock your phone/PC when not in use.",
  },
  {
    icon: <FileLockFill size={40} />,
    title: "Backup Important Data",
    detail: "Regularly back up your data to prevent data loss from hacks.",
  },
  {
    icon: <Lock size={40} />,
    title: "End-to-End Encryption",
    detail: "Use messaging services that provide end-to-end encryption.",
  },
];

export default function HackPreventions() {
  const [show, setShow] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (tip) => {
    setSelectedTip(tip);
    setShow(true);
  };

  return (
  <>
  <Navbar/>
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-black txtgreen p-4">
      <h1 className="display-4 fw-bold mb-5 txtgreen text-uppercase border-bottom border-dark pb-2">
        Hack Preventions
      </h1>

      <div className="row g-4 w-100">
        {tips.map((tip, i) => (
          <div className="col-6 col-md-4 col-lg-3" key={i}>
            <div
              className="card bg-black border-dark h-100 text-center shadow-lg prevention-card"
              onClick={() => handleShow(tip)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <div className="txtgreen mb-3">{tip.icon}</div>
                <h5 className="card-title fw-bold text-light">{tip.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-black txtgreen">
          <Modal.Title>{selectedTip?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black text-light">
          {selectedTip?.detail}
        </Modal.Body>
        <Modal.Footer className="bg-black">
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom CSS for hover */}
      <style>{`
        .prevention-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .prevention-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
          border-color: lime;
        }
      `}</style>
      <Footer/>
    </div>
    </>
  );
}
