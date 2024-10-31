Résumé du Projet de Calendrier
1. Configuration de l'environnement
Installer Node.js : Assurez-vous que Node.js est installé sur votre machine.
Installer MongoDB : Installez MongoDB et assurez-vous qu'il fonctionne (localement ou sur un serveur).
2. Initialisation du projet
Créer un nouveau dossier pour votre projet.
Initialiser un projet Node.js avec la commande :
bash

Verify

Open In Editor
Edit
Copy code
npm init -y
Installer les dépendances nécessaires :
bash

Verify

Open In Editor
Edit
Copy code
npm install express mongoose body-parser cors
3. Configuration du serveur Express
Créer un fichier server.js :
Importez les modules nécessaires (Express, Mongoose, etc.).
Configurez le serveur Express.
Utilisez body-parser pour gérer les requêtes JSON.
Configurez CORS si nécessaire.
4. Connexion à MongoDB
Utiliser Mongoose pour se connecter à votre base de données MongoDB :
javascript

Verify

Open In Editor
Edit
Copy code
mongoose.connect('mongodb://localhost:27017/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
5. Définir le modèle de données
Créer un modèle Mongoose pour les événements :
javascript

Verify

Open In Editor
Edit
Copy code
const eventSchema = new mongoose.Schema({
  day: String,
  title: String,
});

const Event = mongoose.model('Event', eventSchema);
6. Créer les routes API
Définir les routes pour gérer les événements :
GET pour récupérer tous les événements.
POST pour ajouter un nouvel événement.
PUT et DELETE si vous souhaitez permettre la mise à jour et la suppression d'événements.
7. Tester l'API
Utiliser Postman ou cURL pour tester vos routes API :
Envoyer des requêtes POST pour ajouter des événements.
Envoyer des requêtes GET pour récupérer les événements.
8. Visualiser les données avec MongoDB Compass
Ouvrir MongoDB Compass pour vérifier que les données sont correctement insérées dans la base de données.
Naviguer dans la base de données et la collection pour voir les documents.
9. Gestion des erreurs
Ajouter des gestionnaires d'erreurs dans votre code pour capturer et afficher les erreurs potentielles lors des opérations de base de données.
10. Améliorations et fonctionnalités supplémentaires
Ajouter des fonctionnalités comme la mise à jour et la suppression d'événements.
Implémenter une interface utilisateur si vous souhaitez créer une application front-end.
Déployer l'application sur un service cloud comme Heroku ou Vercel si nécessaire.
Conclusion
En suivant ces étapes, vous pouvez créer un projet de calendrier fonctionnel avec une API backend utilisant MongoDB et Express.



## Récapitulatif de ce que nous avons fait :
Configuré un serveur Node.js avec Express.

Connecté le serveur à MongoDB.

Créé des routes pour ajouter, afficher, modifier et supprimer des événements.

Intégré Vue.js pour interagir avec l'API et afficher les événements dans un calendrier.

Vérifié la communication entre le front-end Vue.js, le serveur Node.js, et la base de données MongoDB.

## MongoDB :

Utilisé pour stocker de manière sécurisée les informations utilisateur (par exemple, email et mot de passe haché).
Lorsqu'un utilisateur s'inscrit, Express vérifie que l'email n'existe pas déjà dans MongoDB, puis enregistre le nouvel utilisateur.
Lorsqu'un utilisateur se connecte, Express vérifie que les informations sont correctes en comparant avec les données dans MongoDB.
## LocalStorage (Vue côté client) :

Utilisé pour stocker le token d'authentification reçu après une connexion réussie.
Ce token est ensuite inclus dans les en-têtes des futures requêtes vers le backend pour authentifier l’utilisateur sans nécessiter de reconnexion.