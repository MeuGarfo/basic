<?php
function createDB($cfg)
{
    $servername = "localhost";
    $username = $cfg['user'];
    $password = $cfg['password'];
    $db = $cgf['db'];
    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        die("erro de conexão:".PHP_EOL.$conn->connect_error.PHP_EOL);
    }
    $sql = "SHOW DATABASES LIKE  '".$db."'";
    if ($conn->query($sql)->num_rows === 1) {
        print 'o banco de dados já existe'.PHP_EOL;
    } else {
        $sql = "CREATE DATABASE ".$db;
        if ($conn->query($sql) === true) {
            echo "db criado com sucesso".PHP_EOL;
        } else {
            echo "erro ao criar o banco de dados:".PHP_EOL.$conn->error.PHP_EOL;
        }
        $conn->close();
    }
}
