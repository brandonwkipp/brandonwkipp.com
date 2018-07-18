<?php

class Ticker {
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

        return $this->getBasePrice(json_decode($result, true));
    }
    public function getBasePrice($data)
    {
        //checks if we need to scrape bloomberg vs. coinbase json schema
        if(!$data["bpi"])
        {
            //data_values is the array containing the chart prices of the entire day from bloomberg
            //values are in chronological order up until the present, so we need the last element
            return end($data["data_values"])[1];
        }else
        {
            return $data["bpi"]["USD"]["rate_float"];
        }
    }
}

 ?>
