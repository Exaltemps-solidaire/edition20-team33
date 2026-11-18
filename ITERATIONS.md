# Itérations — ENDOmind (équipe HR4PCR)

- **Plan validé le 2026-11-18.**
- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : `cadrage/` ne contient qu'un plan de livraison en 2 grandes étapes, `6-plan-de-livraison.md`, pas un découpage en itérations courtes).
- **Temps restant annoncé** : 30 minutes, demandé le 2026-11-18.
- **Durée du tour de test de l'équipe** : 10 minutes (valeur par défaut, non confirmée par le développeur).
- **Capacité** : une itération dure au moins codage (≤ 10 min) + publication (~5 min) + tour de test (10 min), soit 15 à 25 minutes. Avec 30 minutes restantes, **une seule itération tient dans ce créneau**, avec une marge de 5 minutes si le codage prend ses 10 minutes complètes.
- ✂️ **Hors périmètre de ce créneau de build** : tout ce qui suit l'itération 1 — écran « Qui êtes-vous ? » (personas), saisie libre de question, autres ressources que « Mes droits », alerte automatique à la direction (le cœur de l'hypothèse de l'équipe), démo e2e étendue. Reporté en « À venir » ci-dessous, à reprendre si le temps de build est prolongé.
- ⚠️ Cette itération 1 joue donc un double rôle : c'est à la fois le squelette publié (prescrit par la section 3 de `CLAUDE.md`) et, dans les faits, la seule itération que ce créneau permet avant le pitch — elle est donc conçue pour être directement montrable, pas seulement technique.

## Itération 1 : La patiente ouvre le chatbot ENDOmind, voit les suggestions de questions fréquentes et obtient une ressource en cliquant sur l'une d'elles

