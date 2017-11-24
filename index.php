<?php
define('ROOT', __DIR__.'/');
define('VIEW_DIR', ROOT.'app/view/');
require_once ROOT.'autoload.php';
require_once ROOT.'vendor/autoload.php';
if (php_sapi_name() == "cli") {
    $filename=ROOT.'app/.env';
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
        die("rename app/example.env to .env");
    }
} elseif (file_exists(ROOT.'offline') && php_sapi_name() != "cli") {
    die("maintenance mode");
} else {
    require_once 'app/router.php';
}
