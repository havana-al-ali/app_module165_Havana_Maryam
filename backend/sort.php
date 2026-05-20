<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/connect.php';

header('Content-Type: application/json; charset=utf-8');

$field = $_GET['field'] ?? 'math';

$map = [
    'math' => 'math score',
    'writing' => 'writing score'
];

if (!isset($map[$field])) {
    echo json_encode(['error' => 'Champ invalide']);
    exit;
}

$result = $collection->find(
    [],
    [
        'sort' => [$map[$field] => -1],
        'limit' => 1
    ]
)->toArray();

$student = $result[0] ?? null;

if ($student) {
    $student['average'] = round(
        ($student['math score'] + $student['reading score'] + $student['writing score']) / 3,
        1
    );
}

echo json_encode($student, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
