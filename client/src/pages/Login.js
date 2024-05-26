import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      console.log(res);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="app">
      <div className="container">
        <div className="auth">
          <h1>Login</h1>
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
              type="password"
              onChange={handleChange}
              placeholder="password"
              name="password"
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Login
            </button>
            {err && <p>{err}</p>}
            <span>
              Don't you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
