import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (!showSidebar) return;

    const closeSidebar = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('click', closeSidebar);

    return () => document.removeEventListener('click', closeSidebar);
  }, [showSidebar]);

  const closeSidebar = () => setShowSidebar(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeSidebar();
  };

  const sidebarClassName = `profile-sidebar${showSidebar ? '' : ' hidden'}`;

  return (
    <>
      <div className='menu' onClick={toggleSidebar}>
        <IoMenu className='menu-icon' />
      </div>
      <div className={sidebarClassName} ref={sidebarRef}>
        <div className='sidebar-content'>
          <NavLink className='link' to="/">Home</NavLink>
          <NavLink className='link' to="/">Partners</NavLink>
          <NavLink className='link' to="/">About</NavLink>
          <NavLink className='link' to="/">Registration</NavLink>
          <NavLink className='link' to="/">Games</NavLink>
          <NavLink className='link' to="/">Standings</NavLink>
          {user ? (
            <>
              {/* <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li> */}
              <li>
                <button className='logout' onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;