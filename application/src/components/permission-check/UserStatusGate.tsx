"use client";

import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import SpinnerWithMessage from "../global/Spinner/SpinnerScreen";

interface UserStatusGateProps {
  guestComponent: ReactNode;
  connectedComponent: ReactNode;
  loadingComponent?: ReactNode;
}

export default function UserStatusGate({
  guestComponent,
  connectedComponent,
  loadingComponent = (
    <div className="flex justify-center items-center min-h-screen">
      <SpinnerWithMessage />
    </div>
  ),
}: UserStatusGateProps) {
  const { user, loading } = useUser();

  if (loading) return <>{loadingComponent}</>;

  return <>{user ? connectedComponent : guestComponent}</>;
}