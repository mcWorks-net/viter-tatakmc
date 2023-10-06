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
  // check data
  checkPayload($data);
  // get data
  $client->client_aid = $_GET['clientid'];
  $client->client_name = checkIndex($data, "client_name");
  $client->client_email = checkIndex($data, "client_email");
  $client->client_phone = checkIndex($data, "client_phone");
  $client->client_address = checkIndex($data, "client_address");
  $client->settings_activities_created = date("Y-m-d H:i:s");
  $client->settings_activities_datetime = date("Y-m-d H:i:s");
  checkId($client->client_aid);
  // update
  $query = checkUpdate($client);
  returnSuccess($client, "client", $query);
}

// return 404 error if endpoint not available
checkEndpoint();