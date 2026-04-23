<?php
    include_once "cors.php";
    //Esse arquivo cors.php foi preciso, pois estava dando erro no frontend, para permitir os cabeçalhos HTTP
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

        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

            $data = json_decode(file_get_contents("php://input"), true);

            $id = $data['id'] ?? null;
            $nome = $data['nome'] ?? '';
            $CRM = $data['CRM'] ?? '';
            $UFCRM = $data['UFCRM'] ?? '';

            //Validação básica
            if (!$id || !$nome || !$CRM || !$UFCRM) {
                echo json_encode([
                    "success" => false,
                    "message" => "Dados incompletos"
                ]);
                exit;
            }

            try {

                //Verificar CRM duplicado (exceto o próprio registro)
                $check = "SELECT id FROM tb_medicos WHERE CRM = :CRM AND id != :id";
                $stmt = $db->prepare($check);

                $stmt->execute([
                    ":CRM" => $CRM,
                    ":id" => $id
                ]);

                if ($stmt->rowCount() > 0) {
                    echo json_encode([
                        "success" => false,
                        "message" => "CRM já cadastrado para outro médico"
                    ]);
                    exit;
                }

                //Atualizar médico
                $sqlUpdate = "UPDATE tb_medicos SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM WHERE id = :id";

                $stmtUpdate = $db->prepare($sqlUpdate);

                $stmtUpdate->execute([
                    ":nome" => $nome,
                    ":CRM" => $CRM,
                    ":UFCRM" => $UFCRM,
                    ":id" => $id
                ]);

                echo json_encode([
                    "success" => true,
                    "message" => "Médico atualizado com sucesso"
                ]);

            } catch (PDOException $e) {

                //Tratamento de erro (ex: UNIQUE constraint)
                if ($e->getCode() == 23000) {
                    echo json_encode([
                        "success" => false,
                        "message" => "CRM já existe"
                    ]);
                } else {
                    echo json_encode([
                        "success" => false,
                        "message" => "Erro ao atualizar médico"
                    ]);
                }
            }

            //http_response_code(201);
            //echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $id = $_GET['id'];

            $stmt = $conn->prepare("DELETE FROM tb_medicos WHERE id=?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false]);
            }
        }

    }


?>