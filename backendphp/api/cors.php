<?php
    // Permite qualquer origem (ou especifique, ex: http://localhost:5173)
    header("Access-Control-Allow-Origin: *");

    // Permite os headers usados pelo frontend
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Permite os métodos usados (inclusive OPTIONS)
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    // Retorna status 200 para requisições OPTIONS (preflight)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
?>