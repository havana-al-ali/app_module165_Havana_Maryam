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

- **Conteneurisation :**
- Docker & Docker Compose

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
├── data/
│   └── 1_open_data_Havana_Maryam.json
│
├── vendor/
|__ docker
|  |__ docker-compose.yml
|  |__ Dockerfile
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

### 2. Tri (sort + limit)

Affiche le meilleur élève selon un critère choisi :

Top score Math

Top score Écriture

Commandes :

```js
find().sort({ "math score": -1 }).limit(1);
find().sort({ "writing score": -1 }).limit(1);
```

### 3. Agrégation (aggregate)

a) Moyenne par genre

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

### Lancer l’application via Docker

Cette application fonctionne entièrement via Docker.

1. Ouvrir un terminal dans le dossier docker/

- cd docker

2. Lancer l’application :

- docker compose up --build

Docker démarre automatiquement :

- PHP accessible sur : http://localhost:8000

- MongoDB sur localhost:27020

3. Import des données MongoDB

- Les données sont fournies dans :
  data/1_open_data_Havana_Maryam.json

4. Si nécessaire, importer manuellement :

```js
docker exec -it mongo_app165 bash
mongoimport --username myUserAdmin --password myPassword123 --authenticationDatabase admin \
 --db my_data_Havana_Maryam \
 --collection open_data \
 --file /data/1_open_data_Havana_Maryam.json \
 --jsonArray

```

5. URLs de test du backend

Filtrage :

http://localhost:8000/backend/filter.php?type=female_highschool

Tri :

http://localhost:8000/backend/sort.php?type=top_math
http://localhost:8000/backend/sort.php?type=top_writing

Agrégation :

http://localhost:8000/backend/aggregate.php?type=avg_by_gender
http://localhost:8000/backend/aggregate.php?type=top_student

6. Accéder à l’application :

- http://localhost:8000/frontend/index.html

## Dépôt GitHub

- Le code complet est également disponible sur GitHub :

  https://github.com/havana-al-ali/app_module165_Havana_Maryam

## Auteur

Havana Al Ali | Maryam Aman
Module 165 – Évaluation finale
Date : Mai 2026
