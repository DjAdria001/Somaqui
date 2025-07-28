import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<null | { name: string; email: string }>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Aquí irá la lógica de autenticación real
      // Por ahora simulamos un login exitoso
      console.log('Attempting login with:', email, password);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular usuario autenticado
      setUser({ name: 'Usuario de prueba', email });
      setIsAuthenticated(true);
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('auth_user', JSON.stringify({ name: 'Usuario de prueba', email }));
      localStorage.setItem('auth_token', 'mock_token');
      
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Error al iniciar sesión');
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      // Validaciones básicas
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      
      if (userData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      console.log('Attempting register with:', userData);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular registro exitoso y login automático
      setUser({ name: userData.name, email: userData.email });
      setIsAuthenticated(true);
      
      // Guardar en localStorage
      localStorage.setItem('auth_user', JSON.stringify({ name: userData.name, email: userData.email }));
      localStorage.setItem('auth_token', 'mock_token');
      
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  // Verificar si hay una sesión guardada al inicializar
  React.useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
