import "./Contact.css";
import { RiSendPlaneLine } from "react-icons/ri";

function Contact() {
  return (
    <main className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact Us</h2>

          <p>
            Have feedback, a bug report, or just want to say hi?
            Fill out the form below and we'll get back to you.
          </p>
        </div>

        <div className="contact-card">
          <form>

            <div className="form-group two-column">

              <div>
                <label>Name</label>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Subject</label>

              <input
                type="text"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                rows="6"
                maxLength="500"
                placeholder="Tell us what's on your mind..."
                required
              ></textarea>

              <small>500 characters max</small>
            </div>

            <button type="submit" className="send-btn">
              <RiSendPlaneLine />
              Send Message
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

export default Contact;