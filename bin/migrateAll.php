<?php
require './index.php';
require 'createDB.php';
$Migration->migrateAll();
