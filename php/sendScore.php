<?php
include("./config.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des données envoyées en POST
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérification et traitement des données reçues
    if ($data !== null) {
        // Utilisez les données comme nécessaire
        $pseudo = $data['pseudo'];
        $score = $data['score'];

        // Récupérer le record actuel de l'utilisateur
        $sql = "SELECT record FROM user WHERE pseudo = :pseudo";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pseudo", $pseudo);
        $stmt->execute();
        $record = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$record || $record['record'] < $score) {
            // Mettre à jour le record de l'utilisateur si le nouveau score est plus élevé
            $sqlUpdate = "UPDATE user SET record = :score WHERE pseudo = :pseudo";
            $stmtUpdate = $conn->prepare($sqlUpdate);
            $stmtUpdate->bindParam(":pseudo", $pseudo);
            $stmtUpdate->bindParam(":score", $score);
            $stmtUpdate->execute();

            echo "Record inscrit avec succès pour " . $pseudo . " !";
        } else {
            echo "Le score n'est pas plus élevé que le record actuel.";
        }
    } else {
        // Si aucune donnée n'a été reçue
        echo 'Aucune donnée reçue';
    }
} catch (PDOException $e) {
    die("La connexion à la base de données a échoué : " . $e->getMessage());
}
?>
