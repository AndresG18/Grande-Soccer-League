import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
      <>
        <ProfileButton user={sessionUser} />
      </>
    ) : (
      <>
        <>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          {/* <NavLink to="/login">Log In</NavLink> */}
        </>
        <>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
        </>
      </>
    );

  return (
    <div className='navBar'> 
    <h2>some stuff</h2>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
