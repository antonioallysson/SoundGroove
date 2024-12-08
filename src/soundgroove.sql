-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/12/2024 às 23:07
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `soundgroove`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `track_id` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `track_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `reviews`
--

INSERT INTO `reviews` (`id`, `track_id`, `user_id`, `rating`, `comment`, `created_at`, `track_name`) VALUES
(15, '0bPP5cDG1ZnbAVCEa3ZbQ1', 20, 5, 'ainnn', '2024-12-08 19:16:30', 'Só Fé'),
(16, '0bPP5cDG1ZnbAVCEa3ZbQ1', 19, 5, 'boraaaaaaaaaaa', '2024-12-08 19:19:30', 'Só Fé'),
(17, '3H7eBmcTJyuEMStfmKuLmG', 19, 5, 'hhh', '2024-12-08 19:31:36', 'A Danada Me Ligando'),
(18, '4rPkN1FMzQyFNP9cLUGIIB', 20, 5, 'divaaaaaaaaaaaaaaaa', '2024-12-08 20:03:42', 'Love Again'),
(19, '21B4gaTWnTkuSh77iWEXdS', 19, 5, 'hhh', '2024-12-08 20:40:19', 'Juno'),
(20, '5vNRhkKd0yEAg8suGBpjeY', 19, 5, 'aaaaa', '2024-12-08 20:50:41', 'APT.'),
(21, '5vNRhkKd0yEAg8suGBpjeY', 20, 5, 'adasd', '2024-12-08 20:51:26', 'APT.'),
(22, '5vNRhkKd0yEAg8suGBpjeY', 22, 1, 'ain que chata', '2024-12-08 23:35:56', 'APT.'),
(23, '2kXkaplZ6HdXz5XYBtdunj', 22, 2, 'mais menino, que coisa em', '2024-12-09 00:08:48', 'Acenda o farol'),
(24, '7IFsTX5H1sWcEl8joV0IdD', 19, 2, 'Homeostase é o processo pelo qual o corpo mantém o equilíbrio interno estável, mesmo diante de mudanças externas ou internas. Esse mecanismo é essencial para a sobrevivência e para o funcionamento ideal do organismo.\n\nExemplos de homeostase no corpo humano:\nTemperatura corporal:\n\nQuando está quente, o corpo aumenta o suor para resfriar a pele.\nQuando está frio, provoca tremores e reduz a circulação na pele para conservar calor.\nNíveis de glicose no sangue:\n\nA insulina (quando a glicose está alta) e o glucagon (quando a glicose está baixa) regulam os níveis de açúcar no sangue, garantindo energia suficiente para as células.\nEquilíbrio hídrico:\n\nOs rins ajustam a excreção de água para manter o equilíbrio de líquidos no corpo, com a ajuda do hormônio antidiurético (ADH).\npH do sangue:\n\nO corpo mantém o pH sanguíneo próximo de 7,4, utilizando sistemas como o respiratório (controle do dióxido de carbono) e o renal (regulação de bicarbonato).\nComo funciona?\nA homeostase é regulada por mecanismos de feedback:\n\nFeedback negativo: Corrige desvios do equilíbrio, como quando o corpo reduz o açúcar no sangue após uma refeição.\nFeedback positivo: Amplifica um processo específico, como as contrações uterinas durante o parto, estimuladas pela ocitocina.', '2024-12-09 00:41:17', 'THE BOX MEDLEY FUNK 2'),
(25, '2rFi57mXQTm8Di4DJ8WPKi', 19, 3, 'Homeostase é o processo pelo qual o corpo mantém o equilíbrio interno estável, mesmo diante de mudanças externas ou internas. Esse mecanismo é essencial para a sobrevivência e para o funcionamento ideal do organismo.\n\nExemplos de homeostase no corpo humano:\nTemperatura corporal:\n\nQuando está quente, o corpo aumenta o suor para resfriar a pele.\nQuando está frio, provoca tremores e reduz a circulação na pele para conservar calor.\nNíveis de glicose no sangue:\n\nA insulina (quando a glicose está alta) e o glucagon (quando a glicose está baixa) regulam os níveis de açúcar no sangue, garantindo energia suficiente para as células.\nEquilíbrio hídrico:\n\nOs rins ajustam a excreção de água para manter o equilíbrio de líquidos no corpo, com a ajuda do hormônio antidiurético (ADH).\npH do sangue:\n\nO corpo mantém o pH sanguíneo próximo de 7,4, utilizando sistemas como o respiratório (controle do dióxido de carbono) e o renal (regulação de bicarbonato).\nComo funciona?\nA homeostase é regulada por mecanismos de feedback:\n\nFeedback negativo: Corrige desvios do equilíbrio, como quando o corpo reduz o açúcar no sangue após uma refeição.\nFeedback positivo: Amplifica um processo específico, como as contrações uterinas durante o parto, estimuladas pela ocitocina.', '2024-12-09 00:41:49', 'Goodnight Menina 4'),
(26, '1NcqLEg2r2LXqMVbam2BJD', 19, 4, 'aaa', '2024-12-09 00:42:13', 'Triplex - Ao Vivo'),
(27, '47Slg6LuqLaX0VodpSCvPt', 19, 5, 'dasdd', '2024-12-09 00:43:09', 'Just the Way You Are'),
(28, '7F25roCtYi55JouckaayPC', 19, 5, 'toppp', '2024-12-09 00:43:29', 'Judas'),
(29, '3H7eBmcTJyuEMStfmKuLmG', 19, 3, 'bbb', '2024-12-09 00:49:15', 'A Danada Me Ligando');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(19, 'Antonio Allysson Cordeiro Do Nascimento', 'antonioallysson2020@gmail.com', '$2b$10$T7AK1ouAasbrTmxrSmExXegUz26qLFtJj8RNJXrYwXTIlkFKQjmSy', '2024-12-08 12:03:28'),
(20, 'a', 'antonniipo@gmail.com', '$2b$10$8LqFVEoqNsEqSCmVBFbZXuOykhlnkkRKYyyfJVtPOv80JaMkHzSfW', '2024-12-08 12:44:43'),
(22, 'zamorano', 'zamorano@gmail.com', '$2b$10$px0Uvq7SCoivunWd2oMucOvxvOAC1h1kq9Xl9HE8X1uOAlwES9ZKq', '2024-12-08 20:34:27'),
(23, 'SoundGroove', 'SoundGroove', '$2b$10$T.uuZLRCaZu5HfbOQgwnQe8u9ev23zYBjpa5keMV4HFUdXv72v.XK', '2024-12-08 20:43:04');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
