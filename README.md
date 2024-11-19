
# **Arcadia Zoo**

## **Description**
Arcadia Zoo est une application web conçue pour la gestion et la consultation des informations du Zoo Arcadia. Elle propose des fonctionnalités adaptées aux visiteurs, employés, vétérinaires et administrateurs, tout en offrant une navigation intuitive et des données centralisées.

---

## **Fonctionnalités principales**
- **Visiteurs** :
  - Visualiser les habitats et les animaux.
  - Découvrir les services et horaires du zoo.
  - Publier et consulter des avis validés par les employés.

- **Employés** :
  - Gérer les avis des visiteurs.
  - Consulter les rapports vétérinaires.
  - Enregistrer les actions liées aux animaux (alimentation, etc.).

- **Vétérinaires** :
  - Ajouter et consulter les rapports de santé des animaux.
  - Valider l’état des habitats.

- **Administrateurs** :
  - Gérer les utilisateurs, habitats, services et statistiques.
  - Superviser les rapports vétérinaires et les avis visiteurs.

---

## **Technologies utilisées**
- **Frontend** : React, Tailwind CSS.
- **Backend** : Laravel avec Inertia.js.
- **Bases de données** :
  - **MySQL** : Données principales (utilisateurs, habitats, services).
  - **MongoDB** : Statistiques de consultation.
- **Déploiement** :
  - Hébergement : Hostinger (https://arcadia.ajd-world.com).
  - Base de données MongoDB via MongoDB Atlas.

---

## **Prérequis**
- **PHP** : Version 8.1 ou supérieure.
- **Composer** : Pour gérer les dépendances PHP.
- **Node.js** : Pour gérer les dépendances front-end (npm).
- **MySQL** : Serveur local ou distant.
- **MongoDB** : Cluster sur MongoDB Atlas.

---

## **Installation et configuration**

### **Étape 1 : Cloner le dépôt**
Clonez le dépôt GitHub :
```bash
git clone https://github.com/joakmannn/arcardiaZoo.git
cd arcardiaZoo
```

### **Étape 2 : Installer les dépendances**
- **Backend** :

  composer install

- **Frontend** :

  npm install


### **Étape 3 : Configurer l’environnement**
Créez un fichier `.env` à partir du modèle fourni :

cp .env.example .env

**Modifiez les paramètres du fichier `.env` pour refléter la configurations MySQL et MongoDB** :

APP_NAME=Arcadia
APP_ENV=production
APP_DEBUG=true
APP_URL=https://arcadia.ajd-world.com/

DB_CONNECTION=mysql
DB_HOST=193.203.168.141
DB_PORT=3306
DB_DATABASE=u724324663_arcadia_zoo
DB_USERNAME=u724324663_adminjose
DB_PASSWORD=Arcadiazoo13

DB_CONNECTION_MONGODB=mongodb
MONGODB_URI=mongodb+srv://josearcadia:arcadiazoo@cluster0.0croj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


### **Étape 4 : Configurer la base de données**
- **Créer les tables MySQL** :

  php artisan migrate

- **Ajouter des données initiales** :

  php artisan db:seed
  

### **Étape 5 : Lancer l’application en local**
- **Backend** :

  php artisan serve

- **Frontend** (mode développement) :

  npm run dev

L’application sera accessible à l’adresse : [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## **Déploiement**

Pour déployer l’application sur un serveur en production :

1. **Préparer les assets pour la production** :

   npm run build

2. **Téléverser les fichiers** sur le serveur Hostinger :
   - Assurez-vous que tous les fichiers sont dans le dossier approprié (`public_html`).
3. **Configurer les bases de données** :
   - **MySQL** : Importez le fichier SQL si nécessaire.
   - **MongoDB** : Configurez les accès et autorisations dans MongoDB Atlas.
4. **Mettre à jour les caches Laravel** :

   php artisan config:cache
   php artisan route:cache

---

## **Informations de connexion**
- **URL de production** : [https://arcadia.ajd-world.com](https://arcadia.ajd-world.com)
- **Base de données MySQL** :
  - Hôte : `193.203.168.141`
  - Base de données : `u724324663_arcadia_zoo`
  - Utilisateur : `u724324663_adminjose`
  - Mot de passe : `Arcadiazoo13`
- **Base de données MongoDB** :
  - URI : `mongodb+srv://josearcadia:arcadiazoo@cluster0.0croj.mongodb.net`

---

## **Contribution**
Pour contribuer :
1. Forkez le dépôt.
2. Créez une branche pour vos modifications :

   git checkout -b nouvelle-fonctionnalite
3. Soumettez une pull request pour révision.

---

## **Auteurs**
- **Joakmann** – Développeur principal de l’application.

---

## **Licence**
Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
