import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Usuń token z localStorage
    localStorage.removeItem('admin_token');
    
    // Przekieruj na stronę logowania
    navigate('/admin-login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-business-blue-600 mx-auto mb-4"></div>
        <p className="text-warm-neutral-600 text-lg">Wylogowywanie...</p>
      </div>
    </div>
  );
};

export default AdminLogout;