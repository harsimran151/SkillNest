import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Simulated user database
const users: Map<string, { name: string; email: string; password: string }> = new Map();

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedUser = users.get(email);
    
    if (!storedUser) {
      return { success: false, error: 'No account found with this email. Please sign up first.' };
    }
    
    if (storedUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }
    
    set({
      user: { id: email, name: storedUser.name, email },
      isAuthenticated: true,
    });
    
    return { success: true };
  },
  
  signup: async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (users.has(email)) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }
    
    users.set(email, { name, email, password });
    
    set({
      user: { id: email, name, email },
      isAuthenticated: true,
    });
    
    return { success: true };
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
