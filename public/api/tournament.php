<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/data_matches.json';
$seedFile = __DIR__ . '/seed_matches.json';

// Initialize data_matches.json if not present
if (!file_exists($dataFile)) {
    if (file_exists($seedFile)) {
        copy($seedFile, $dataFile);
    } else {
        file_put_contents($dataFile, json_encode(['matches' => [], 'lastUpdated' => time() * 1000]));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(['matches' => [], 'lastUpdated' => time() * 1000]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data && isset($data['action']) && $data['action'] === 'reset') {
        if (file_exists($seedFile)) {
            copy($seedFile, $dataFile);
            echo file_get_contents($dataFile);
        } else {
            echo json_encode(['status' => 'reset_failed']);
        }
        exit();
    }

    if ($data && isset($data['matches']) && is_array($data['matches'])) {
        $payload = [
            'matches' => $data['matches'],
            'lastUpdated' => isset($data['lastUpdated']) ? $data['lastUpdated'] : (time() * 1000),
        ];
        file_put_contents($dataFile, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit();
    }

    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit();
}
