"use client";

import NotProtectedRoute from "@/components/permission-check/NotProtectedRoute";
import Signup from "./signup";
import { Toaster } from "react-hot-toast";


export default function SignupPage() {
  return (
    <NotProtectedRoute>
      <Signup />
      <Toaster position="top-right" reverseOrder={false} />
    </NotProtectedRoute>
  );
}