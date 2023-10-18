<?php

class Services
{
    public $service_aid;
    public $service_is_active;
    public $service_type;
    public $service_cost;
    public $service_created;
    public $service_datetime;

    public $connection;
    public $lastInsertedId;
    public $emp_start;
    public $emp_total;
    public $emp_search;

    public $tblServices;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblServices = "tbl_settings_services";
        
    }

    public function readAll()
      {
        try {
          $sql = "select * from {$this->tblServices} ";
          $sql .= "order by service_is_active desc, ";
          $sql .= "service_aid asc";
          $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
          $query = false;
        }
        return $query;
      }

      public function readById()
      {
          try {
              $sql = "select * from {$this->tblServices} ";
              $sql .= "where service_aid = :service_aid ";
              $query = $this->connection->prepare($sql);
              $query->execute([
                  "service_aid" => $this->service_aid,
              ]);
          } catch (PDOException $ex) {
              $query = false;
          }
          return $query;
      }

      public function create()
  {
    try {
      $sql = "insert into {$this->tblServices} ";
      $sql .= "(service_is_active, ";
      $sql .= "service_type, ";
      $sql .= "service_cost, ";
      $sql .= "service_created, ";
      $sql .= "service_datetime ) values ( ";
      $sql .= ":service_is_active, ";
      $sql .= ":service_type, ";
      $sql .= ":service_cost, ";
      $sql .= ":service_created, ";
      $sql .= ":service_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "service_is_active" => $this->service_is_active,
        "service_type" => $this->service_type,
        "service_cost" => $this->service_cost,
        "service_created" => $this->service_created,
        "service_datetime" => $this->service_datetime,
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
      $sql = "update {$this->tblServices} set ";
      $sql .= "service_type = :service_type, ";
      $sql .= "service_cost = :service_cost, ";
      $sql .= "service_datetime = :service_datetime ";
      $sql .= "where service_aid  = :service_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "service_type" => $this->service_type,
        "service_cost" => $this->service_cost,
        "service_datetime" => $this->service_datetime,
        "service_aid" => $this->service_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblServices} ";
      $sql .= "where service_aid = :service_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "service_aid" => $this->service_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
    {
    try {
    $sql = "update {$this->tblServices} set ";
    $sql .= "service_is_active = :service_is_active, ";
    $sql .= "service_datetime = :service_datetime ";
    $sql .= "where service_aid = :service_aid ";
    $query = $this->connection->prepare($sql);
    $query->execute([
    "service_is_active" => $this->service_is_active,
    "service_datetime" => $this->service_datetime,
    "service_aid" => $this->service_aid,
    ]);
    } catch (PDOException $ex) {
    $query = false;
    }
    return $query;
  }

}