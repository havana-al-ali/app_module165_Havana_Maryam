<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/connect.php';

header('Content-Type: application/json; charset=utf-8');

$type = $_GET['type'] ?? '';

if ($type === 'female_highschool') {
    $filter = [
        'gender' => 'female',
        'parental level of education' => 'high school'
    ];
}
else {
    echo json_encode(['error' => 'Filtre inconnu']);
    exit;
}

$result = $collection->find($filter)->toArray();

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
