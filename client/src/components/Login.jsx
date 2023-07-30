import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import AuthContext from "./context/AuthProvider";
import axios from "axios";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  //   const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, pwd); //////////
    setEmail("");
    setPwd("");
    setSuccess(!success);
  }
  return (
    <>
      {success ? (
        <section>
          <h1>You are loged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
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
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Log In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* React Router link here */}
              <Link to={"/register"}>Sign Up</Link>
            </span>
          </p>
        </section>
      )}{" "}
    </>
  );
}

export default Login;
