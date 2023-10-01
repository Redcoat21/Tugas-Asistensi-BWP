<?php
require_once("./db.php");

global $pdo;

$stmt = $pdo->query("SELECT item_name, price, users.full_name FROM 
                                             tugas4_asistensi_bwp.items JOIN tugas4_asistensi_bwp.users WHERE seller_username = users.username");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
