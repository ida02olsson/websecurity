<?php

$url = 'http://localhost:8080/wallet/utxos';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPGET, true);

$response = curl_exec($ch);

if(curl_errno($ch)){
    throw new Exception(curl_error($ch));
}

curl_close($ch);


header('Content-Type: application/json');

echo $response;

?>