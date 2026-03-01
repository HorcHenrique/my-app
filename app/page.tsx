"use client";

import { useState } from "react";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("0");

  function catchId(id: string) {
    setSelectedId(id);
  }

  return (
    <main>
      <div className="input-container">
        <div className="selector">
          <button
            id="0"
            type="button"
            className={`signin ${selectedId === "0" ? "active" : ""}`}
            onMouseDown={() => catchId("0")}
            onClick={() => catchId("0")}
          >
            Sign-in
          </button>
          <button
            id="1"
            type="button"
            className={`login ${selectedId === "1" ? "active" : ""}`}
            onMouseDown={() => catchId("1")}
            onClick={() => catchId("1")}
          >
            Log-In
          </button>
        </div>

        {renderOptions()}


      </div>
    </main>
  );

  function renderOptions() {
    if (selectedId === "1") {
      return (
        <>
          <div className="info-input">
            <div>
              <p className="text-sett">Digite seu Email</p>
              <input className="input" type="text" name="Digite seu email..." id="email" />
            </div>
            <div>
              <p className="text-sett">Digite sua Senha</p>
              <input className="input" type="text" name="Digite sua senha..." id="email" />
            </div>
          </div>
        </>
      )
    }
    else {
      return (
        <button>coco</button>
      )
    }
  }




}