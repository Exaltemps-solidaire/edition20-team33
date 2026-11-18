# Déploiement

Chatbot d'orientation pour l'association **ENDOmind** (endométriose) : il oriente une patiente
venant d'être diagnostiquée vers la ressource ENDOmind correspondant à sa question.

## Services

- `frontend/` : Next.js en export statique, servi par nginx (port 80 du conteneur). **Service exposé au public.**
- `api/` : Node sans dépendance (port 8081). Pas encore appelée par le front à ce stade (itération 1) : le front
  sert une interface avec des ressources en dur.

Chacun des deux services répond `GET /health` et `GET /sante` en `200`.

## Services externes

Aucun à ce stade. Les ressources (fiches ALD, livret RQTH, etc.) sont des données en dur dans le front,
pas d'appel à l'API ni à un service tiers.

## Connu comme fragile ou inachevé

- Les 4 suggestions renvoient désormais chacune une vraie ressource (ALD/RQTH, filières de soins,
  guide diagnostic, groupes de parole) ; seule une question tapée en libre renverrait encore le
  message par défaut, mais la saisie libre n'est pas encore fonctionnelle (voir ci-dessous).
- La zone de saisie libre est affichée mais désactivée (non fonctionnelle).
- Pas d'écran « Qui êtes-vous ? » (personas) ni d'alerte automatique à la direction : prévus aux
  itérations suivantes (voir `ITERATIONS.md`).

## Contact

Équipe 33 (hackathon eXaltemps Solidaire), côté association : ENDOmind.
