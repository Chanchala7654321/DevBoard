import "./Login.css";
import { RiRocketLine } from "react-icons/ri";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">

        <div className="login-header">
          <div className="logo"><RiRocketLine className="text-white text-xl" /></div>

          <h1>AgileTrack</h1>
          <p>Sign in to your workspace</p>
        </div>

        <form className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">
            Sign In
          </button>

          <p className="demo">
            Demo: use this alex@company.com email from the team with password
            <strong> "password123"</strong>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;