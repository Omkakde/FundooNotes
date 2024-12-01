import * as React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Account } from '@toolpad/core/Account';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { UserOrg } from './AccountData';

const demoSession = {
  user: {
    name: localStorage.getItem("username"),
    email: localStorage.getItem("userEmail"),
    image: localStorage.getItem("username"),
  },
  org: {
    name: 'Google Keep',
    url: '',
    logo: '/logo.png',
  },
};

export default function AccountCustomUserDetails() {
  const [customSession, setCustomSession] = React.useState(demoSession);
  const navigate = useNavigate();

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setCustomSession(demoSession);
      },
      signOut: () => {
        
        setTimeout(() => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem("username")
            localStorage.removeItem("userEmail")
            navigate('/login'); 
          }, 2000); 
        setCustomSession(null);
        navigate('/login');
      },
    };
  }, [navigate]);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={customSession}>
       
        <Account
          slots={{
            popoverContent: UserOrg,
          }}
        />
       
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}
