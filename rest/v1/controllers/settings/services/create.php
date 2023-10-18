<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$services = new Services($conn);
// get should not be present
if (array_key_exists("servicesid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$services->service_is_active = 1;
$services->service_type = checkIndex($data, "service_type");
$services->service_cost = checkIndex($data, "service_cost");
$services->service_created = date("Y-m-d H:i:s");
$services->service_datetime = date("Y-m-d H:i:s");
// string value convert to lower case
// $column_name = strtolower(str_replace(" ", "_", $data["act_name"]));
// check name
// isNameExist($act, $act->act_name);
// create
$query = checkCreate($services);
// add column
// checkAddColumn($act, $column_name);
// update column value after adding
// checkUpdateColumnValue($act, $column_name);
returnSuccess($services, "services", $query);
