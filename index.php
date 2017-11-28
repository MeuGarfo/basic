<?php
define('ROOT', __DIR__.'/');
require_once ROOT.'autoload.php';
require_once ROOT.'vendor/autoload.php';
if (php_sapi_name() == "cli") {
    $filename=ROOT.'app/.env';
    if (file_exists($filename)) {
        $dotenv = new Dotenv\Dotenv(ROOT.'app');
        $dotenv->load();
        $dbConfig=require_once ROOT.'db.php';
        $Migration=new Basic\Migration($dbConfig);
    } else {
        die("rename app/example.env to .env");
    }
} elseif (file_exists(ROOT.'offline') && php_sapi_name() != "cli") {
    die("maintenance mode");
} else {
    require_once 'app/router.php';
}
