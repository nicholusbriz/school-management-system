import { create } from 'zustand';
import { useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    set({ user: null, token: null, isAuthenticated: false });
  },
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') as 'admin' | 'teacher' | 'student' | null;
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (token && userRole && userName && userEmail) {
      set({
        user: { id: '', email: userEmail, name: userName, role: userRole },
        token,
        isAuthenticated: true,
      });
    }
  },
}));

// Hook to initialize auth on app mount
export const useInitializeAuth = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
};
