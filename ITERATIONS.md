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

## Itération 3 : Au lancement, la patiente choisit un profil avant d'entrer dans le chatbot

- **Plan validé le 2026-11-18.** Temps restant annoncé au début de `/iteration 3` : ~15-20 minutes.
- ✂️ Avec 15-20 minutes restantes et un codage estimé à 8-10 minutes + ~5 minutes de publication, il reste très peu de marge pour le tour de test de l'équipe (0 à 7 minutes). Si le temps restant se confirme en bas de fourchette, cette itération sera probablement la dernière avant le pitch : je viserai un codage plus proche de 5-6 minutes et je reporterai le 3e critère (bouton de changement de profil) si besoin, plutôt que de dépasser le budget.
- **Dans le périmètre** : un écran « Qui êtes-vous ? » affiché avant l'écran de chat (2-3 profils en boutons, ex. « Je viens d'être diagnostiquée », « Je cherche un spécialiste », « J'accompagne une proche »), sans connexion ni persistance. Un bouton dans l'en-tête du chat permet d'y revenir pour changer de profil.
- **Hors périmètre** : personnalisation des ressources selon le profil choisi (le mapping suggestion → ressource reste le même pour tous, l'itération pose seulement l'écran et la navigation) ; saisie libre, région, alerte automatique.
- **Critères d'acceptation** :
  - Étant donné l'application ouverte, quand elle charge, alors l'écran « Qui êtes-vous ? » s'affiche avant le chat, avec les profils proposés.
  - Étant donné l'écran « Qui êtes-vous ? », quand on clique sur un profil, alors l'écran du chatbot s'affiche.
  - Étant donné le chat affiché, quand on clique sur le bouton de changement de profil, alors l'écran « Qui êtes-vous ? » réapparaît.
