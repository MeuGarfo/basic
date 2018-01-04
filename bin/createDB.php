<?php
function createDB()
{
    $conn = new mysqli($_ENV['db_server'], $_ENV['db_user'], $_ENV['db_password']);
    if ($conn->connect_error) {
        die("erro de conexão:".PHP_EOL.$conn->connect_error);
    }
    $sql = "SHOW DATABASES LIKE  '".$_ENV['db_name']."'";
    if ($conn->query($sql)->num_rows === 1) {
        print 'o banco de dados já existe';
    } else {
        $sql = "CREATE DATABASE ".$_ENV['db_name'];
        if ($conn->query($sql) === true) {
            echo "db criado com sucesso";
        } else {
            echo "erro ao criar o banco de dados:".PHP_EOL.$conn->error;
        }
        $conn->close();
    }
}
