"use client";

import AccessControl from "@/components/permission-check/AccessControl";
import Signup from "./signup";
import { Toaster } from "react-hot-toast";
import { SignupProvider } from "./SignupProvider";

export default function SignupPage() {
  return (
    <AccessControl requireAuth={false}>
      <SignupProvider>
        <Signup />
        <Toaster position="top-right" reverseOrder={false} />
      </SignupProvider>
    </AccessControl>
  );
}