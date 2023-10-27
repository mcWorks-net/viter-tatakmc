<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("productid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $product->product_aid = $_GET['productid'];
  $product->product_category = checkIndex($data, "product_category");
  $product->product_description = checkIndex($data, "product_description");
  $product->product_price = checkIndex($data, "product_price");
  $product->product_quantity = checkIndex($data, "product_quantity");
  $product->product_brand = checkIndex($data, "product_brand");
  $product->product_datetime = date("Y-m-d H:i:s");
  checkId($product->product_aid);
  // update
  $query = checkUpdate($product);
  returnSuccess($product, "product", $query);
}

// return 404 error if endpoint not available
checkEndpoint();