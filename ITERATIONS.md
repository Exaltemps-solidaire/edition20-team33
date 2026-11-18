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
- **Bilan** : _à remplir en fin d'itération (durée de codage réelle, dépassement éventuel, fait, reporté, modifications fichier par fichier)._

## À venir

1. Écran « Qui êtes-vous ? » au lancement (personas, pas de connexion) + bouton pour en changer.
2. Les 3 autres suggestions (réseau de médecins, guide diagnostic, groupes de parole) avec leurs ressources dédiées.
3. Saisie libre de question, avec réponse « je ne sais pas » + contact humain (info@endomind.org) quand hors ressources.
4. Sélecteur de région (filière de soins régionale).
5. Alerte automatique à la direction quand le chatbot ne sait pas répondre ou détecte une situation sensible (encadré « Alerte envoyée à l'équipe ENDOmind ») — couvre l'hypothèse mesurée de l'équipe (cible 100 %).
