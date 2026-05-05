import React, { useState } from "react";
import { Mail, MapPin, Send, Check, Calendar, AlertCircle, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLinkedinIn, faXTwitter, FaGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../lib/supabase";
import "../styles/Contact.css";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BookingFormState {
  name: string;
  phone: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    name: "",
    phone: "",
  });
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";

    if (!form.message.trim()) e.message = "Message is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateBooking = () => {
    const e: Record<string, string> = {};

    if (!bookingForm.name.trim()) e.name = "Name is required";
    if (!bookingForm.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[+\d][\d\s\-()]{7,}$/.test(bookingForm.phone))
      e.phone = "Enter a valid phone number";

    setBookingErrors(e);
    return Object.keys(e).length === 0;
  };

const [bookingLoading, setBookingLoading] = useState(false);
const [bookingServerError, setBookingServerError] = useState<string | null>(null);

const handleBookingSubmit = async (ev: React.FormEvent) => {
  ev.preventDefault();
  setBookingServerError(null);

  if (!validateBooking()) return;

  setBookingLoading(true);

  try {
    const response = await fetch("https://formspree.io/f/maqvonlo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: bookingForm.name.trim(),
        phone: bookingForm.phone.trim(),
        type: "Call Booking",
        intent: "Requested 30min Call",
        source: "Portfolio Booking Modal",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Failed to submit booking");
    }

    setBookingSubmitted(true);

    setTimeout(() => {
      setShowBookingModal(false);
      setBookingForm({ name: "", phone: "" });
      setBookingSubmitted(false);
    }, 3000);
  } catch (err: any) {
    setBookingServerError(err?.message || "Something went wrong.");
  } finally {
    setBookingLoading(false);
  }
};

const submit = async (ev: React.FormEvent) => {
  ev.preventDefault();
  setServerError(null);

  if (!validate()) return;

  setSending(true);

  try {
    const response = await fetch("https://formspree.io/f/xzdorbvl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Failed to send message");
    }

    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSent(false), 6000);
  } catch (err: any) {
    setServerError(err?.message || "Failed to send message.");
  } finally {
    setSending(false);
  }
};

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* HEADER */}
        <div className="contact-header">
          <span className="contact-tag">CONTACT / 07</span>
          <h2>
            Let's build <span>something real</span>
          </h2>
          <p>Got a project, role, or wild idea? I read every message.</p>
        </div>

        <div className="contact-grid">
          {/* INFO */}
          <div className="contact-info">
            <div className="info-card">
              <Mail />
              <div>
                <small>Email</small>
                <a href="mailto:obedotuayor18@gmail.com" className="link-text">
                  <p> obedotuayor18@gmail.com</p>
                </a>
              </div>
            </div>

            <div className="info-card">
              <MapPin />
              <div>
                <small>Location</small>
                <p>Accra, Ghana</p>
              </div>
            </div>

            <div className="info-card">
              <Calendar />
              <div>
                <small>Book a Call</small>
                <p>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setShowBookingModal(true);
                  }} className="link-text">
                    Schedule 30 mins →
                  </a>
                </p>
              </div>
            </div>

            <div className="socials">
              <FaGithub />
              <FiLinkedin />
              <RiTwitterXLine />
              {/* <FontAwesomeIcon icon={FaGithub} />
              <FontAwesomeIcon icon={faLinkedinIn} />
              <FontAwesomeIcon icon={faXTwitter} /> */}
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="contact-form">
            {sent && (
              <div className="success">
                <Check /> Message sent!
              </div>
            )}

            {serverError && (
              <div className="error">
                <AlertCircle /> {serverError}
              </div>
            )}

            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {errors.name && <span className="field-error">{errors.name}</span>}
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />

            <textarea
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            {errors.message && (
              <span className="field-error">{errors.message}</span>
            )}

            <button className="send-button" type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"} <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book a Call with Obed</h3>
              <button
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="booking-success">
                <Check size={32} />
                <p>Call scheduled! I'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="booking-info">
                  <p>Schedule a 30-minute call with Obed to discuss your project.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="booking-name">Name / Organization</label>
                  {bookingServerError && (
                    <div className="error">
                      <AlertCircle /> {bookingServerError}
                    </div>
                  )}
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Your name"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                    className={bookingErrors.name ? "error" : ""}
                  />
                  {bookingErrors.name && (
                    <span className="field-error">{bookingErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="booking-phone">Phone Number</label>
                  {bookingServerError && (
                    <div className="error">
                      <AlertCircle /> {bookingServerError}
                    </div>
                  )}
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                    className={bookingErrors.phone ? "error" : ""}
                  />
                  {bookingErrors.phone && (
                    <span className="field-error">{bookingErrors.phone}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-booking-btn"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"} <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
