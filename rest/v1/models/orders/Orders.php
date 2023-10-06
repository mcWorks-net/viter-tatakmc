<?php

class Orders
{
    public $order_aid;
    public $order_is_active;
    public $order_service_id;
    public $order_status;
    public $order_price;
    public $order_payment_status;
    public $order_created;
    public $order_datetime;
    public $order_client_id;

    public $connection;
    public $lastInsertedId;
    public $emp_start;
    public $emp_total;
    public $emp_search;

    public $tblOrders;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblOrders = "tbl_orders";
        
    }

    public function readAll()
      {
        try {
          $sql = "select * from {$this->tblOrders} ";
          $sql .= "order by order_is_active desc, ";
          $sql .= "order_aid asc ";
          $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
          $query = false;
        }
        return $query;
      }

      public function create()
  {
    try {
      $sql = "insert into {$this->tblOrders} ";
      $sql .= "(order_is_active, ";
      $sql .= "order_service_id, ";
      $sql .= "order_status, ";
      $sql .= "order_price, ";
      $sql .= "order_payment_status, ";
      $sql .= "order_client_id, ";
      $sql .= "order_created, ";
      $sql .= "order_datetime ) values ( ";
      $sql .= ":order_is_active, ";
      $sql .= ":order_service_id, ";
      $sql .= ":order_status, ";
      $sql .= ":order_price, ";
      $sql .= ":order_payment_status, ";
      $sql .= ":order_client_id, ";
      $sql .= ":order_created, ";
      $sql .= ":order_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "order_is_active" => $this->order_is_active,
        "order_service_id" => $this->order_service_id,
        "order_status" => $this->order_status,
        "order_price" => $this->order_price,
        "order_payment_status" => $this->order_payment_status,
        "order_client_id" => $this->order_client_id,
        "order_created" => $this->order_created,
        "order_datetime" => $this->order_datetime,
      ]);
      $this->lastInsertedId = $this->connection->lastInsertId();
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function update()
  {
    try {
      $sql = "update {$this->tblOrders} set ";
      $sql .= "order_service_id = :order_service_id, ";
      $sql .= "order_status = :order_status, ";
      $sql .= "order_price = :order_price, ";
      $sql .= "order_payment_status = :order_payment_status, ";
      $sql .= "order_client_id = :order_client_id, ";
      $sql .= "order_created = :order_created, ";
      $sql .= "order_datetime = :order_datetime ";
      $sql .= "where order_aid = :order_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "order_service_id" => $this->order_service_id,
        "order_status" => $this->order_status,
        "order_price" => $this->order_price,
        "order_payment_status" => $this->order_payment_status,
        "order_client_id" => $this->order_client_id,
        "order_created" => $this->order_created,
        "order_datetime" => $this->order_datetime,
        "order_aid" => $this->order_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblOrders} ";
      $sql .= "where order_aid = :order_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "order_aid" => $this->order_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
    {
    try {
    $sql = "update {$this->tblOrders} set ";
    $sql .= "order_is_active = :order_is_active, ";
    $sql .= "order_datetime = :order_datetime ";
    $sql .= "where order_aid = :order_aid ";
    $query = $this->connection->prepare($sql);
    $query->execute([
    "order_is_active" => $this->order_is_active,
    "order_datetime" => $this->order_datetime,
    "order_aid" => $this->order_aid,
    ]);
    } catch (PDOException $ex) {
    $query = false;
    }
    return $query;
  }

}