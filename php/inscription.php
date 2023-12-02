<?php
include("./config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $pseudo = $_POST["pseudo"];
        $email = $_POST["email"];
        $nom = $_POST["nom"];
        $prenom = $_POST["prenom"];
        $password = $_POST["signup-Password"];

        $sql = "SELECT * FROM user WHERE pseudo = :pseudo OR email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pseudo", $pseudo);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo "Cet utilisateur existe déjà dans la base de données.";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO user (pseudo, email, nom, prenom, MDP) VALUES (:pseudo, :email, :nom, :prenom, :hashedPassword)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":pseudo", $pseudo);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":nom", $nom);
            $stmt->bindParam(":prenom", $prenom);
            $stmt->bindParam(":hashedPassword", $hashedPassword);

            if ($stmt->execute()) {
                echo "Inscription réussie! Veuillez vous connecter!";
            } else {
                echo "Erreur lors de l'inscription : " . $stmt->errorInfo()[2];
            }
        }
    } 

} catch (PDOException $e) {
    die("La connexion à la base de données a échoué : " . $e->getMessage());
}

$conn = null;
?>