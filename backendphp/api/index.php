<?php
    include_once "../config/Database.php";

    $db = (new Database())->getConnection();

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($uri === '/api/v1/medicos') {

        if ($method === 'GET') {
            $stmt = $db->prepare("SELECT id, nome, crm, ufcrm FROM tb_medicos");
            $stmt->execute();

            $medicos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($medicos);
        }

        if ($method === 'POST') {
            $input = file_get_contents("php://input");
            $data = json_decode($input, true);

            $response = [];

            if (!$data) {
                http_response_code(400);
                echo json_encode(["message" => "JSON inválido ou vazio."]);
                exit;
            }

            // Se for um único objeto, transforma em array com 1 item
            if (isset($data["CRM"])) {
                $data = [$data];
            }
            
            $query = "INSERT INTO tb_medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)";
            $stmt = $db->prepare($query);

            //O código abaixo insere mais de um médico por vez
            foreach ($data as $doctor) {
                if (!empty($doctor["nome"]) && !empty($doctor["CRM"]) && !empty($doctor["UFCRM"])) {
                    $stmt->bindParam(":nome", $doctor["nome"]);
                    $stmt->bindParam(":CRM", $doctor["CRM"]);
                    $stmt->bindParam(":UFCRM", $doctor["UFCRM"]);

                    try {
                        $stmt->execute();
                        $response[] = [
                            "CRM" => $doctor["CRM"],
                            "status" => "sucesso"
                        ];
                    } catch (PDOException $e) {
                        $response[] = [
                            "CRM" => $doctor["CRM"],
                            "status" => "erro",
                            "motivo" => "CRM já cadastrado ou erro no banco."
                        ];
                    }
                } else {
                    $response[] = [
                        "CRM" => $doctor["CRM"] ?? "desconhecido",
                        "status" => "erro",
                        "motivo" => "Campos faltando."
                    ];
                }
            }
            //até aqui

            http_response_code(201);
            echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }
    }


?>