-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 16 mai 2025 à 12:05
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mypaie`
--

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `date_recrutement` date DEFAULT NULL,
  `diplome` varchar(100) DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL,
  `salaire_base` double DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `statut` tinyint(1) NOT NULL DEFAULT 1,
  `matricule` varchar(50) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `agent`
--

INSERT INTO `agent` (`id`, `nom`, `prenom`, `date_recrutement`, `diplome`, `id_categorie`, `salaire_base`, `experience`, `statut`, `matricule`, `id_role`) VALUES
(1, 'Kouadio', 'Jean', '2022-03-15', 'Licence', 1, 200000, '2', 0, 'AG-C1-0001', 1),
(2, 'Diallo', 'Aminata', '2021-07-01', 'Master', 2, 300000, '3', 1, 'AG-C2-0002', 1),
(3, 'Ndiaye', 'Moussa', '2020-01-20', 'Licence', 2, 280000, '4', 1, 'AG-C2-0003', 1),
(4, 'Ouattara', 'Fatou', '2019-10-10', 'BTS', 3, 350000, '5', 1, 'AG-C3-0004', 1),
(5, 'Tall', 'Madou', '2025-05-02', 'CAP', 1, 200000, '1', 1, 'AG-C1-0005', 1),
(6, 'Traoré', 'Abdoulaye', '2020-08-20', 'Master', 2, 280000, '5', 1, 'AG-C2-0006', 1),
(7, 'Diabaté', 'Fatoumata', '2021-09-24', 'BEP', 3, 350000, '8', 1, 'AG-C3-0007', 1),
(8, 'Koné', 'Ibrahim', '2023-01-06', 'Master', 1, 200000, '3', 1, 'AG-C1-0008', 1),
(9, 'Fofana', 'Aïcha', '2022-11-25', 'BTS', 1, 200000, '7', 1, 'AG-C1-0009', 1),
(10, 'Keita', 'Djene', '2024-05-02', 'Licence', 1, 300000, '2', 1, 'AG-C1-0010', 1),
(11, 'Sylla', 'Fatou', '2020-01-22', 'Master', 3, 350000, '5', 1, 'AG-C3-0011', 1),
(12, 'Camara', 'Mamadou', '2021-09-05', 'CAP', 3, 350000, '10', 1, 'AG-C3-0012', 1),
(13, 'Keita', 'Aissata', '2021-08-26', 'BTS', 3, 350000, '7', 1, 'AG-C3-0013', 1),
(14, 'Barry', 'Cheikh', '2021-06-07', 'Licence', 2, 280000, '3', 1, 'AG-C2-0014', 1),
(15, 'Bah', 'Bintou', '2021-11-06', 'Master', 1, 200000, '8', 1, 'AG-C1-0015', 1),
(16, 'Doucouré', 'Adama', '2023-07-27', 'Licence', 1, 200000, '7', 1, 'AG-C1-0016', 1),
(17, 'Sagna', 'Khadim', '2023-11-13', 'CAP', 2, 280000, '6', 1, 'AG-C2-0017', 1),
(18, 'Fall', 'Ndeye', '2020-10-28', 'CAP', 2, 280000, '2', 1, 'AG-C2-0018', 1),
(19, 'Gueye', 'Aliou', '2023-09-26', 'Master', 3, 350000, '9', 1, 'AG-C3-0019', 1),
(20, 'Cissé', 'Mame', '2023-06-08', 'CAP', 1, 200000, '6', 1, 'AG-C1-0020', 1);

-- --------------------------------------------------------

--
-- Structure de la table `avoir`
--

CREATE TABLE `avoir` (
  `id_seuil` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avoir`
--

INSERT INTO `avoir` (`id_seuil`, `id_categorie`, `date`) VALUES
(1, 1, '2024-01-01'),
(2, 2, '2024-01-01'),
(3, 3, '2024-01-01');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `bonus_pourcentage` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `bonus_pourcentage`) VALUES
(1, 'Junior', 0.02),
(2, 'Intermédiaire', 0.05),
(3, 'Sénior', 0.1);

-- --------------------------------------------------------

--
-- Structure de la table `chiffre_affaire`
--

