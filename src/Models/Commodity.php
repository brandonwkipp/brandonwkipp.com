<?php

namespace App\Models;

use Intersect\Database\Model\Model;

class Commodity extends Model {

    const URL_LIST = [
        "https://www.bloomberg.com/markets/chart/data/1D/XAGUSD:CUR",
        "https://www.bloomberg.com/markets/chart/data/1D/XAUUSD:CUR",
        "https://www.bloomberg.com/markets/chart/data/1D/XPTUSD:CUR",
        "https://www.bloomberg.com/markets/chart/data/1D/XPDUSD:CUR",
        "http://api.coindesk.com/v1/bpi/currentprice.json",
        "https://www.bloomberg.com/markets/chart/data/1D/EURUSD:CUR"
    ];

    public function getURLData($url)
    {
        //Initiate curl
        $ch = curl_init();
        //Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        //Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //Set the url
        curl_setopt($ch, CURLOPT_URL, $url);
        //Execute
        $result = curl_exec($ch);
        //Closing
        curl_close($ch);

        $commodity = json_decode($result, true);

        var_dump($url);

        return self::getBasePrice($commodity);
    }

    public function getBasePrice($data)
    {
        var_dump($data);
        //checks if we need to scrape bloomberg vs. coinbase json schema
        if (!$data["bpi"])
        {
            //data_values is the array containing the chart prices of the entire day from bloomberg
            //values are in chronological order up until the present, so we need the last element
            return end($data["data_values"])[1];
        }
        else
        {
            return $data["bpi"]["USD"]["rate_float"];
        }
    }

    public function getPrices()
    {
        $commodities = array();
        foreach (self::URL_LIST as $url)
        {
            array_push($commodities, self::getURLData($url));
        }

        return $commodities;
    }
}
