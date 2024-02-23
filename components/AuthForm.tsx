"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Typography, Link } from "@mui/material";
import { signUp, signIn } from "../app/services/authService"; // signUpとsignIn関数の両方をインポート

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true); // サインアップ画面かログイン画面かを切り替える状態
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // ここでステートを定義
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const switchMode = () => {
    setAuthError("");
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setTermsAccepted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAuthError("Invalid email");
      return;
    }

    if (password === "") {
      setAuthError("Password is required");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    try {
      if (isSignUp) {
        const response = await signUp(email, password);
        if (response.success) {
          router.push("/home");
        }
      } else {
        const response = await signIn(email, password);
        console.log(response, "response");
        if (response.success) {
          router.push("/home");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        boxShadow: 3,
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {isSignUp ? "Sign Up" : "Login"}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {isSignUp
          ? "Create your account to get started"
          : "Enter your email below to login to your account"}
      </Typography>
      {authError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {authError}
        </Typography>
      )}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          data-testid="emailInput"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          data-testid="passwordInput"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        {isSignUp && (
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        )}
        {isSignUp && (
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                name="termsAccepted"
              />
            }
            label="I agree to the Terms of Service"
            sx={{ mt: 2 }}
          />
        )}
        <Button
          data-testid="loginButton"
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
            bgcolor: "black !important",
            color: "white !important",
            "&:hover": {
              bgcolor: "darkgray !important", // ホバー時の背景色を濃い灰色に設定
            },
          }}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          <Link
            data-testid="switchLink"
            href="#"
            onClick={switchMode}
            sx={{ cursor: "pointer", textDecoration: "none" }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default AuthForm;
