import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  balance: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  deviceId: string | null;
  isAuthenticated: boolean;
  lastActivity: number;
  setAuth: (user: User, token: string) => void;
  setDeviceId: (deviceId: string) => void;
  updateBalance: (balance: number) => void;
  updateActivity: () => void;
  checkSession: () => boolean;
  logout: () => void;
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      deviceId: null,
      isAuthenticated: false,
      lastActivity: Date.now(),

      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true, lastActivity: Date.now() });
      },

      setDeviceId: (deviceId) => {
        set({ deviceId });
      },

      updateBalance: (balance) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance } : null,
        })),

      updateActivity: () => {
        set({ lastActivity: Date.now() });
      },

      checkSession: () => {
        const { lastActivity, isAuthenticated } = get();
        const now = Date.now();

        if (isAuthenticated && now - lastActivity > SESSION_TIMEOUT) {
          get().logout();
          return false;
        }

        if (isAuthenticated) {
          set({ lastActivity: now });
        }

        return isAuthenticated;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          lastActivity: 0,
        });
      },
    }),
    {
      name: "client-auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Auto-logout on window close
window.addEventListener("beforeunload", () => {
  useAuthStore.getState().logout();
});

// Check session on visibility change
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    useAuthStore.getState().checkSession();
  }
});
