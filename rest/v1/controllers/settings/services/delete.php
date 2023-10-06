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
  // get data
  $services->service_aid = $_GET['servicesid'];
  checkId($services->service_aid);
  

  $query = checkDelete($services);

  returnSuccess($services, "Activities", $query);
}

// return 404 error if endpoint not available
checkEndpoint();