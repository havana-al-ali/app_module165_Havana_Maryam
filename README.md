# Module 165 – Application MongoDB

Application développée dans le cadre de l’évaluation finale du module 165.  
Elle permet d’exploiter une base de données NoSQL (MongoDB) à travers trois affichages différents : filtrage, tri et agrégation.

---

## 1. Architecture générale de l’application

### Technologies utilisées

- **Frontend :**
  - HTML5
  - CSS3 (design personnalisé, sans framework)
  - JavaScript (fetch API)

- **Backend :**
  - PHP 8
  - Driver MongoDB PHP (`mongodb/mongodb` via Composer)

- **Base de données :**
  - MongoDB Standalone (avec authentification)
  - Utilisateur administrateur : myUserAdmin (authSource=admin)
  - Port utilisé : 27020
  - Base de données : my_data_Havana_Maryam
  - Collections : open_data, my_team, test

### Structure du projet

```
app_module165_Havana_Maryam/
│
├── backend/
│   ├── connect.php
│   ├── filter.php
│   ├── sort.php
│   └── aggregate.php
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── filter.js
│   ├── sort.js
│   └── aggregate.js
│
├── vendor/        (généré par Composer)
├── composer.json
├── composer.lock
└── README.md
```

---

## 2. Fonctionnalités

L’application propose **3 affichages différents**, chacun correspondant à une commande MongoDB différente.

### 1. Filtrage (find)

Affiche **uniquement les étudiantes female** dont le niveau d’éducation parental est **"high school"**.

- Commande MongoDB utilisée :
  ```js
  find({ gender: "female", "parental level of education": "high school" });
  ```

```
Affichage sous forme de tableau contenant les colonnes suivantes :

- Genre
- Race / Ethnicité
- Niveau d’éducation parental
- Lunch
- Test preparation course
- Math score
- Reading score
- Writing score

```

---

### 2. Tri (sort + limit)

Affiche le meilleur élève selon un critère choisi :

Top score Math

Top score Écriture

Commandes MongoDB :

```js
find().sort({ "math score": -1 }).limit(1);
find().sort({ "writing score": -1 }).limit(1);
```

Affichage sous forme de carte contenant les informations suivantes :

- Genre
- Race / Ethnicité
- Niveau d’éducation parental
- Lunch
- Test preparation course
- Scores détaillés (Math, Lecture, Écriture)
- Moyenne calculée (math + reading + writing)

### 3. Agrégation (aggregate)

a) Moyenne par genre
Pipeline :

```js
[
  { $group: {
      _id: "$gender",
      count: { $sum: 1 },
      avg_math: { $avg: "$math score" },
      avg_reading: { $avg: "$reading score" },
      avg_writing: { $avg: "$writing score" }
  }}
]
- Affichage : tableau statistique.

 b) Meilleur élève (moyenne totale)
 Pipeline :

 [
  { $addFields: {
      average: { $avg: ["$math score", "$reading score", "$writing score"] }
  }},
  { $sort: { average: -1 }},
  { $limit: 1 }
]
```

- Affichage sous forme de carte.

## 3. Instructions d’installation & exécution

Installation locale (Windows 11 – Intel i7)
Cette application a été développée et testée sur Windows 11, processeur Intel Core i7.

### Prérequis

- 1.Installer PHP 8
  https://windows.php.net/download/

-> Vérifier : php -v

- 2.Installer Composer
  https://getcomposer.org/download/

-> Vérifier : composer -V

### Installer MongoDB Community Server

https://www.mongodb.com/try/download/community

- Configuration utilisée :

- Mode : Standalone

- Port : 27020

- Authentification activée

- Utilisateur : myUserAdmin

- AuthSource : admin

### Préparer la base de données

MongoDB démarre automatiquement sur Windows.
Sinon : Services → MongoDB Server → Démarrer

Importer les données (si nécessaire) :

mongoimport --db my_data_Havana_Maryam --collection open_data --file open_data.json --jsonArray

### Installer les dépendances PHP

- dans le doccier du projet :
  composer install

### Lancer un serveur PHP local

- La racine du projet correspond au dossier contenant backend/, frontend/, vendor/, composer.json et README.md :
  php -S localhost:8000

### Accéder à l’application

http://localhost:8000/frontend/index.html

## Auteur

Havana Al Ali | Maryam Aman
Module 165 – Évaluation finale
Date : Mai 2026
