import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import { NavLink } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import { IoMenu } from "react-icons/io5";
import './ProfileButton.css'
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

  const sidebarClassName = "profile-sidebar" + (showSidebar ? "" : " hidden");

  return (
    <>
      <div className='menu' onClick={toggleSidebar}>
        <IoMenu className='menu-icon'/>
      </div>
      <div className={sidebarClassName} ref={sidebarRef}>
        {user ? (
          <div className='sidebar-content'>
            <NavLink className='link' to="/">Home</NavLink>
            <NavLink className='link' to="/">Partners</NavLink>
            <NavLink className='link' to="/">About</NavLink>
            <NavLink className='link' to="/">Regsitration</NavLink>
            <NavLink className='link' to="/">Games</NavLink>
            <NavLink className='link' to="/">Standings</NavLink>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button className='logout' onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeSidebar}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeSidebar}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;