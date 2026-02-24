-- -------------------------------------------------------------
-- 1. Table des Utilisateurs
-- -------------------------------------------------------------
CREATE TABLE Utilisateur (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    statut VARCHAR(50) NOT NULL
);

-- -------------------------------------------------------------
-- 2. Table des Rôles
-- -------------------------------------------------------------
CREATE TABLE Role (
    id_role INT PRIMARY KEY AUTO_INCREMENT,
    libelle VARCHAR(100) NOT NULL UNIQUE -- Un libelle de rôle doit être unique
);

-- -------------------------------------------------------------
-- 3. Table de liaison Utilisateur-Role (Many-to-Many)
-- -------------------------------------------------------------
CREATE TABLE UtilisateurRole (
    id_user INT NOT NULL,
    id_role INT NOT NULL,
    PRIMARY KEY (id_user, id_role),
    FOREIGN KEY (id_user) REFERENCES Utilisateur(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_role) REFERENCES Role(id_role) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- 4. Table des Événements
-- -------------------------------------------------------------
CREATE TABLE Evenement (
    id_evt INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(200) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    lieu VARCHAR(200),
    categorie VARCHAR(100),
    description TEXT,
    budget_alloue DECIMAL(15, 2) DEFAULT 0.00, -- Précision du Script 1
    statut VARCHAR(50) NOT NULL,
    id_responsable INT, -- Renommé pour plus de clarté
    FOREIGN KEY (id_responsable) REFERENCES Utilisateur(id_user)
);
CREATE INDEX idx_evenement_id_responsable ON Evenement(id_responsable);

-- -------------------------------------------------------------
-- 5. Table des Catégories de Budget
-- -------------------------------------------------------------
CREATE TABLE CategorieBudget (
    id_cat INT PRIMARY KEY AUTO_INCREMENT,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

-- -------------------------------------------------------------
-- 6. Table des Partenaires
-- -------------------------------------------------------------
CREATE TABLE Partenaire (
    id_partenaire INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    type_activite VARCHAR(100),
    contact VARCHAR(100),
    adresse VARCHAR(200)
);

-- -------------------------------------------------------------
-- 7. Table des Transactions
-- -------------------------------------------------------------
CREATE TABLE Transaction (
    id_transac INT PRIMARY KEY AUTO_INCREMENT,
    date_mouvement DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    montant DECIMAL(15, 2) NOT NULL DEFAULT 0.00, -- Précision du Script 1
    description TEXT,
    valide BOOLEAN DEFAULT FALSE,
    id_evt INT,
    id_cat INT NOT NULL,
    id_partenaire INT,
    FOREIGN KEY (id_evt) REFERENCES Evenement(id_evt),
    FOREIGN KEY (id_cat) REFERENCES CategorieBudget(id_cat),
    FOREIGN KEY (id_partenaire) REFERENCES Partenaire(id_partenaire)
);
CREATE INDEX idx_transaction_id_evt ON Transaction(id_evt);
CREATE INDEX idx_transaction_id_cat ON Transaction(id_cat);
CREATE INDEX idx_transaction_id_partenaire ON Transaction(id_partenaire);

-- -------------------------------------------------------------
-- 8. Table des Comptes Rendus
-- -------------------------------------------------------------
CREATE TABLE CompteRendu (
    id_cr INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(200) NOT NULL,
    date_reunion DATE NOT NULL,
    notes TEXT,
    id_evt INT,
    FOREIGN KEY (id_evt) REFERENCES Evenement(id_evt)
);
CREATE INDEX idx_compteRendu_id_evt ON CompteRendu(id_evt);

-- -------------------------------------------------------------
-- 9. Table de liaison CompteRendu-Partenaire (Many-to-Many)
-- -------------------------------------------------------------
CREATE TABLE CompteRendu_Partenaire (
    id_cr INT NOT NULL,
    id_partenaire INT NOT NULL,
    PRIMARY KEY (id_cr, id_partenaire),
    FOREIGN KEY (id_cr) REFERENCES CompteRendu(id_cr) ON DELETE CASCADE,
    FOREIGN KEY (id_partenaire) REFERENCES Partenaire(id_partenaire) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- 10. Table de liaison Evenement-Partenaire (Many-to-Many)
-- -------------------------------------------------------------
CREATE TABLE Evenement_Partenaire (
    id_evt INT NOT NULL,
    id_partenaire INT NOT NULL,
    PRIMARY KEY (id_evt, id_partenaire),
    FOREIGN KEY (id_evt) REFERENCES Evenement(id_evt) ON DELETE CASCADE,
    FOREIGN KEY (id_partenaire) REFERENCES Partenaire(id_partenaire) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- 11. Table des Documents
-- -------------------------------------------------------------
CREATE TABLE Document (
    id_doc INT PRIMARY KEY AUTO_INCREMENT,
    nom_fichier VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    type_document VARCHAR(50) NOT NULL,
    id_evt INT,
    id_transac INT,
    id_cr INT,
    FOREIGN KEY (id_evt) REFERENCES Evenement(id_evt),
    FOREIGN KEY (id_transac) REFERENCES Transaction(id_transac),
    FOREIGN KEY (id_cr) REFERENCES CompteRendu(id_cr)
);
CREATE INDEX idx_document_id_evt ON Document(id_evt);
CREATE INDEX idx_document_id_transac ON Document(id_transac);
CREATE INDEX idx_document_id_cr ON Document(id_cr);