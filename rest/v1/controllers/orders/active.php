<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/orders/orders.php';


// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$orders = new Orders($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();
  if (array_key_exists("orderid", $_GET)) {
    // check data
    checkPayload($data);
    $orders->order_aid = $_GET['orderid'];
    $orders->order_is_active = trim($data["isActive"]);
    checkId($orders->order_aid);
    $query = checkActive($orders);
    http_response_code(200);
    returnSuccess($orders, "Orders", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
