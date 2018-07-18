<?php

namespace Models;

abstract class Database {

    protected $instance = null;
    protected $query;
    protected $results;
    protected $insertId;
    protected $error;

    abstract public function __construct($host, $username, $password, $db, $port = '3306');
    abstract public function filterParameter($parameter);
    abstract public function query($sql);

    public function getError() { return $this->error; }
    public function getInsertId() { return $this->insertId; }
    public function getInstance() { return $this->instance; }
    public function getResults() { return $this->results; }

    public function getFirstResult()
    {
        if (!is_null($this->results) && is_array($this->results) && count($this->results) > 0)
        {
            return $this->results[0];
        }

        return null;
    }

}