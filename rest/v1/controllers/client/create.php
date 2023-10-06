<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get should not be present
if (array_key_exists("clientid", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$client->client_is_active = 1;
$client->client_name = checkIndex($data, "client_name");
$client->client_email = checkIndex($data, "client_email");
$client->client_phone = checkIndex($data, "client_phone");
$client->client_address = checkIndex($data, "client_address");
$client->client_created = date("Y-m-d H:i:s");
$client->client_datetime = date("Y-m-d H:i:s");
// string value convert to lower case
// $column_name = strtolower(str_replace(" ", "_", $data["act_name"]));
// check name
// isNameExist($act, $act->act_name);
// create
$query = checkCreate($client);
// add column
// checkAddColumn($act, $column_name);
// update column value after adding
// checkUpdateColumnValue($act, $column_name);
returnSuccess($client, "client", $query);