CREATE TABLE `chiffre_affaire` (
  `id` int(11) NOT NULL,
  `id_agent` int(11) DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `montant` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chiffre_affaire`
--

INSERT INTO `chiffre_affaire` (`id`, `id_agent`, `date`, `montant`) VALUES
(1, 1, '2024-12-01', 800000),
(2, 2, '2024-12-01', 1200000),
(3, 3, '2024-12-01', 1000000),
(4, 4, '2024-12-01', 1500000),
(5, 5, '2025-05-06', 100000),
(6, 6, '2024-01-01', 900000),
(7, 6, '2024-02-01', 1000000),
(8, 6, '2024-03-01', 1100000),
(9, 7, '2024-01-01', 1400000),
(10, 7, '2024-02-01', 1500000),
(11, 7, '2024-03-01', 1600000),
(12, 8, '2024-01-01', 400000),
(13, 8, '2024-02-01', 500000),
(14, 8, '2024-03-01', 550000),
(15, 9, '2024-01-01', 400000),
(16, 9, '2024-02-01', 500000),
(17, 9, '2024-03-01', 550000),
(18, 10, '2024-01-01', 400000),
(19, 10, '2024-02-01', 500000),
(20, 10, '2024-03-01', 550000),
(21, 11, '2024-05-01', 1600000),
(22, 12, '2024-05-01', 1500000),
(23, 13, '2024-05-01', 1550000),
(24, 14, '2024-05-01', 1100000),
(25, 15, '2024-05-01', 550000),
(26, 16, '2024-05-01', 600000),
(27, 17, '2024-05-01', 1050000),
(28, 18, '2024-05-01', 950000),
(29, 19, '2024-05-01', 1700000),
(30, 20, '2024-05-01', 500000);

-- --------------------------------------------------------

--
-- Structure de la table `paie`
--

CREATE TABLE `paie` (
  `id_paie` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `salaire_base` double DEFAULT NULL,
  `bonus` double DEFAULT NULL,
  `salaire_total` double DEFAULT NULL,
  `id_agent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `paie`
--

INSERT INTO `paie` (`id_paie`, `date`, `salaire_base`, `bonus`, `salaire_total`, `id_agent`) VALUES
(1, '2025-01-05', 200000, 4000, 204000, 1),
(2, '2025-01-05', 300000, 15000, 315000, 2),
(3, '2025-01-05', 280000, 14000, 294000, 3),
(4, '2025-01-05', 350000, 35000, 385000, 4),
(5, '2024-01-01', 280000, 0, 280000, 6),
(6, '2024-02-01', 280000, 0, 280000, 6),
(7, '2024-03-01', 280000, 5000, 285000, 6),
(8, '2024-01-01', 350000, 0, 350000, 7),
(9, '2024-02-01', 350000, 0, 350000, 7),
(10, '2024-03-01', 350000, 10000, 360000, 7),
(11, '2024-01-01', 200000, 0, 200000, 8),
(12, '2024-02-01', 200000, 0, 200000, 8),
(13, '2024-03-01', 200000, 1000, 201000, 8),
(14, '2024-01-01', 200000, 0, 200000, 9),
(15, '2024-02-01', 200000, 0, 200000, 9),
(16, '2024-03-01', 200000, 1000, 201000, 9),
(17, '2024-01-01', 200000, 0, 200000, 10),
(18, '2024-02-01', 200000, 0, 200000, 10),
(19, '2024-03-01', 200000, 1000, 201000, 10);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `code`) VALUES
(3, 'ADMIN'),
(1, 'AG'),
(4, 'DD'),
(2, 'GP');

-- --------------------------------------------------------

--
-- Structure de la table `seuil`
--

CREATE TABLE `seuil` (
  `id` int(11) NOT NULL,
  `montant` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `seuil`
--

INSERT INTO `seuil` (`id`, `montant`) VALUES
(1, 500000),
(2, 1000000),
(3, 1500000);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `matricule` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `matricule`, `password`, `id_role`) VALUES
(1, 'ADMIN-C0-0000', '$2y$10$e0MYzXyjpJS2Tz9fRU8TFeFxObM39wWpj/M6bY5iQoZbB.JZNkfTa', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `fk_agent_role` (`id_role`);

--
-- Index pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD PRIMARY KEY (`id_seuil`,`id_categorie`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `chiffre_affaire`
--
ALTER TABLE `chiffre_affaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_agent` (`id_agent`);

--
-- Index pour la table `paie`
--
ALTER TABLE `paie`
  ADD PRIMARY KEY (`id_paie`),
  ADD KEY `id_agent` (`id_agent`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Index pour la table `seuil`
--
ALTER TABLE `seuil`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`),
  ADD KEY `id_role` (`id_role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `chiffre_affaire`
--
ALTER TABLE `chiffre_affaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `paie`
--
ALTER TABLE `paie`
  MODIFY `id_paie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `seuil`
--
ALTER TABLE `seuil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `agent`
--
ALTER TABLE `agent`
  ADD CONSTRAINT `agent_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `fk_agent_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`);

--
-- Contraintes pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD CONSTRAINT `avoir_ibfk_1` FOREIGN KEY (`id_seuil`) REFERENCES `seuil` (`id`),
  ADD CONSTRAINT `avoir_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id`);

--
-- Contraintes pour la table `chiffre_affaire`
--
ALTER TABLE `chiffre_affaire`
  ADD CONSTRAINT `chiffre_affaire_ibfk_1` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id`);

--
-- Contraintes pour la table `paie`
--
ALTER TABLE `paie`
  ADD CONSTRAINT `paie_ibfk_1` FOREIGN KEY (`id_agent`) REFERENCES `agent` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
