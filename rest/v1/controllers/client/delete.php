<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("clientid", $_GET)) {
  // get data
  $client->client_aid = $_GET['clientid'];
  checkId($client->client_aid);
  

  $query = checkDelete($client);

  returnSuccess($client, "Activities", $query);
}

// return 404 error if endpoint not available
checkEndpoint();