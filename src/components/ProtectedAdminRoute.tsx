import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('admin_authenticated');
      const authTime = localStorage.getItem('admin_auth_time');
      
      if (authToken === 'true' && authTime) {
        const loginTime = parseInt(authTime);
        const currentTime = Date.now();
        const hourInMs = 60 * 60 * 1000; // 1 godzina
        
        // Sprawdź czy sesja nie wygasła (1 godzina)
        if (currentTime - loginTime < hourInMs) {
          setIsAuthenticated(true);
        } else {
          // Sesja wygasła
          localStorage.removeItem('admin_authenticated');
          localStorage.removeItem('admin_auth_time');
          navigate('/admin-login');
        }
      } else {
        navigate('/admin-login');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie uprawnień...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect jest obsługiwany w useEffect
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;