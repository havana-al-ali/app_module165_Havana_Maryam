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
  - MongoDB Standalone (sans authentification)

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

## 2. Fonctionnalités en bref

L’application propose **3 affichages différents**, chacun correspondant à une commande MongoDB différente.

### 1. Filtrage (find)

Affiche **uniquement les étudiantes female** dont le niveau d’éducation parental est **"high school"**.

- Commande MongoDB utilisée :
  ```js
  find({ gender: "female", "parental level of education": "high school" });
  ```

```
- Résultat affiché sous forme de tableau complet :

   Genre

   Race / Ethnicité

   Niveau d’éducation

   Lunch

   Préparation

   Math

   Lecture

   Écriture
```

### 2. Tri (sort + limit)

Affiche le meilleur élève selon un critère choisi :

Top score Math

Top score Écriture

Commande MongoDB utilisée :

```js
find().sort({ "math score": -1 }).limit(1);

ou;
find().sort({ "writing score": -1 }).limit(1);
```

- Résultat affiché sous forme de carte détaillée :

  Genre

  Race

  Éducation

  Lunch

  Préparation

  Scores

  Moyenne calculée

### 3. Agrégation (aggregate)

Deux affichages statistiques :

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
-> Affichage sous forme de tableau.

 b) Meilleur élève (moyenne totale)
 Pipeline :

 [
  { $addFields: {
      average: { $avg: ["$math score", "$reading score", "$writing score"] }
  }},
  { $sort: { average: -1 }},
  { $limit: 1 }
]
-> Affichage sous forme de carte.
```

## 3. Instructions d’installation & exécution

Exécution avec Docker

### Prérequis

Docker Desktop installé

### Lancer MongoDB

docker run -d -p 27017:27017 --name mongodb mongo

### Installer les dépendances PHP

composer install

### Lancer un serveur PHP local

php -S localhost:8000

### Accéder à l’application

http://localhost:8000/frontend/index.html

## Auteur

Havana Al Ali | Maryam Aman
Module 165 – Évaluation finale
Année : 2026
