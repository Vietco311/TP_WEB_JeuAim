<?php
include("./config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $pseudo = $_POST["pseudo-email"];
        $password = $_POST["Conn-password"];

        $sql = "SELECT * FROM user WHERE pseudo = :pseudo OR email = :pseudo";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pseudo", $pseudo);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['MDP'])) {
            $user1 = $user['pseudo'];
            $record = $user['record'];
            echo "$user1 $record";
        } else {
            echo "echec";
        }
    }
} catch (PDOException $e) {
    die("La connexion à la base de données a échoué : " . $e->getMessage());
}

$conn = null;
?>