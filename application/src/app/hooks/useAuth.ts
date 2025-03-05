import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMembre } from "./MemberContext";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { membre } = useMembre();

  useEffect(() => {
    if (membre != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/");
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
