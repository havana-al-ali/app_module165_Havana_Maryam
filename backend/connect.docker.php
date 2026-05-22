<?php
require '../vendor/autoload.php';

$client = new MongoDB\Client(
    "mongodb://myUserAdmin:myPassword123@mongo_app165:27017",
    [
        "authSource" => "admin"
    ]
);

$db = $client->my_data_Havana_Maryam;
?>
