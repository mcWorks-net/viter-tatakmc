<?php

class Client
{
    public $client_aid;
    public $client_is_active;
    public $client_name;
    public $client_email;
    public $client_phone;
    public $client_address;
    public $client_created;
    public $client_datetime;

    public $connection;
    public $lastInsertedId;
    public $client_start;
    public $client_total;
    public $client_search;

    public $tblActivities;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblClient = "tbl_client";
        
    }

    public function readAll()
      {
        try {
          $sql = "select * from {$this->tblClient} ";
          $sql .= "order by client_is_active desc, ";
          $sql .= "client_aid asc ";
          $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
          $query = false;
        }
        return $query;
      }

      public function readLimit()
      {
        try {
          $sql = "select * from {$this->tblClient} ";
          $sql .= "order by client_is_active desc, ";
          $sql .= "client_aid asc ";
          $sql .= "limit :start, ";
          $sql .= ":total ";
          $query = $this->connection->prepare($sql);
          $query->execute([
              "start" => $this->client_start - 1,
              "total" => $this->client_total,
          ]);
      } catch (PDOException $ex) {
          $query = false;
      }
      return $query;
  }
      public function readById()
      {
          try {
              $sql = "select * from {$this->tblClient} ";
              $sql .= "where client_aid = :client_aid ";
              $query = $this->connection->prepare($sql);
              $query->execute([
                  "client_aid" => $this->client_aid,
              ]);
          } catch (PDOException $ex) {
              $query = false;
          }
          return $query;
      }

      public function create()
  {
    try {
      $sql = "insert into {$this->tblClient} ";
      $sql .= "(client_is_active, ";
      $sql .= "client_name, ";
      $sql .= "client_email, ";
      $sql .= "client_phone, ";
      $sql .= "client_address, ";
      $sql .= "client_created, ";
      $sql .= "client_datetime ) values ( ";
      $sql .= ":client_is_active, ";
      $sql .= ":client_name, ";
      $sql .= ":client_email, ";
      $sql .= ":client_phone, ";
      $sql .= ":client_address, ";
      $sql .= ":client_created, ";
      $sql .= ":client_datetime ) ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "client_is_active" => $this->client_is_active,
        "client_name" => $this->client_name,
        "client_email" => $this->client_email,
        "client_phone" => $this->client_phone,
        "client_address" => $this->client_address,
        "client_created" => $this->client_created,
        "client_datetime" => $this->client_datetime,
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
      $sql = "update {$this->tblClient} set ";
      $sql .= "client_name = :client_name, ";
      $sql .= "client_email = :client_email, ";
      $sql .= "client_phone = :client_phone, ";
      $sql .= "client_address = :client_address, ";
      $sql .= "client_created = :client_created, ";
      $sql .= "client_datetime = :client_datetime ";
      $sql .= "where client_aid  = :client_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "client_name" => $this->client_name,
        "client_email" => $this->client_email,
        "client_phone" => $this->client_phone,
        "client_address" => $this->client_address,
        "client_created" => $this->client_created,
        "client_datetime" => $this->client_datetime,
        "client_aid" => $this->client_aid
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function delete()
  {
    try {
      $sql = "delete from {$this->tblClient} ";
      $sql .= "where client_aid = :client_aid ";
      $query = $this->connection->prepare($sql);
      $query->execute([
        "client_aid" => $this->client_aid,
      ]);
    } catch (PDOException $ex) {
      $query = false;
    }
    return $query;
  }

  public function active()
    {
    try {
    $sql = "update {$this->tblClient} set ";
    $sql .= "client_is_active = :client_is_active, ";
    $sql .= "client_datetime = :client_datetime ";
    $sql .= "where client_aid  = :client_aid ";
    $query = $this->connection->prepare($sql);
    $query->execute([
    "client_is_active" => $this->client_is_active,
    "client_datetime" => $this->client_datetime,
    "client_aid" => $this->client_aid,
    ]);
    } catch (PDOException $ex) {
    $query = false;
    }
    return $query;
  }


  public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblClient} ";
            $sql .= "where client_name like :client_name ";
            $sql .= "order by client_is_active desc, ";
            $sql .= "client_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "client_name" => "%{$this->client_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

}