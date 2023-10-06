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
  // check data
  checkPayload($data);
  // get data
  $order->order_aid = $_GET['orderid'];
  $order->order_service_id = checkIndex($data, "order_service_id");
  $order->order_status = checkIndex($data, "order_status");
  $order->order_price = checkIndex($data, "order_price");
  $order->order_payment_status = checkIndex($data, "order_payment_status");
  $order->order_client_id = checkIndex($data, "order_client_id");
  $order->order_created = date("Y-m-d H:i:s");
  $order->order_datetime = date("Y-m-d H:i:s");
  checkId($order->order_aid);
  // update
  $query = checkUpdate($order);
  returnSuccess($order, "orders", $query);
}

// return 404 error if endpoint not available
checkEndpoint();