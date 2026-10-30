import { create } from 'zustand';
import { authAPI } from '@/lib/apiEndpoints';
import { authUtils } from '@/lib/authUtils';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: authUtils.getUser(),
  isAuthenticated: authUtils.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      authUtils.setToken(response.token);
      authUtils.setUser(response.user);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.signup({ name, email, password });
      authUtils.setToken(response.token);
      authUtils.setUser(response.user);
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Signup failed. Please try again.';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authUtils.logout();
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  setUser: (user: User | null) => {
    if (user) {
      authUtils.setUser(user);
    } else {
      authUtils.removeUser();
    }
    set({ user, isAuthenticated: !!user });
  },

  checkAuth: () => {
    const user = authUtils.getUser();
    const isAuthenticated = authUtils.isAuthenticated();
    set({ user, isAuthenticated });
  },
}));
