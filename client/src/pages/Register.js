import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs
      );
      console.log(res);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="auth">
          <h1>Register</h1>
          <form>
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              required
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account? <Link to="/login">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
