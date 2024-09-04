import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../authcontext';

const Logout = () => {
    // const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // logout();
    const performLogout = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/authentication/sign-in');
        return;
      }

      try {
        await fetch('https://e75b-140-213-1-165.ngrok-free.app/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Hapus token dari localStorage
        localStorage.removeItem('authToken');

        // Arahkan pengguna ke halaman login
        navigate('/authentication/sign-in');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>; // Pesan sementara saat logout
};

export default Logout;
