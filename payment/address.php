<?php


$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://localhost:8080/wallet/address");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    $data = json_decode($response, true);
    echo "Wallet address: " . $data['result'][0];
}

curl_close($ch);

?>
