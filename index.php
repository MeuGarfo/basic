<?php
define("ROOT", __DIR__."/");
require_once ROOT."autoload.php";
if (file_exists(ROOT."vendor/autoload.php")) {
    require_once ROOT."vendor/autoload.php";
} else {
    die('composer install');
}
if (php_sapi_name() == "cli") {
    $filename=ROOT."app/.env";
    if (file_exists($filename)) {
        $dotenv = new Dotenv\Dotenv(ROOT."app");
        $dotenv->load();
        $dbConfig=require_once ROOT."db.php";
        $Migration=new Basic\Migration($dbConfig);
    } else {
        die("cp example.env app/.env");
    }
} elseif (file_exists(ROOT."offline") && php_sapi_name() != "cli") {
    die("maintenance mode");
} elseif (file_exists(ROOT."app/router.php")) {
    require_once ROOT."app/router.php";
} else {
    die("sh make 4 && touch app/router.php");
}
