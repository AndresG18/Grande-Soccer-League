import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import '../../../public/Logo.png'
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navBar'>
     <img src='http://pinfluence-2024.s3.amazonaws.com/12467bab7ad243e3b498a0ecdbb8cd2b.png' alt="" style={{height:'50px',width:'200px',marginLeft:'5%'}} />
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;