# Projet Annuel SOPRA

## Présentation

Ce projet est une application web composée de :

- un **frontend React** ;
- un **backend Spring Boot** ;
- une **base de données MySQL**.

Le backend communique avec une base de données nommée `projet_annuel_m1`, puis expose des routes API utilisées par le frontend. [file:569]

---

## Prérequis

Avant de démarrer le projet, il faut avoir installé :

- **Node.js** et **npm** pour le frontend ; [web:923]
- **Java 21** pour le backend Spring Boot ; [file:776]
- **Maven** (ou utiliser le wrapper `mvnw`) pour lancer le backend ; [image:938]
- **MySQL Server**, **XAMPP** ou **WAMP** avec MySQL actif. [file:569]

---

## Structure du projet

Le projet contient deux parties principales :

- le **frontend React** ;
- le **backend** dans le dossier `Backend`. 

La classe principale du backend est :

```java
DemoApplication
```

Elle permet de lancer l’application Spring Boot. 

---

## Lancement de la base de données

### 1. Démarrer MySQL

Commencer par démarrer le serveur MySQL en local depuis :

- XAMPP ;
- WAMP ;
- ou un service MySQL installé sur la machine. 

### 2. Créer la base de données

Créer une base de données nommée :

```sql
projet_annuel_m1
```

### 3. Importer le script SQL

Importer le fichier SQL du projet dans cette base afin de créer les tables et insérer les données initiales. 

Exemple de commande possible en terminal :

```bash
mysql -u root -p projet_annuel_m1 < bd.sql
```

ou, si le mot de passe MySQL est vide :

```bash
mysql -u root projet_annuel_m1 < bd.sql
```

L’import SQL permet d’initialiser la structure de la base ainsi que les premières données nécessaires au projet. 

---

## Configuration du backend

Le fichier `application.properties` doit être configuré pour utiliser MySQL en local.

Exemple :

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/projet_annuel_m1?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl

server.port=8090
```

Si votre serveur MySQL possède un mot de passe, il faut le renseigner dans :

```properties
spring.datasource.password=VOTRE_MOT_DE_PASSE
```

Le backend écoute ensuite sur le port `8090`. 

---

## Lancement du backend

Se placer dans le dossier `Backend` :

```bash
cd Backend
```

### Avec Maven

```bash
mvn spring-boot:run
```

### Avec le wrapper Maven

```bash
./mvnw spring-boot:run
```

### Depuis l’IDE

Il est aussi possible d’ouvrir le dossier `Backend` dans IntelliJ IDEA ou VS Code et d’exécuter directement la classe :

```java
DemoApplication
```

## Lancement du frontend

Se placer dans le dossier du frontend :

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Puis lancer le serveur de développement :

```bash
npm run dev
```

Avec Vite, le frontend est généralement accessible sur :

```text
http://localhost:5173
```

Le serveur de développement Vite est utilisé pour lancer l’application React en local.

---

## Ordre de démarrage recommandé

Pour lancer correctement le projet en local :

1. Démarrer MySQL.
2. Créer la base `projet_annuel_m1`.
3. Importer le script SQL.
4. Lancer le backend Spring Boot avec `DemoApplication`.
5. Lancer le frontend React avec `npm run dev`. 

---

## Vérification rapide

Une fois tout lancé :
- **frontend** : [http://localhost:5173](http://localhost:5173)

Si l’API répond dans le navigateur et que le frontend s’ouvre correctement, alors le projet est prêt à être utilisé en local.
