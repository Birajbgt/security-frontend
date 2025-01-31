// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../../apis/Api";
// import { sanitizeInput } from "../../common/inputSanitizer";
// import { kname } from "../../common/utils";

// const Register = () => {
//   const [firstname, setFirstName] = useState("");
//   const [lastname, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Error Messages
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const navigate = useNavigate();

//   // Input Handlers
//   const handleFirstname = (e) => setFirstName(sanitizeInput(e.target.value, "text"));
//   const handleLastname = (e) => setLastName(sanitizeInput(e.target.value, "text"));
//   const handleEmail = (e) => setEmail(sanitizeInput(e.target.value, "email"));
//   const handlePhone = (e) => setPhone(sanitizeInput(e.target.value, "number"));

//   // Validate Email Format
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Password Strength Check
//   const validatePasswordStrength = (password) => {
//     if (password.length < 8) return "Password must be at least 8 characters long";
//     if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
//     if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
//     if (!/[0-9]/.test(password)) return "Password must contain at least one number";
//     if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@, $, !, %, *, ?, &)";
//     return "strong";
//   };

//   const handlePassword = (e) => {
//     const value = sanitizeInput(e.target.value, "password");
//     setPassword(value);

//     const strengthMessage = validatePasswordStrength(value);
//     if (strengthMessage !== "strong") {
//       setPasswordError(strengthMessage);
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   // Log latest confirmPassword value
//   useEffect(() => {
//     console.log("Updated Confirm Password:", confirmPassword);
//   }, [confirmPassword]);

//   // Form Validation
//   const validate = () => {
//     let isValid = true;

//     if (!firstname.trim()) {
//       setFirstNameError("First name is required");
//       isValid = false;
//     } else {
//       setFirstNameError("");
//     }

//     if (!lastname.trim()) {
//       setLastNameError("Last name is required");
//       isValid = false;
//     } else {
//       setLastNameError("");
//     }

//     if (!email.trim()) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!validateEmail(email)) {
//       setEmailError("Invalid email format! Example: user@example.com");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!phone.trim()) {
//       setPhoneError("Phone number is required");
//       isValid = false;
//     } else {
//       setPhoneError("");
//     }

//     const strengthMessage = validatePasswordStrength(password);
//     if (strengthMessage !== "strong") {
//       setPasswordError(strengthMessage);
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   // Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const data = {
//       firstName: firstname,
//       lastName: lastname,
//       email,
//       phone,
//       password,
//     };

//     console.log("Form Data:", data);

//     registerUserApi(data).then((res) => {
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         toast.success("Verify your email to login");
//         navigate("/login");
//       }
//     });
//   };

//   return (
//     <div className='container w-50 my-3 shadow'>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname} </h1>
//         <p style={{ color: "#333" }}>
//           Where you can find all the amazing Pictures and paintings{" "}
//         </p>
//       </div>
//       <div className='w-100'>
//         <h5 className='w-100 text-decoration-underline text-center'>Sign Up</h5>
//         <form onSubmit={handleSubmit}>
//           <label className='form-label'>First Name:</label>
//           <input onChange={handleFirstname} type='text' className='form-control' placeholder='Enter your first name' />
//           {firstNameError && <p className='text-danger'>{firstNameError}</p>}

//           <label className='form-label'>Last Name:</label>
//           <input onChange={handleLastname} type='text' className='form-control' placeholder='Enter your last name' />
//           {lastNameError && <p className='text-danger'>{lastNameError}</p>}

//           <label className='form-label'>Email:</label>
//           <input onChange={handleEmail} type='email' className='form-control' placeholder='Enter your email' required />
//           {emailError && <p className='text-danger'>{emailError}</p>}

//           <label className='form-label'>Phone:</label>
//           <input onChange={handlePhone} type='text' className='form-control' placeholder='Enter your Phone Number' />
//           {phoneError && <p className='text-danger'>{phoneError}</p>}

