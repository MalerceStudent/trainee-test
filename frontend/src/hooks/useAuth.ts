"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { fetchProfile } from "@/util/user-requests";

export function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const query = useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      return fetchProfile(token);
    },
    retry: false,
    enabled: true, 
  });

  useEffect(() => {
    if (token === null) return; 
    if (!token || query.isError) {
      router.push("/login");
    }
  }, [token, query.isError, router]);

  return query;
}
