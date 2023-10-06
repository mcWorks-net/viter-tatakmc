<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$orders = new Orders($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("orderid", $_GET)) {
  $orders->order_aid  = $_GET['orderid'];
  checkId($orders->order_aid );
  $query = checkReadById($orders);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($orders);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();