//           <label className='form-label'>Password:</label>
//           <input onChange={handlePassword} type='password' className='form-control' placeholder='Enter your password' />
//           {passwordError && <p className='text-danger'>{passwordError}</p>}


//           <button className='btn btn-success w-100' type="submit">Register</button>
//         </form>

//         <p className='w-100 text-center mt-2'>
//           Already have an account?{" "}
//           <a href='/login' style={{ color: "#007bff", textDecoration: "none" }}>Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
// Compare this snippet from src/components/product/ProductDescription.jsx:
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn"; // Import password strength checker
import { registerUserApi } from "../../apis/Api";
import { sanitizeInput } from "../../common/inputSanitizer";
import { kname } from "../../common/utils";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showStrengthBar, setShowStrengthBar] = useState(false);

  const navigate = useNavigate();

  const handleFirstname = (e) => setFirstName(sanitizeInput(e.target.value, "text"));
  const handleLastname = (e) => setLastName(sanitizeInput(e.target.value, "text"));
  const handleEmail = (e) => setEmail(sanitizeInput(e.target.value, "email"));
  const handlePhone = (e) => setPhone(sanitizeInput(e.target.value, "number"));

  const handlePassword = (e) => {
    const newPassword = sanitizeInput(e.target.value, "password");
    setPassword(newPassword);

    // Show strength bar when user starts typing
    setShowStrengthBar(newPassword.length > 0);

    // Use zxcvbn to check password strength (Score: 0 - 4)
    const strength = zxcvbn(newPassword).score;
    setPasswordStrength(strength);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Password Strength Feedback UI
  const renderPasswordStrength = () => {
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];

    return (
      <div className="mt-2">
        <div className="progress" style={{ height: "5px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${(passwordStrength + 1) * 20}%`,
              backgroundColor: strengthColors[passwordStrength],
            }}
          ></div>
        </div>
        <small style={{ color: strengthColors[passwordStrength] }}>
          {strengthLabels[passwordStrength]}
        </small>
      </div>
    );
  };

  // Form Validation
  const validate = () => {
    let isValid = true;

    if (!firstname.trim()) {
      toast.error("First name is required");
      isValid = false;
    }

    if (!lastname.trim()) {
      toast.error("Last name is required");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Invalid email format");
      isValid = false;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      isValid = false;
    }

    if (passwordStrength < 2) {
      toast.error("Password is too weak. Please use a stronger password.");
      isValid = false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = { firstName: firstname, lastName: lastname, email, phone, password };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success("Registration successful. Verify your email to log in.");
        navigate("/login");
      }
    });
  };

  return (
    <div className="container w-50 my-3 shadow p-4">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#333" }}>{kname}</h1>
        <p style={{ color: "#333" }}>Discover amazing art & paintings</p>
      </div>
      <h5 className="text-decoration-underline text-center">Sign Up</h5>
      <form onSubmit={handleSubmit}>
        <label className="form-label">First Name:</label>
        <input onChange={handleFirstname} type="text" className="form-control" placeholder="Enter your first name" />

        <label className="form-label mt-2">Last Name:</label>
        <input onChange={handleLastname} type="text" className="form-control" placeholder="Enter your last name" />

        <label className="form-label mt-2">Email:</label>
        <input onChange={handleEmail} type="email" className="form-control" placeholder="Enter your email" required />

        <label className="form-label mt-2">Phone:</label>
        <input onChange={handlePhone} type="text" className="form-control" placeholder="Enter your phone number" />

        <label className="form-label mt-2">Password:</label>
        <input onChange={handlePassword} type="password" className="form-control" placeholder="Enter your password" />
        {showStrengthBar && renderPasswordStrength()}

        <label className="form-label mt-2">Confirm Password:</label>
        <input onChange={handleConfirmPassword} type="password" className="form-control" placeholder="Confirm password" />

        <button className="btn btn-success w-100 mt-3" type="submit">Register</button>
      </form>

      <p className="text-center mt-2">
        Already have an account?{" "}
        <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>Login</a>
      </p>
    </div>
  );
};

export default Register;