- **Hypothèse de l'équipe couverte** : aucune directement — prépare l'écran d'entrée attendu par le prototype avant la saisie libre et l'alerte (itérations suivantes).
- **Codage estimé** : 8-10 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, un nouveau composant ou état local pour l'écran profil (≈1 fichier de plus si extrait).
- **Tests unitaires prévus** : 1 à 2, sur la logique de bascule d'écran si elle est extraite en fonction pure ; sinon, flagger (❗️) l'absence de logique métier testable et proposer d'ajouter le test à l'itération suivante qui en introduira (saisie libre).
- **Étapes ajoutées à la démo** : `test.step("Je choisis un profil avant d'entrer dans le chatbot")`.
- **Bilan** :
  - Durée de codage réelle : moins d'1 minute (51 secondes, budget 8-10 min, aucun dépassement — l'estimation initiale était large).
  - Critères d'acceptation : les 3 satisfaits — l'écran « Qui êtes-vous ? » s'affiche au chargement avec 3 profils, un clic sur un profil ouvre le chat, le bouton « Changer de profil » dans l'en-tête du chat y ramène. `/health` et `/sante` répondent 200 sur le frontend (8080) et l'api (8081) en local après redéploiement. `$URL_PUBLIQUE/health` et `/sante` restent à confirmer par le développeur dans son navigateur.
  - Reporté : rien — la personnalisation des ressources selon le profil choisi reste hors périmètre, comme prévu, et n'a pas été ajoutée.
  - Harnais : aucun blocage — `npm test` au vert (11 tests dont 3 nouveaux sur `trouverProfil`), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 3` accepté. Le point flagué dans le plan (logique métier testable) a été résolu en extrayant `profils.ts` (liste + résolution par id) plutôt qu'en codant les profils en dur dans `page.tsx` — cohérent avec le choix déjà fait pour `ressources.ts`.
  - **Modifications** :
    - `frontend/src/app/profils.ts` : liste des 3 profils + fonction pure `trouverProfil(id)` — logique métier testable, sert la testabilité (point 2 de la DoD).
    - `frontend/src/app/profils.test.ts` : 3 tests Vitest sur `trouverProfil` et la liste `PROFILS` — point 2 de la DoD.
    - `frontend/src/app/page.tsx` : état `profilId`, écran de choix de profil avant le chat, bouton « Changer de profil » dans l'en-tête — sert les 3 critères.
    - `frontend/src/app/page.module.css` : styles de l'écran de profil et du bouton de bascule — critère 1.
    - `e2e/demo.spec.ts` : étape ajoutée pour choisir un profil avant d'entrer dans le chat — démonstration du cas passant, hors DoD.

## Itération 4 : La patiente tape sa question au clavier et obtient une ressource ou le contact humain

- **Plan validé le 2026-11-18.** Temps restant annoncé au début de `/iteration 4` : ~15 minutes.
- ✂️ Avec 15 minutes et ~5 minutes de publication incompressibles, le codage est réduit à 5-6 minutes (au lieu des 8-10 estimées), au prix d'un tour de test de l'équipe très court voire inexistant. Si le codage dépasse 6-7 minutes, je m'arrête et je publie ce qui marche, quitte à reporter le cas « sans mot-clé connu ».
- **Dans le périmètre** : activer le champ de saisie (actuellement désactivé), faire correspondre le texte tapé à une suggestion connue par mots-clés simples (droits/ALD/RQTH, médecin/spécialiste, diagnostic/guide, groupe/parole), et à défaut afficher le message de contact humain déjà présent dans `REPONSE_PAR_DEFAUT`.
- **Hors périmètre** : compréhension de langage naturel avancée, historique persistant, région, alerte automatique à la direction.
- **Critères d'acceptation** :
  - Étant donné le chat affiché, quand on tape une question contenant un mot-clé connu (ex. « spécialiste ») et qu'on valide, alors la ressource correspondante s'affiche.
  - Étant donné le chat affiché, quand on tape une question sans mot-clé connu et qu'on valide, alors le message de contact humain s'affiche.
- **Hypothèse de l'équipe couverte** : aucune directement — prépare la saisie libre avant l'alerte automatique (itération suivante), qui elle couvre l'hypothèse mesurée de l'équipe.
- **Codage estimé** : 8-10 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts` (fonction de correspondance mots-clés → id de suggestion), `frontend/src/app/ressources.test.ts`, `frontend/src/app/page.tsx` (activer le champ, appeler la résolution).
- **Tests unitaires prévus** : 1 à 3, sur la fonction de correspondance mots-clés → suggestion.
- **Étapes ajoutées à la démo** : `test.step("Je tape une question et j'obtiens une ressource ou le contact humain")`.
- **Bilan** :
  - Durée de codage réelle : 68 secondes (budget réduit à 5-6 min compte tenu du temps restant serré, aucun dépassement).
  - Critères d'acceptation : les 2 satisfaits — taper une question avec un mot-clé connu (ex. « spécialiste ») affiche la ressource correspondante, taper une question sans mot-clé connu affiche le message de contact humain. `/health` et `/sante` répondent 200 sur le frontend (8080) et l'api (8081) en local après redéploiement. `$URL_PUBLIQUE/health` et `/sante` restent à confirmer par le développeur dans son navigateur.
  - Reporté : rien de nouveau par rapport au plan.
  - Harnais : aucun blocage — `npm test` au vert (10 tests frontend, dont 2 nouveaux sur `resoudreTexteLibre`), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 4` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : ajout de `resoudreTexteLibre` (correspondance mots-clés → suggestion, repli sur le contact humain) — logique métier testable, sert les 2 critères.
    - `frontend/src/app/ressources.test.ts` : 2 nouveaux tests Vitest sur `resoudreTexteLibre` — point 2 de la DoD.
    - `frontend/src/app/page.tsx` : champ de saisie activé, état `texteLibre`, soumission du formulaire appelant `resoudreTexteLibre` — sert les 2 critères.
    - `frontend/src/app/page.module.css` : style du bouton d'envoi.
    - `e2e/demo.spec.ts` : étape ajoutée couvrant les deux cas (mot-clé reconnu / contact humain) — démonstration du cas passant, hors DoD.

## Itération 5 : Quand le chatbot ne reconnaît pas la question, un encadré signale que l'équipe ENDOmind est alertée

- **Plan validé le 2026-11-18.** Temps restant annoncé au début de `/iteration 5` : ~10-15 minutes.
- ✂️ Comme pour l'itération 4, le codage vise 3-5 minutes pour laisser de la marge à la publication ; le tour de test de l'équipe sera très court.
- **Dans le périmètre** : quand `resoudreTexteLibre` ne reconnaît aucun mot-clé (réponse de contact humain), la bulle affichée s'accompagne d'un encadré visuel « ⚠️ Alerte envoyée à l'équipe ENDOmind ». Aucun envoi réel (pas d'e-mail, pas d'appel API) : c'est un indicateur visuel simulé, cohérent avec le reste de l'app qui n'a pas encore de backend branché.
- **Hors périmètre** : envoi réel d'une alerte (e-mail, webhook), détection de situations sensibles au-delà du « je ne sais pas », sélecteur de région (reporté après, voir ci-dessous).
- **Critères d'acceptation** :
  - Étant donné une question tapée sans mot-clé connu, quand la réponse s'affiche, alors l'encadré « Alerte envoyée à l'équipe ENDOmind » apparaît avec elle.
  - Étant donné une suggestion ou une question avec un mot-clé connu, quand la réponse s'affiche, alors aucun encadré d'alerte n'apparaît.
- **Hypothèse de l'équipe couverte** : oui — l'hypothèse mesurée de l'équipe (cible 100 %) porte sur l'alerte automatique à la direction quand le chatbot ne sait pas répondre.
- **Codage estimé** : 3-5 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts` (champ `alerte` sur `ReponseSuggestion`), `frontend/src/app/ressources.test.ts`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : 1 à 2, vérifiant que seule la réponse par défaut porte `alerte: true`.
- **Étapes ajoutées à la démo** : extension de `test.step("Je tape une question et j'obtiens une ressource ou le contact humain")` pour vérifier l'encadré d'alerte.
- **Bilan** :
  - Durée de codage réelle : 39 secondes (budget réduit à 3-5 min, aucun dépassement).
  - Critères d'acceptation : les 2 satisfaits — une question sans mot-clé connu affiche le contact humain accompagné de l'encadré « Alerte envoyée à l'équipe ENDOmind », une question avec un mot-clé connu n'affiche aucun encadré. `/health` et `/sante` répondent 200 sur le frontend (8080) et l'api (8081) en local après redéploiement. `$URL_PUBLIQUE/health` et `/sante` restent à confirmer par le développeur dans son navigateur.
  - Reporté : rien de nouveau ; l'envoi réel de l'alerte (e-mail/webhook) reste hors périmètre, comme prévu — c'est un indicateur visuel simulé.
  - Harnais : aucun blocage — `npm test` au vert (11 tests frontend, dont 1 nouveau sur le champ `alerte`), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 5` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : champ `alerte?: boolean` sur `ReponseSuggestion`, activé uniquement sur `REPONSE_PAR_DEFAUT` — sert les 2 critères.
    - `frontend/src/app/ressources.test.ts` : 1 nouveau test Vitest vérifiant que seule la réponse par défaut porte `alerte: true` — point 2 de la DoD.
    - `frontend/src/app/page.tsx` : encadré d'alerte affiché quand `reponse.alerte` est vrai — sert les 2 critères.
    - `frontend/src/app/page.module.css` : style de l'encadré d'alerte.
    - `e2e/demo.spec.ts` : assertion ajoutée sur la présence de l'encadré d'alerte — démonstration du cas passant, hors DoD.

## Itération 6 : La patiente précise sa région, et la réponse sur les filières de soins la mentionne

- **Plan validé le 2026-11-18 (réduit par l'agent, ✂️ voir ci-dessous).** Temps restant annoncé au début de `/iteration 6` : moins de 10 minutes.
- ✂️ Avec moins de 10 minutes et un cycle publication+déploiement+signal qui a pris 4-5 minutes à chaque itération précédente, je réduis fortement le périmètre par rapport à un vrai sélecteur de filière par région : pas de liste de filières réelles par région (non présente dans la passation), juste un sélecteur de région qui personnalise la réponse « Réseau de médecins » en la mentionnant. Si le temps manque pour terminer et publier, je m'arrête et je reporte le reste.
- **Dans le périmètre** : un `<select>` de 3-4 régions au-dessus des suggestions ; si une région est choisie, la réponse à « Réseau de médecins » mentionne la région sélectionnée dans son texte.
- **Hors périmètre** : vraies filières de soins par région (liste à obtenir auprès des cadreurs), personnalisation des 3 autres suggestions, persistance du choix.
- **Critères d'acceptation** :
  - Étant donné une région sélectionnée, quand on clique sur « Réseau de médecins », alors la réponse mentionne la région choisie.
  - Étant donné aucune région sélectionnée, quand on clique sur « Réseau de médecins », alors la réponse reste celle par défaut, sans mention de région.
- **Hypothèse de l'équipe couverte** : aucune — couverte à l'itération 5.
- **Codage estimé** : 3-4 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts` (fonction `personnaliserRegion`), `frontend/src/app/ressources.test.ts`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : 1 à 2, sur `personnaliserRegion`.
- **Étapes ajoutées à la démo** : extension du test existant pour sélectionner une région avant de cliquer sur « Réseau de médecins ».
- **Bilan** :
  - Durée de codage réelle : 45 secondes (budget réduit à 3-4 min, aucun dépassement).
  - Critères d'acceptation : les 2 satisfaits — la réponse « Réseau de médecins » mentionne la région choisie quand une région est sélectionnée, et reste inchangée sinon (couvert par 2 tests Vitest sur `personnaliserRegion`).
  - Reporté : les vraies filières de soins par région restent hors périmètre, à obtenir auprès des cadreurs si le hackathon continue au-delà de cette itération.
  - Harnais : aucun blocage — `npm test` au vert (13 tests frontend, 2 tests racine), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 6` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : ajout de `REGIONS` et de la fonction pure `personnaliserRegion`, qui ajoute la mention de la région à l'intro d'une réponse.
    - `frontend/src/app/ressources.test.ts` : 2 tests sur `personnaliserRegion` (région choisie, aucune région).
    - `frontend/src/app/page.tsx` : ajout d'un `<select>` « Votre région » au-dessus des suggestions ; la réponse à « Réseau de médecins » passe par `personnaliserRegion`.
    - `frontend/src/app/page.module.css` : styles `.regionSelect`.
    - `e2e/demo.spec.ts` : étape de démo sélectionnant une région avant de cliquer sur « Réseau de médecins », et vérifiant la mention dans la réponse.

## Itération 7 : La réponse sur le guide montre d'abord un résumé puis l'extrait du thème concerné, pas la description générique du guide entier

- **Plan validé le 2026-11-18.** Temps restant annoncé au début de `/iteration 7` : 5 à 10 minutes.
- Demande du développeur en cours de hackathon, taillée ici en itération : « des réponses plus pertinentes » quand on pose une question — amorcée sur le guide, qui est le cas le plus flagrant (une seule description générique pour tout le guide de 80 pages, quel que soit le mot-clé).
- ❓ **Levé** : la passation ne contient pas le vrai texte du guide, seulement son titre et sa description générale. Choix validé par le développeur : fabriquer 2-3 courts extraits fictifs par thème, en données en dur, comme le reste du contenu — à remplacer par le vrai texte du guide si l'association le fournit.
- **Dans le périmètre** : pour les mots-clés liés au guide reconnus en saisie libre (« diagnostic », « traitement »), la réponse affiche un résumé court puis un extrait du thème concerné, au lieu de la description générique des 80 pages. La suggestion « Le guide diagnostic » (clic direct, sans mot-clé) continue de montrer la vue d'ensemble du guide.
- **Hors périmètre** : vrai contenu du guide, extraits thématiques pour les autres ressources (droits, médecins, groupes) — à reprendre dans une itération suivante si le temps le permet.
- **Critères d'acceptation** :
  - Étant donné le mot « diagnostic » tapé en libre, quand la réponse s'affiche, alors elle montre un résumé suivi d'un extrait sur « les premiers jours après le diagnostic », pas la description générique du guide.
  - Étant donné le mot « traitement » tapé en libre, quand la réponse s'affiche, alors elle montre l'extrait sur « comprendre les traitements ».
  - Étant donné un clic sur la suggestion « Le guide diagnostic », quand la réponse s'affiche, alors elle reste la vue d'ensemble du guide (comportement inchangé).
- **Hypothèse de l'équipe couverte** : aucune directement — contribue à la pertinence perçue des réponses, en lien avec l'enjeu « 55 % des patientes ne se sentent pas assez informées après le diagnostic ».
- **Codage estimé** : 3-4 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts`, `frontend/src/app/ressources.test.ts`.
- **Tests unitaires prévus** : 2 à 3, sur la fonction de résolution du thème du guide.
- **Étapes ajoutées à la démo** : une étape tapant « diagnostic » en saisie libre et vérifiant l'extrait thématique.
- **Bilan** :
  - Durée de codage réelle : 63 secondes (budget 3-4 min, aucun dépassement).
  - Critères d'acceptation : les 3 satisfaits — « diagnostic » et « traitement » montrent chacun leur extrait thématique (résumé + citation), la suggestion « Le guide diagnostic » garde la vue d'ensemble inchangée. Couvert par 3 nouveaux tests Vitest.
  - Reporté : vrai texte du guide (extraits actuels fictifs, à remplacer si l'association le fournit) et extraits thématiques pour les autres ressources — aucune itération suivante prévue faute de temps.
  - Harnais : aucun blocage — `npm test` au vert (16 tests frontend, 2 tests racine), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 7` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : `resoudreGuide` remplace la réponse guide statique ; résumé + extrait selon le thème (`diagnostic`, `traitement`), vue d'ensemble par défaut sinon ; `resoudreTexteLibre` transmet le thème détecté.
    - `frontend/src/app/ressources.test.ts` : 3 tests sur les extraits thématiques et la vue d'ensemble par défaut.
    - `e2e/demo.spec.ts` : étape tapant « diagnostic » et vérifiant l'extrait affiché.

## Itération 8 : La saisie libre reconnaît des formulations réalistes, pas seulement un mot-clé exact par ressource

- **Plan validé le 2026-11-18** (confirmé en conversation, pas d'objection sur la portée proposée). Temps restant annoncé au début de `/iteration 8` : le développeur a dit « prends ton temps » — pas de pression immédiate, mais je garde le plafond de 10 minutes de codage et je redemande si je l'approche.
- Demande du développeur, précisée en échange : « d'habitude, une question posée obtient une réponse vague ou aucune réponse (alerte envoyée) » — la liste de mots-clés est trop étroite, la plupart des formulations réalistes ne matchent rien.
- **Dans le périmètre** : élargir `MOTS_CLES` pour les 4 catégories (droits, médecins, guide, groupes) avec des synonymes et formulations courantes, toujours en correspondance simple (sous-chaîne), fonction pure testée.
- **Hors périmètre** : recherche floue/NLP, seuil de confiance, vrai contenu du guide (toujours fictif).
- **Critères d'acceptation** :
  - Étant donné une formulation courante par catégorie (ex. « arrêt de travail », « gynécologue », « opération », « témoignage »), quand elle est tapée en libre, alors la ressource de la bonne catégorie s'affiche (pas la réponse par défaut).
  - Étant donné une question hors sujet, quand elle est tapée, alors la réponse par défaut + alerte s'affichent toujours (comportement inchangé).
- **Hypothèse de l'équipe couverte** : contribue indirectement à réduire le taux de réponses par défaut/alerte sur des questions qui ont une vraie ressource.
- **Codage estimé** : pas de minutage serré demandé par le développeur ; je vise quand même sous les 10 minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts`, `frontend/src/app/ressources.test.ts`.
- **Tests unitaires prévus** : 3, un par nouvelle formulation représentative d'une catégorie.
- **Étapes ajoutées à la démo** : aucune nouvelle (la démo teste déjà plusieurs formulations ; les nouvelles entrent dans la même logique).
- **Bilan** :
  - Durée de codage réelle : 41 secondes.
  - Critères d'acceptation : les 2 satisfaits — « arrêt de travail », « gynécologue », « témoignage » routent désormais vers leur bonne catégorie (3 nouveaux tests), et une question hors sujet déclenche toujours la réponse par défaut + alerte (comportement inchangé, test existant).
  - Reporté : recherche floue/NLP et vrai contenu du guide restent hors périmètre, pas d'itération suivante prévue sauf retour du développeur.
  - Harnais : aucun blocage — `npm test` au vert (17 tests frontend, 2 tests racine), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 8` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : `MOTS_CLES` élargi avec des synonymes et formulations courantes pour les 4 catégories (droits, médecins, guide/diagnostic, guide/traitement, groupes).
    - `frontend/src/app/ressources.test.ts` : 1 test regroupant 3 formulations réalistes vérifiant le bon routage.

## Itération 9 : la saisie libre ignore les accents manquants

- **Plan validé le 2026-11-18**, à partir d'un cas concret rapporté par le développeur : « quels sont les symptomes » (sans accent) tombait sur la réponse par défaut, alors que « symptôme » existe dans `MOTS_CLES` avec un accent. Correction générale (normalisation), pas un cas particulier ajouté.
- **Dans le périmètre** : comparer le texte tapé et les mots-clés après suppression des accents, des deux côtés.
- **Hors périmètre** : fautes de frappe/orthographe au-delà des accents, pluriels irréguliers.
- **Critères d'acceptation** :
  - Étant donné « quels sont les symptomes » (sans accent), quand on l'envoie, alors la réponse montre l'extrait thématique diagnostic (pas la réponse par défaut).
  - Étant donné « je cherche un medecin » (sans accent), quand on l'envoie, alors la ressource médecins s'affiche.
- **Codage estimé** : quelques minutes.
- **Fichiers prévus** : `frontend/src/app/ressources.ts`, `frontend/src/app/ressources.test.ts`.
- **Tests unitaires prévus** : 2, un par critère d'acceptation.
- **Bilan** :
  - Durée de codage réelle : 45 secondes.
  - Critères d'acceptation : les 2 satisfaits — « quels sont les symptomes » (sans accent) et « je cherche un medecin » (sans accent) routent correctement, couverts par 1 test.
  - Reporté : les fautes de frappe au-delà des accents restent hors périmètre de cette itération (demande suivante du développeur, voir itération 10).
  - Harnais : aucun blocage — `npm test` au vert (18 tests frontend, 2 tests racine), `./scripts/verifier-deployabilite.sh` sans borne, `signaler-version.sh 9` accepté.
  - **Modifications** :
    - `frontend/src/app/ressources.ts` : fonction `normaliser` (suppression des accents via NFD) appliquée au texte tapé et aux mots-clés avant comparaison.
    - `frontend/src/app/ressources.test.ts` : 1 test sur deux formulations sans accent.

## À venir

_Rien d'autre après cette itération, sauf retour du développeur._
