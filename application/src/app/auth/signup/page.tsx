"use client";

import AccessControl from "@/components/permission-check/AccessControl";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";


export default function SignupPage() {
  return (
    <AccessControl requireAuth={false}>
      <Signup />
      <Toaster position="top-right" reverseOrder={false} />
    </AccessControl>
  );
}