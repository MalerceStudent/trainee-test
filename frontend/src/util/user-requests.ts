import { User } from "@/types/user";

export async function signIn({ email, password }: { email: string, password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      const error = new Error('Failed to signin') as any;
      error.code = res.status;
      error.info = data;
      throw error;
    }
    console.log(data)
    return data;
  }
  
  export async function signUp({ email, password }: { email: string, password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      const error = new Error('Failed to signup') as any;
      error.code = res.status;
      error.info = data;
      throw error;
    }
    console.log(data)
    return data;
  }
  
  export async function fetchProfile(token: string): Promise<User> {
    console.log(token, "fetch")
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.message || "Unauthorized") as any;
    error.code = res.status;
    throw error;
  }

  const data = await res.json();
  return data.user;
}
