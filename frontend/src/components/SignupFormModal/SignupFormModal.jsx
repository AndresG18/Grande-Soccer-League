import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [type, setType] = useState('player');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          type,
          password
        })
      )
        .then(() => {
          closeModal();
          if (type === 'player') {
            window.location.href = "https://eform.pandadoc.com/?eform=a12e2d9a-2f88-46ba-9011-067246a1c10d";
          }
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  
  return (
    <>
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="signup-label">
          Parent / Gaurdian Email
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        {errors.email && <p className="signup-error">{errors.email}</p>}
        <label className="signup-label">
         {"Player's First Name"}
          <input
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>
        {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
        <label className="signup-label">
        {"Player's Last Name"}
          <input
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </label>
        {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
        <label className="signup-label">
          Type
          <select
            className="signup-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required>
              <option value='player'>Player</option>
              <option value='coach'>Coach</option>
          </select>
        </label>
        {errors.type && <p className="signup-error">{errors.type}</p>}
        <label className="signup-label">
          Password
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        {errors.password && <p className="signup-error">{errors.password}</p>}
        <label className="signup-label">
          Confirm Password
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
<p>{'Note: Parent / Gaurdian will be redirected to sign a waiver after this step. *Required*'}</p>
    </>
  );
}

export default SignupFormModal;