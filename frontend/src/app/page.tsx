"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { resoudreSuggestion, type ReponseSuggestion } from "./ressources";

type Message =
  | { type: "bot-intro" }
  | { type: "user"; texte: string }
  | { type: "bot-reponse"; reponse: ReponseSuggestion };

const SUGGESTIONS: { id: string; label: string }[] = [
  { id: "droits", label: "Mes droits (ALD, RQTH)" },
  { id: "medecins", label: "Réseau de médecins" },
  { id: "guide", label: "Le guide diagnostic" },
  { id: "groupes", label: "Groupes de parole" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{ type: "bot-intro" }]);

  function poserQuestion(id: string, label: string) {
    const reponse = resoudreSuggestion(id);
    setMessages((precedents) => [
      ...precedents,
      { type: "user", texte: label },
      { type: "bot-reponse", reponse },
    ]);
  }

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        <header className={styles.header}>
          <div className={styles.logo}>ENDO</div>
          <div>
            <h1>ENDOMIND</h1>
            <p>Chatbot d&apos;information · Pas d&apos;avis médical</p>
          </div>
        </header>

        <div className={styles.messages}>
          {messages.map((message, index) => {
            if (message.type === "bot-intro") {
              return (
                <div key={index} className={`${styles.bubble} ${styles.bubbleBot}`}>
                  Bonjour 👋 Je suis le chatbot d&apos;ENDOmind.
                  <br />
                  <br />
                  Je peux vous orienter vers nos ressources gratuites sur l&apos;endométriose —
                  guide, fiches pratiques, droits, filières de soins.
                  <br />
                  <br />
                  <strong>Je ne donne pas d&apos;avis médical.</strong> Si votre question dépasse
                  mes ressources, je vous indique vers qui vous tourner.
                </div>
              );
            }
            if (message.type === "user") {
              return (
                <div key={index} className={`${styles.bubble} ${styles.bubbleUser}`}>
                  {message.texte}
                </div>
              );
            }
            return (
              <div key={index} className={`${styles.bubble} ${styles.bubbleBot}`}>
                {message.reponse.intro}
                {message.reponse.ressources.map((ressource) => (
                  <div key={ressource.titre} className={styles.ressourceCard}>
                    <span>{ressource.label}</span>
                    <strong>{ressource.titre}</strong>
                    <span>{ressource.description}</span>
                    <a href="#">{ressource.lien}</a>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className={styles.suggestions}>
          <span className={styles.suggestionsLabel}>Questions fréquentes</span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.id}
              className={styles.suggestionButton}
              onClick={() => poserQuestion(suggestion.id, suggestion.label)}
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        <form className={styles.inputArea} onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Posez votre question…" aria-label="Votre question" disabled />
        </form>
      </div>
    </div>
  );
}
