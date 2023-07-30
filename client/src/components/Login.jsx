import { useState, useRef, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function Login() {
  // const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [credentials, setCredentials] = useState({});

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [credentials]);

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          const token = result.token;
          //put the token in local storage
          localStorage.setItem("jsonwebtoken", token);
        }
        setSuccess(!success);
        setCredentials({
          ...credentials,
          [e.target.name]: "",
        });
      });
  }
  return (
    <>
      {success ? (
        <Dashboard />
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              ref={userRef}
              autoComplete="off"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
            <button>Log In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* React Router link here */}
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </section>
      )}{" "}
    </>
  );
}

export default Login;
