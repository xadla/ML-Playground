import { useNavigate } from 'react-router-dom';

import useAuth from '../../auth/AuthContext';

const LogoutButton = ({ classes }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logout();
      console.log(result);
      if (result.data.message === "Success") {
        console.log("You are logged out");
        navigate('/');
      } else if (result.data.message === "Failed") {
        console.log("You are not Login yet!");
      } else {
        console.log("There is something wrong please try again!");
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={classes}>
      Logout
    </button>
  );
};

export default LogoutButton;
