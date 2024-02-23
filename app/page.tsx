"use client";
import React from "react";
import AuthForm from "../components/AuthForm";
import Home from "./home";
import useAuth from "../hooks/useAuth";
import LoadingIndicator from "../components/LoadingIndcator";

export default function Login() {
  const loggedIn = useAuth();

  if (loggedIn === null) {
    return <LoadingIndicator />; // ローディングインジケーターを表示
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loggedIn ? <Home /> : <AuthForm />}
    </main>
  );
}
