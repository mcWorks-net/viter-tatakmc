<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$services = new Services($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("servicesid", $_GET)) {
  $services->service_aid = $_GET['servicesid'];
  checkId($services->service_aid);
  $query = checkReadById($services);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($services);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();