"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { checkAdminAccess } from "@/services/adminAPI";
import SpinnerWithMessage from "../global/Spinner/SpinnerScreen";

type AccessControlProps = {
  requireAuth: boolean | null;
  requireAdmin?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function AccessControl({
  requireAuth,
  requireAdmin = false,
  redirectTo = "/home/",
  fallback = (
    <SpinnerWithMessage></SpinnerWithMessage>
  ),
  children,
}: AccessControlProps) {
  const { user, loading } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(requireAdmin ? null : true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (requireAdmin && user) {
      let isMounted = true;

      checkAdminAccess()
        .then((res) => {
          if (!isMounted) return;
          const ok = res.status === 200 || res.status === 304;
          setIsAdmin(ok);
        })
        .catch(() => {
          if (isMounted) setIsAdmin(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [requireAdmin, user]);

  useEffect(() => {
    if (!loading && isAdmin !== null) {
      const isLogged = !!user;

      const shouldRedirect =
        (requireAuth === true && !isLogged) ||
        (requireAuth === false && isLogged) ||
        (requireAdmin && !isAdmin);

      if (shouldRedirect) {
        if (requireAuth === true && !isLogged) {
          const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname)}`;
          router.replace(redirectUrl);
        } else {
          router.replace(redirectTo);
        }
      }
    }
  }, [loading, user, isAdmin, requireAuth, requireAdmin, redirectTo, pathname, router]);

  const accessReady = loading === false && isAdmin !== null;

  const hasAccess = () => {
    const isLogged = !!user;

    if (requireAuth === true && !isLogged) return false;
    if (requireAuth === false && isLogged) return false;
    if (requireAdmin && !isAdmin) return false;

    return true;
  };

  if (!accessReady) return fallback;

  return hasAccess() ? <>{children}</> : null;
}