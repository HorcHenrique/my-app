"use client";

import { useState } from "react";
import Brain from "./brain";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<"signin" | "login">("signin");
  const [submitFeedback, setSubmitFeedback] = useState<{
    type: "idle" | "error" | "success";
    message: string;
  }>({ type: "idle", message: "" });

  const [signinName, setSigninName] = useState("");
  const [signinLastName, setSigninLastName] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinConfirmPassword, setSigninConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signinEmailVerification =
    Boolean(signinEmail.includes("@") && signinEmail.trim());


  function signinPasswordVerification() {
    const hasNumber = Boolean(/\d/.test(signinPassword));
    const hasLetter = Boolean(/[a-zA-Z]/.test(signinPassword));
    const has8digists = Boolean(signinPassword.length >= 8);
    const equalsToConfirmPassword = passwordsMatch();

    return Boolean(
      signinPassword.trim()
      && hasNumber
      && hasLetter
      && has8digists
      && equalsToConfirmPassword);
  }
  function passwordsMatch() {
    return signinPassword === signinConfirmPassword;
  }

  const canApply =
    selectedMode === "signin"
      ? Boolean(
        signinName.trim() &&
        signinLastName.trim() &&
        signinEmailVerification &&
        signinPasswordVerification()
      )
      : Boolean(loginEmail.trim() && loginPassword.trim());


  const handleApply = () => {
    if (!canApply) {
      setSubmitFeedback({ type: "error", message: getValidationMessage() });
      return;
    }

    setSubmitFeedback({
      type: "success",
      message: selectedMode === "signin" ? "Conta criada com sucesso" : "Logado com sucesso",
    });
  }


  const getValidationMessage = () => {
    if (selectedMode === "signin") {
      if (!signinName.trim()) return "Preencha o nome.";
      if (!signinLastName.trim()) return "Preencha o sobrenome.";
      if (!signinEmail.trim()) return "Preencha o email.";
      if (!signinEmail.includes("@")) return "Digite um email valido";
      if (!signinPassword.trim()) return "Preencha a senha.";
      if (!signinConfirmPassword.trim()) return "Confirme a senha.";
      if (!passwordsMatch()) return "As senhas nao coincidem.";
      if (!signinPasswordVerification()) return "Essa senha nao é valida, min 1 letra 1 numero e 8 caractere"
      return "";
    }

    if (!loginEmail.trim()) return "Preencha o email.";
    if (!loginPassword.trim()) return "Preencha a senha.";
    return "";
  };


  return (
    <main>
      <div className="input-container">
        <div className="selector">
          <button
            type="button"
            className={`signin ${selectedMode === "signin" ? "active" : ""}`}
            onClick={() => {
              setSelectedMode("signin");
              setSubmitFeedback({ type: "idle", message: "" });
            }}
          >
            Sign-in
          </button>
          <button
            type="button"
            className={`login ${selectedMode === "login" ? "active" : ""}`}
            onClick={() => {
              setSelectedMode("login");
              setSubmitFeedback({ type: "idle", message: "" });
            }}
          >
            Log-In
          </button>
        </div>
        {renderOptions()}
      </div>
    </main>
  );



  function renderOptions() {
    if (selectedMode === "login") {
      return (
        <div className="input-div">
          <div>
            <label className="text-sett" htmlFor="login-email">Digite seu Email</label>
            <input
              className="input"
              type="email"
              name="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sett" htmlFor="login-password">Digite sua Senha</label>
            <input
              className="input"
              type="password"
              name="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div>
            <Brain onApply={handleApply} />
          </div>
          {submitFeedback.type === "error" && (
            <p className="form-error">{submitFeedback.message}</p>
          )}
          {submitFeedback.type === "success" && (
            <p className="form-sucess">{submitFeedback.message}</p>
          )}
        </div>
      );
    }

    return (
      <div className="input-div">
        <div>
          <label className="text-sett" htmlFor="signin-name">Nome</label>
          <input
            className="input"
            type="text"
            name="name"
            id="signin-name"
            value={signinName}
            onChange={(e) => setSigninName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sett" htmlFor="signin-lastname">Sobrenome</label>
          <input
            className="input"
            type="text"
            name="lastName"
            id="signin-lastname"
            value={signinLastName}
            onChange={(e) => setSigninLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sett" htmlFor="signin-email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="signin-email"
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sett" htmlFor="signin-password">Senha</label>
          <input
            className="input"
            type="password"
            name="password"
            id="signin-password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sett" htmlFor="signin-password-confirm">Confirmar Senha</label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            id="signin-password-confirm"
            value={signinConfirmPassword}
            onChange={(e) => setSigninConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <Brain onApply={handleApply} />
        </div>
        {submitFeedback.type === "error" && (
          <p className="form-error">{submitFeedback.message}</p>
        )}
        {submitFeedback.type === "success" && (
          <p className="form-sucess">{submitFeedback.message}</p>
        )}
      </div>
    );
  }
}