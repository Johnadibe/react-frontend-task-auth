import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  //
  // const [user, setUser] = useState("");
  const [credentials, setCredentials] = useState({});
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //
  // const [pwd, setPwd] = useState("");
  // const [pwd, setPwd] = useState({});
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //
  // const [matchPwd, setMatchPwd] = useState("");
  // const [matchPwd, setMatch] = useState({});
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
    const result = USER_REGEX.test(credentials.username || "");
    console.log(result);
    console.log(credentials.username);
    setValidName(result);
  }, [credentials.username]);

  useEffect(() => {
    const result = PWD_REGEX.test(credentials.password);
    console.log(result);
    console.log(credentials.password);
    setValidPwd(result);
    const match = credentials.password === credentials.confirmPassword;
    setValidMatch(match);
  }, [credentials.password, credentials.confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [credentials.username, credentials.password, credentials.confirmPassword]);

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v1 = USER_REGEX.test(credentials.username);
    const v2 = PWD_REGEX.test(credentials.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    fetch("http://localhost:8080/signup", {
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
        // setPwd({
        //   ...pwd,
        //   [e.target.name]: "",
        // });
        // setMatch({
        //   ...matchPwd,
        //   [e.target.name]: "",
        // });
      });
  }

  //
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const v1 = USER_REGEX.test(user);
  //   const v2 = PWD_REGEX.test(pwd);
  //   if (!v1 || !v2) {
  //     setErrMsg("Invalid Entry");
  //     return;
  //   }

  //   // try {
  //   //   const response = await axios.post(
  //   //     REGISTER_URL,
  //   //     {
  //   //       email,
  //   //       password: pwd,
  //   //     },
  //   //     {
  //   //       headers: { "Content-Type": "application/json" },
  //   //       withCredentials: true,
  //   //     }
  //   //   );
  //   //   console.log(response.data);
  //   //   console.log(response.token);
  //   //   console.log(JSON.stringify(response));
  //   //   setSuccess(!success);
  //   //   //Clear input field
  //   // } catch (err) {
  //   //   if (!err?.response) {
  //   //     setErrMsg("No Server Response");
  //   //   } else if (err.response?.status === 409) {
  //   //     setErrMsg("Email Address Taken");
  //   //   }
  //   // }
  //   // console.log(user, pwd);
  //   // setSuccess(!success);
  //   // setUser("");
  //   // setPwd("");
  //   // setMatchPwd("");
  //   // // navigate("/dashboard");
  // }

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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>&#9989;</span>
              <span
                className={
                  validName || !credentials.username ? "hide" : "invalid"
                }
              >
                &times;
              </span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              ref={userRef}
              autoComplete="off"
              value={credentials.username}
              onChange={handleChange}
              required
              onFocus={() => setUserFocus(!userFocus)}
              onBlur={() => setUserFocus(!userFocus)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
            />
            <p
              id="uidnote"
              className={
                userFocus && credentials.username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <span style={{ color: "yellow" }}>&#9888; </span>
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>&#9989;</span>
              <span
                className={
                  validPwd || !credentials.password ? "hide" : "invalid"
                }
              >
                &times;
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
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
              <span
                className={
                  validMatch && credentials.confirmPassword ? "valid" : "hide"
                }
              >
                &#9989;
              </span>
              <span
                className={
                  validMatch || !credentials.confirmPassword
                    ? "hide"
                    : "invalid"
                }
              >
                &times;
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              name="confirmPassword"
              onChange={handleChange}
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
              <Link to={"/login"}>Log In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
