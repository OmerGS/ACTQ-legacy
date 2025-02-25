use actq;
SELECT * FROM Membre;
SELECT id FROM Role WHERE nomRole = 'Membre';

INSERT INTO Membre (nom, prenom, telephone, barcode, dateNaissance, email, password, salt, statusSpecial, statut)
VALUES ('GUNES', 'Omer Faruk', '+33695474646', '27000000', NULL, NULL, NULL, NULL, NULL, 'Actif');


INSERT INTO MembreRole (membre_id, role_id)
SELECT id, (SELECT id FROM Role WHERE nomRole = 'Membre') FROM Membre
ON DUPLICATE KEY UPDATE membre_id = membre_id;


-- Inserer les rôles
INSERT INTO Role (nomRole) VALUES ('Membre'), ('Modérateur'), ('Administrateur'), ('Conseil Administration');

-- Insrer les permissions
INSERT INTO Permission (nomPermission, description) VALUES 
('Gérer les membres', "Ajouter, modifier ou supprimer un membre de l'association"),
('Publier annonces', 'Publier des annonces visibles par tous les membres'),
('Gérer paiements', 'Voir et modifier les paiements des membres'),
('Attribuer rôles', 'Attribuer ou retirer des rôles aux membres'),
('Ajouter un paiement', 'Ajouter un paiement en liquide');

-- Associer les permissions aux rôles
-- Administrateur : a toutes les permissions
INSERT INTO RolePermission (role_id, permission_id)
SELECT (SELECT id FROM Role WHERE nomRole='Administrateur'), id FROM Permission;

-- Modérateur : peut gérer paiements et publier annonces
INSERT INTO RolePermission (role_id, permission_id)
VALUES 
((SELECT id FROM Role WHERE nomRole='Modérateur'), (SELECT id FROM Permission WHERE nomPermission='Ajouter un paiement'));

-- Conseil Administration : peut gérer les membres et publier annonces
INSERT INTO RolePermission (role_id, permission_id)
VALUES 
((SELECT id FROM Role WHERE nomRole='Conseil Administration'), (SELECT id FROM Permission WHERE nomPermission='Gérer les membres'));