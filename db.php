<?php
if (!defined('ROOT')) {
    define('ROOT', __DIR__.'/');
}
if (!defined('APP')) {
    define('APP', ROOT.'app/');
}
require ROOT.'vendor/autoload.php';
$filename=ROOT.'app/.env';
if (file_exists($filename)) {
    $dotenv = new Dotenv\Dotenv(ROOT.'app');
    $dotenv->load();
    $db=new Medoo\Medoo([
        'database_type' => 'mysql',
        'database_name' => $_ENV['db_name'],
        'server' => $_ENV['db_server'],
        'username' => $_ENV['db_user'],
        'password' => $_ENV['db_password']
    ]);
    if ($db) {
        $Migration=new Basic\Migration($db);
        return $db;
    } else {
        return die($db->error());
    }
} else {
    return die("cp example.env app/.env");
}
