<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get should not be present
if (array_key_exists("productid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$product->product_category = checkIndex($data, "product_category");
$product->product_description = checkIndex($data, "product_description");
$product->product_price = checkIndex($data, "product_price");
$product->product_quantity = checkIndex($data, "product_quantity");
$product->product_brand = checkIndex($data, "product_brand");
$product->product_is_active = 1;
$product->product_created = date("Y-m-d H:i:s");
$product->product_datetime = date("Y-m-d H:i:s");
// string value convert to lower case
// $column_name = strtolower(str_replace(" ", "_", $data["act_name"]));
// check name
// isNameExist($act, $act->act_name);
// create
$query = checkCreate($product);
// add column
// checkAddColumn($act, $column_name);
// update column value after adding
// checkUpdateColumnValue($act, $column_name);
returnSuccess($product, "product", $query);
