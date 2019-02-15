<?php

namespace Models;

class MySQLiDatabase extends Database {

    public function __construct($host, $username, $password, $db, $port = '3306')
    {
        $this->instance = new \mysqli($host, $username, $password, $db, $port);
    }

    public function filterParameter($parameter)
    {
        return $this->instance->real_escape_string($parameter);
    }

    public function query($sql)
    {
        $this->insertId = null;
        $this->results = null;
        $this->query = $sql;

        $result = $this->instance->query($sql);

        if (!is_bool($result))
        {
            if ($result !== false && $result->num_rows > 0)
            {
                $this->results = $this->buildResultSet($result);
                $result->close();
            }else
            {
                $this->results = null;
            }
        }
        else
        {
            $this->results = $this->instance->affected_rows;
            $this->insertId = $this->instance->insert_id;
        }

        return $this;
    }

    public function getError()
    {
        return $this->getInstance()->error;
    }

    private function buildResultSet($result)
    {
        $resultSet = array();
        while ($row = $result->fetch_assoc())
        {
            $resultSet[] = $row;
        }
        return $resultSet;
    }

}
