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
  // get data
  $product->product_aid = $_GET['productid'];
  checkId($product->product_aid);
  

  $query = checkDelete($product);

  returnSuccess($product, "Product", $query);
}

// return 404 error if endpoint not available
checkEndpoint();