<?php
require_once("./db.php");

global $pdo;

$stmt = $pdo->query("SELECT username, full_name FROM tugas4_asistensi_bwp.users");

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

