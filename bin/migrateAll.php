<?php
require_once './index.php';
require_once 'createDB.php';
$Migration->migrateAll();
