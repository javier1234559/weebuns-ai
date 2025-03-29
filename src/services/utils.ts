import axios from "axios";
import { globalConfig } from "@/config";
import { jwtDecode } from "jwt-decode";
import { User } from "@/services/swagger-types";

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

interface RefreshResponse {
  access_token: string;
}

class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string> | null = null;
  private readonly tokenKey = "accessToken";
  private readonly userKey = "auth";
  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public async getToken(): Promise<string | null> {
    // If there's already a refresh in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const token = this.getAccessToken();

    // If no token exists, return null
    if (!token) {
      return null;
    }

    // Check token expiration
    if (this.isTokenExpired(token)) {
      // Token is expired, attempt to refresh
      return this.refreshToken();
    }

    // Token is valid
    return token;
  }

  public getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    const authStr = localStorage.getItem(this.userKey);
    if (!authStr) return null;
    try {
      const state = JSON.parse(authStr);
      return state.state.token;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return null;
    }
  }

  public saveToken(token: string): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(this.tokenKey, token);
  }

  public clearToken(): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(this.tokenKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = jwtDecode<TokenPayload>(token);
      // Check if token is expired - add 10 second buffer
      console.log(JSON.stringify(payload, null, 2));
      return payload.exp * 1000 < Date.now() + 10000;
    } catch (error) {
      // If we can't decode the token, assume it's expired
      console.error("Error decoding token:", error);
      return true;
    }
  }

  private refreshToken(): Promise<string> {
    // If there's already a refresh in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    // Create new refresh promise
    this.refreshPromise = new Promise<string>((resolve, reject) => {
      axios
        .post<RefreshResponse>(
          `${globalConfig.API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }, // Important to include cookies
        )
        .then((response) => {
          const newToken = response.data.access_token;
          this.saveToken(newToken);
          resolve(newToken);
        })
        .catch((error) => {
          // On error, clear token and reject
          console.error("Failed to refresh token:", error);
          this.clearToken();
          reject(error);
        })
        .finally(() => {
          // Reset the refresh promise
          this.refreshPromise = null;
        });
    });

    return this.refreshPromise;
  }

  public getUser(): User | null {
    if (typeof window === "undefined") {
      return null;
    }
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;

    try {
      const state = JSON.parse(userStr);
      return state.state.user;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  public saveUser(userData: any): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(
      this.userKey,
      JSON.stringify({
        state: { user: userData },
        version: 0,
      }),
    );
  }

  public clearUser(): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(this.userKey);
  }
}

export const handleToken = async (): Promise<string | null> => {
  return TokenManager.getInstance().getToken();
};

export const getCurrentToken = (): string | null => {
  return TokenManager.getInstance().getAccessToken();
};

export const getCurrentUser = (): User | null => {
  return TokenManager.getInstance().getUser();
};

export const tokenManager = TokenManager.getInstance();

export default tokenManager;
