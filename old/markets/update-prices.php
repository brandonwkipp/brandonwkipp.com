<?php

require_once "curl.php";

$tickers = [];

//silver, gold, platinum, palladium, bitcoin, euro
$url = [
    "https://www.bloomberg.com/markets/chart/data/1D/XAGUSD:CUR",
    "https://www.bloomberg.com/markets/chart/data/1D/XAUUSD:CUR",
    "https://www.bloomberg.com/markets/chart/data/1D/XPTUSD:CUR",
    "https://www.bloomberg.com/markets/chart/data/1D/XPDUSD:CUR",
    "http://api.coindesk.com/v1/bpi/currentprice.json",
    "https://www.bloomberg.com/markets/chart/data/1D/EURUSD:CUR"
];

$ticker = new Ticker();

foreach($url as $ticker_url)
{
    //puts final metal price into array
    array_push($tickers, $ticker->getURLData($ticker_url));
}

//returns all metal prices
echo json_encode($tickers);

?>
