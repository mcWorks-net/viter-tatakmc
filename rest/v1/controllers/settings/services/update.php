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
  // check data
  checkPayload($data);
  // get data
  $services->service_aid = $_GET['servicesid'];
  $services->service_type = checkIndex($data, "service_type");
  $services->service_cost = checkIndex($data, "service_cost");
  $services->service_created = date("Y-m-d H:i:s");
  checkId($services->service_aid);
  // update
  $query = checkUpdate($services);
  returnSuccess($services, "Services", $query);
}

// return 404 error if endpoint not available
checkEndpoint();