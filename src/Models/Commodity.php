<?php

namespace App\Models;

use Intersect\Database\Model\Model;

class Commodity extends Model {

    public function getURLData($url)
    {
        //Initiate curl
        $ch = curl_init();
        //Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        //Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //Set the url
        curl_setopt($ch, CURLOPT_URL,$url);
        //Execute
        $result = curl_exec($ch);
        //Closing
        curl_close($ch);

        $metal = json_decode($result, true);

        return $this->getBasePrice($metal);
    }

    public function getBasePrice($data)
    {
        //the base price is $USD/oz
        $metal_data = $data["data_values"];
        $price = end($metal_data)[1];

        return $price;
    }
}
