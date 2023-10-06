<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$order = new Orders($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("orderid", $_GET)) {
  // get data
  $order->order_aid = $_GET['orderid'];
  checkId($order->order_aid);
  

  $query = checkDelete($order);

  returnSuccess($order, "Order", $query);
}

// return 404 error if endpoint not available
checkEndpoint();