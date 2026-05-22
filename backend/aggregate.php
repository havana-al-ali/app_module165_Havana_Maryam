<?php
require __DIR__ . '/../vendor/autoload.php';

if (getenv('DOCKER') === 'true') {
    require __DIR__ . '/connect.docker.php';
} else {
    require __DIR__ . '/connect.php';
}

header('Content-Type: application/json; charset=utf-8');

$type = $_GET['type'] ?? '';

if ($type === 'avgByGender') {

    $pipeline = [
        [
            '$group' => [
                '_id' => '$gender',
                'count' => ['$sum' => 1],
                'avg_math' => ['$avg' => '$math score'],
                'avg_reading' => ['$avg' => '$reading score'],
                'avg_writing' => ['$avg' => '$writing score']
            ]
        ]
    ];

    $result = $collection->aggregate($pipeline)->toArray();
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($type === 'topStudent') {

    $pipeline = [
        [
            '$addFields' => [
                'average' => [
                    '$avg' => ['$math score', '$reading score', '$writing score']
                ]
            ]
        ],
        ['$sort' => ['average' => -1]],
        ['$limit' => 1]
    ];

    $result = $collection->aggregate($pipeline)->toArray();
    echo json_encode($result[0], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['error' => 'Agrégation inconnue']);
