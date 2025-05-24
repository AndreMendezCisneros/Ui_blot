import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'coordinator' | 'teacher';

interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  specialty?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Mock authentication - in a real app, this would be an API call
      // For demo purposes, any valid input will authenticate
      if (username && password) {
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          name: role === 'coordinator' ? 'Coordinator Admin' : 'Teacher User',
          username,
          role,
          specialty: role === 'teacher' ? 'Mathematics' : undefined
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};