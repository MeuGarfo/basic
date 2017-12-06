<?php
require 'vendor/autoload.php';

if(!defined('ROOT')){
    define('ROOT',__DIR__.'/');
}

$filename=__DIR__.'/app/.env';
if (file_exists($filename)) {
    $dotenv = new Dotenv\Dotenv(ROOT.'app');
    $dotenv->load();
    $dbConfig=[
        'db_server'=>'localhost',
        'db_name'=>$_ENV['db_name'],
        'db_user'=>$_ENV['db_user'],
        'db_password'=>$_ENV['db_password']
    ];
    $Migration=new Basic\Migration($dbConfig);
} else {
    die("cp example.env app/.env");
}

$db=new Medoo\Medoo([
    'database_type' => 'mysql',
    'database_name' => $_ENV['db_name'],
    'server' => 'localhost',
    'username' => $_ENV['db_user'],
    'password' => $_ENV['db_password']
]);
if ($db) {
    return $db;
} else {
    die($db->error());
}