- **Dans le périmètre** :
  - L'écran d'accueil du chatbot (logo ENDOmind, bandeau « pas d'avis médical », zone de conversation, 4 suggestions de questions fréquentes, zone de saisie non fonctionnelle à ce stade).
  - Un clic sur la suggestion « Mes droits (ALD, RQTH) » affiche la ressource ENDOmind correspondante (carte fiche ALD, donnée en dur), reproduisant l'état « Question droits » du prototype.
  - Le squelette déployé : `.env.example` et `DEPLOIEMENT.md` (les services `api/` et `frontend/` existent déjà dans le gabarit, avec `/health` et `/sante`).
- **Hors périmètre** : les 3 autres suggestions (réponse générique « je ne sais pas » acceptée pour l'instant, pas de carte dédiée), la saisie libre, l'écran « Qui êtes-vous ? », le sélecteur de région, l'alerte automatique.
- **Critères d'acceptation** :
  - Étant donné la page d'accueil chargée, quand elle s'affiche, alors on voit le logo ENDOmind, le bandeau « pas d'avis médical » et les 4 suggestions de questions fréquentes.
  - Étant donné l'écran d'accueil, quand on clique sur « Mes droits (ALD, RQTH) », alors la ressource ENDOmind correspondante (fiche ALD) s'affiche dans la zone de conversation.
  - Étant donné l'application déployée, quand on vérifie `$URL_PUBLIQUE/health` et `$URL_PUBLIQUE/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune directement — l'hypothèse de l'équipe porte sur l'alerte automatique (itération 2). Cette itération pose le cas passant de base sur lequel l'alerte s'appuiera.
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** :
  - `frontend/src/app/page.tsx` (écran d'accueil du chatbot)
  - `frontend/src/app/page.module.css` (styles de l'écran)
  - `frontend/src/app/ressources.ts` (mapping suggestion → ressource ENDOmind, fonction pure)
  - `.env.example`
  - `DEPLOIEMENT.md`
- **Tests unitaires prévus** : 1 à 3, sur la fonction de résolution suggestion → ressource dans `ressources.ts` (cas connu « droits », cas inconnu renvoyant la réponse par défaut).
- **Étapes ajoutées à la démo** : `test.step("Je vois les suggestions de questions fréquentes")`, `test.step("Je clique sur 'Mes droits (ALD, RQTH)' et je vois la ressource")`.
- **Bilan** :
  - Durée de codage réelle : 2 minutes (budget 10 min, aucun dépassement).
  - Critères d'acceptation : les 3 satisfaits — écran d'accueil avec logo/bandeau/suggestions, clic sur « Mes droits (ALD, RQTH) » affichant la ressource ALD, `/health` et `/sante` répondent 200 sur le frontend (8080) et l'api (8081) en local. `$URL_PUBLIQUE/health` et `/sante` restent à confirmer par le développeur dans son navigateur (non vérifiable depuis la machine).
  - Reporté : rien de nouveau par rapport au plan (tout le reste était déjà en « À venir »).
  - Harnais : aucun blocage — `npm test` au vert, `./scripts/verifier-deployabilite.sh --construire` sans borne (Docker absent, construction Docker non vérifiée, Podman utilisé directement pour le déploiement réel), `signaler-version.sh 1` accepté (`moteur_avance: false`).
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : mapping pur suggestion → ressource ENDOmind (ALD/RQTH + réponse par défaut) — sert les critères 2 et la testabilité (point 2 de la DoD).
    - `frontend/src/app/ressources.test.ts` : 2 tests Vitest sur `resoudreSuggestion` — point 2 de la DoD.
    - `frontend/src/app/page.tsx` : écran du chatbot (en-tête, bulle d'accueil, 4 suggestions, zone de saisie désactivée, affichage de la ressource au clic) — critères 1 et 2.
    - `frontend/src/app/page.module.css` : styles reproduisant la charte ENDOmind du prototype — critère 1.
    - `.env.example`, `DEPLOIEMENT.md` : squelette du contrat de déployabilité — critère 3.
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées `docker.io/library/...` pour le build sur cette machine.
    - `podman-compose.yml` : recette de déploiement (ports 8080/8081, réseau `core-network`).
    - `e2e/demo.spec.ts` : 2 étapes ajoutées (suggestions visibles, ressource ALD après clic) — démonstration du cas passant, hors DoD.

## Itération 2 : Les 3 autres suggestions renvoient chacune leur ressource ENDOmind dédiée

- **Plan validé le 2026-11-18.** Temps restant reconfirmé au début de `/iteration 2` : ~20-25 minutes.
- **Dans le périmètre** : ajouter dans `ressources.ts` les réponses pour « Réseau de médecins », « Le guide diagnostic » et « Groupes de parole » (chacune une ressource ENDOmind plausible, en dur), au lieu du message par défaut actuel.
- **Hors périmètre** : saisie libre, persona, région, alerte automatique (inchangé, toujours en « À venir »).
- **Critères d'acceptation** :
  - Étant donné l'écran d'accueil, quand on clique sur « Réseau de médecins », alors une ressource ENDOmind dédiée s'affiche (pas le message par défaut).
  - Étant donné l'écran d'accueil, quand on clique sur « Le guide diagnostic » ou « Groupes de parole », alors chacune affiche sa propre ressource.
  - Étant donné l'application redéployée, quand on vérifie `$URL_PUBLIQUE/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune — complète le phase 1 du plan de livraison de l'équipe (« chatbot avec suggestions et ressources ») avant l'alerte automatique.
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts`, `frontend/src/app/ressources.test.ts`.
- **Tests unitaires prévus** : 1 à 2, un par nouvelle suggestion résolue.
- **Étapes ajoutées à la démo** : `test.step("Je clique sur chaque suggestion et je vois une ressource dédiée")`.
- **Bilan** :
  - Durée de codage réelle : 4 minutes (budget 10 min, aucun dépassement).
  - Critères d'acceptation : les 3 satisfaits — « Réseau de médecins » affiche la carte des filières de soins, « Le guide diagnostic » et « Groupes de parole » affichent chacune leur ressource dédiée, `/health` et `/sante` répondent 200 sur le frontend (8080) et l'api (8081) en local après redéploiement. `$URL_PUBLIQUE/health` et `/sante` restent à confirmer par le développeur dans son navigateur (non vérifiable depuis la machine).
  - Reporté : rien de nouveau par rapport au plan (saisie libre, persona, région, alerte automatique restent en « À venir »).
  - Harnais : aucun blocage — `npm test` au vert (7 tests, dont 3 nouveaux et 1 test « inconnue » corrigé pour ne plus confondre avec « medecins » désormais résolu), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 2` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : ajout de 3 réponses dédiées (filières de soins, guide diagnostic, groupes de parole) — sert les 2 premiers critères.
    - `frontend/src/app/ressources.test.ts` : 3 nouveaux tests Vitest (un par nouvelle suggestion) + correction du test « suggestion inconnue » qui ciblait à tort `"medecins"` — point 2 de la DoD.
    - `DEPLOIEMENT.md` : section « connu comme fragile » mise à jour (les 4 suggestions ont désormais une vraie ressource).
    - `e2e/demo.spec.ts` : étape ajoutée couvrant les 3 nouvelles ressources — démonstration du cas passant, hors DoD.

## À venir

1. Écran « Qui êtes-vous ? » au lancement (personas, pas de connexion) + bouton pour en changer.
2. Saisie libre de question, avec réponse « je ne sais pas » + contact humain (info@endomind.org) quand hors ressources.
3. Sélecteur de région (filière de soins régionale).
4. Alerte automatique à la direction quand le chatbot ne sait pas répondre ou détecte une situation sensible (encadré « Alerte envoyée à l'équipe ENDOmind ») — couvre l'hypothèse mesurée de l'équipe (cible 100 %).
