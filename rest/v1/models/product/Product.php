<?php

class Product
{
    public $product_aid;
    public $product_category;
    public $product_description;
    public $product_price;
    public $product_quantity;
    public $product_brand;
    public $product_is_active;
    public $product_created;
    public $product_datetime;

    public $connection;
    public $lastInsertedId;
    public $emp_start;
    public $emp_total;
    public $emp_search;

    public $tbl_product;
    public $tblClient;
    public $tblServices;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tbl_product = "tbl_product";
        // $this->tblClient = "tbl_client";
        // $this->tblServices = "tbl_settings_services";
        
    }

    public function readAll()
    {
      try {
        $sql = "select * from {$this->tbl_product} ";
        $sql .= "order by product_is_active desc, ";
        $sql .= "product_aid asc";
        $query = $this->connection->query($sql);
      } catch (PDOException $ex) {
        $query = false;
      }
      return $query;
    }

  public function create()
  {
    try {
      $sql = "insert into {$this->tbl_product} ";
      $sql .= "(product_category, ";
      $sql .= "product_description, ";
      $sql .= "product_price, ";
      $sql .= "product_quantity, ";
      $sql .= "product_brand, ";
      $sql .= "product_is_active, ";
      $sql .= "product_created, ";
      $sql .= "product_datetime ) values ( ";
      $sql .= ":product_category, ";
      $sql .= ":product_description, ";
      $sql .= ":product_price, ";
      $sql .= ":product_quantity, ";
      $sql .= ":product_brand, ";
      $sql .= ":product_is_active, ";
      $sql .= ":product_created, ";
      $sql .= ":product_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "product_category" => $this->product_category,
        "product_description" => $this->product_description,
        "product_price" => $this->product_price,
        "product_quantity" => $this->product_quantity,
        "product_brand" => $this->product_brand,
        "product_is_active" => $this->product_is_active,
        "product_created" => $this->product_created,
        "product_datetime" => $this->product_datetime,
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
      $sql = "update {$this->tbl_product} set ";
      $sql .= "product_category = :product_category, ";
      $sql .= "product_description = :product_description, ";
      $sql .= "product_price = :product_price, ";
      $sql .= "product_quantity = :product_quantity, ";
      $sql .= "product_brand = :product_brand, ";
      $sql .= "product_datetime = :product_datetime ";
      $sql .= "where product_aid = :product_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "product_category" => $this->product_category,
        "product_description" => $this->product_description,
        "product_price" => $this->product_price,
        "product_quantity" => $this->product_quantity,
        "product_brand" => $this->product_brand,
        "product_datetime" => $this->product_datetime,
        "product_aid" => $this->product_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tbl_product} ";
      $sql .= "where product_aid = :product_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "product_aid" => $this->product_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
    {
    try {
    $sql = "update {$this->tbl_product} set ";
    $sql .= "product_is_active = :product_is_active, ";
    $sql .= "product_datetime = :product_datetime ";
    $sql .= "where product_aid = :product_aid ";
    $query = $this->connection->prepare($sql);
    $query->execute([
    "product_is_active" => $this->product_is_active,
    "product_datetime" => $this->product_datetime,
    "product_aid" => $this->product_aid,
    ]);
    } catch (PDOException $ex) {
    $query = false;
    }
    return $query;
  }

}