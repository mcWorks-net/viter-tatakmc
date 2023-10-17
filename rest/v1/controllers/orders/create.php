<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$orders = new Orders($conn);
// get should not be present
if (array_key_exists("orderid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$orders->order_is_active = 1;
$orders->order_service_id = checkIndex($data, "order_service_id");
$orders->order_status = checkIndex($data, "order_status");
$orders->order_price = checkIndex($data, "order_price");
$orders->order_quantity = checkIndex($data, "order_quantity");
$orders->order_payment_status = checkIndex($data, "order_payment_status");
$orders->order_client_id = checkIndex($data, "order_client_id");
$orders->order_created = date("Y-m-d H:i:s");
$orders->order_datetime = date("Y-m-d H:i:s");
// string value convert to lower case
// $column_name = strtolower(str_replace(" ", "_", $data["act_name"]));
// check name
// isNameExist($act, $act->act_name);
// create
$query = checkCreate($orders);
// add column
// checkAddColumn($act, $column_name);
// update column value after adding
// checkUpdateColumnValue($act, $column_name);
returnSuccess($orders, "client", $query);
