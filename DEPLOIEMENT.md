# Déploiement

Chatbot d'orientation pour l'association **ENDOmind** (endométriose) : il oriente une patiente
venant d'être diagnostiquée vers la ressource ENDOmind correspondant à sa question.

## Services

- `frontend/` : Next.js en export statique, servi par nginx (port 80 du conteneur). **Service exposé au public.**
- `api/` : Node sans dépendance (port 8081). Pas encore appelée par le front : toute la logique
  (choix de profil, résolution des suggestions et du texte libre, alerte, région) est pure et
  côté front, avec des ressources en dur.

Chacun des deux services répond `GET /health` et `GET /sante` en `200`.

## Services externes

Aucun à ce stade. Les ressources (fiches ALD, livret RQTH, etc.) sont des données en dur dans le front,
pas d'appel à l'API ni à un service tiers.

## Connu comme fragile ou inachevé

- Un écran « Qui êtes-vous ? » précède le chatbot (3 profils), sans effet sur les réponses à ce stade.
- Les 4 suggestions et la saisie libre (reconnaissance par mots-clés) renvoient chacune une vraie
  ressource ENDOmind ; une question non reconnue affiche un message de contact humain et un encadré
  d'alerte visuelle (l'envoi réel de l'alerte à l'équipe n'est pas implémenté).
- Un sélecteur de région personnalise la réponse « Réseau de médecins » en la mentionnant, sans
  liste réelle de filières par région (à obtenir auprès des cadreurs si le hackathon continue).

## Contact

Équipe 33 (hackathon eXaltemps Solidaire), côté association : ENDOmind.
