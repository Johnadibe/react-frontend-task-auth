import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g;
const REGISTER_URL = "https://reqres.in/api/register";

function Register() {
  //   const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  //
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  //
  async function handleSubmit(e) {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          email,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.token);
      console.log(JSON.stringify(response));
      setSuccess(!success);
      //Clear input field
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Address Taken");
      }
    }
    console.log(user, pwd);
    setSuccess(!success);
    setUser("");
    setPwd("");
    setMatchPwd("");
    // navigate("/dashboard");
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>&#9989;</span>
              <span className={validName || !user ? "hide" : "invalid"}>
                &times;
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(!userFocus)}
              onBlur={() => setUserFocus(!userFocus)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <span style={{ color: "yellow" }}>&#9888; </span>
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>&#9989;</span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                &times;
              </span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(!emailFocus)}
              onBlur={() => setEmailFocus(!emailFocus)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <span style={{ color: "yellow" }}>&#9888; </span>
              Invalid email format.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>&#9989;</span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                &times;
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(!pwdFocus)}
              onBlur={() => setPwdFocus(pwdFocus)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <span style={{ color: "yellow" }}>&#9888; </span>
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                &#9989;
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                &times;
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              onFocus={() => setMatchFocus(!matchFocus)}
              onBlur={() => setMatchFocus(matchFocus)}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <span style={{ color: "yellow" }}>&#9888; </span>
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Register
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/* React Router link here */}
              <a href="#">Log In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
