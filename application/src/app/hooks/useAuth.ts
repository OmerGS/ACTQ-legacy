import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user"); 
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/auth/login");
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
