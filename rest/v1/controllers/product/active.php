<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../models/product/product.php';


// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();
  if (array_key_exists("productid", $_GET)) {
    // check data
    checkPayload($data);
    $product->product_aid = $_GET['productid'];
    $product->product_is_active = trim($data["isActive"]);
    checkId($product->product_aid);
    $query = checkActive($product);
    http_response_code(200);
    returnSuccess($product, "product", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
