<?php
$username = "root";
$dbname = "tugas4_asistensi_bwp";
$host = "localhost";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch(PDOException $e) {
    echo $e->getMessage();
}
