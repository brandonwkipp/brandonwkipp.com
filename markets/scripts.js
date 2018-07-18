var w, displayLoop;

if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
        w = new Worker("workers.js");
    }
    w.onmessage = function(event) {

    };
} else {
    console.error = "Your browser does not support Web Workers...";
}

var ticker_prices = {
    "silver": null,
    "gold": null,
    "platinum": null,
    "palladium": null,
    "bitcoin": null,
    "euro": null
};

function updatePrices() {
    $.ajax({
        url: "update-prices.php",
    }).done(function(data) {
        var array = JSON.parse(data);
        displayPrices(array);
    });
}
function displayPrices(array) {
    var i = 0;
    //the array always goes: silver, gold, platinum, palladium
    for(var ticker in ticker_prices)
    {
        ticker_prices[ticker] = array[i];

        function price_format(ticker_type, ticker_base)
        {
            switch(ticker_type)
            {
                case "metal":
                    var oz = ticker_base;
                    var troy = oz * 1.09714;
                    var gram = oz * 0.035274;
                    var values = '$' + oz.toFixed(2) + ' oz / $' + troy.toFixed(2) + ' ozt / $' + gram.toFixed(2) + ' g';
                    document.getElementById(ticker + '-price').innerHTML = values;
                    break;
                case "bitcoin":
                    var base = ticker_base;
                    var milli = base/1000;
                    var micro = base/1000000;
                    var values = '$' + base.toFixed(2) + ' BTC / $' + milli.toFixed(3) + ' mBTC / $' + micro.toFixed(6) + ' &mu;BTC';
                    document.getElementById(ticker + '-price').innerHTML = values;
                    break;
                case "euro":
                    var values = '$' + ticker_base.toFixed(2) + ' / 1&euro;';
                    document.getElementById(ticker + '-price').innerHTML = values;
                    break;
                default:
                    break;
            }
        }

        switch(ticker)
        {
            case "silver":
                price_format("metal", ticker_prices[ticker])
                break;
            case "gold":
                price_format("metal", ticker_prices[ticker])
                break;
            case "platinum":
                price_format("metal", ticker_prices[ticker])
                break;
            case "palladium":
                price_format("metal", ticker_prices[ticker])
                break;
            case "bitcoin":
                price_format("bitcoin", ticker_prices[ticker])
                break;
            case "euro":
                price_format("euro", ticker_prices[ticker])
                break;
            default:
                break;
        }

        i++;
    }
    for(var i in ticker_prices)
    {
        //false because we don't want to calculate the grand total every time, just at the end
        updateAmount(i, false);
    }
    grandTotal();

    //update prices every 30 seconds
    displayLoop = setTimeout(updatePrices, 30000);
}
function updateAmount(ticker, bool) {
    if(ticker == "silver" || ticker == "gold" || ticker == "platinum" || ticker == "palladium")
    {
        var oz = parseFloat(document.getElementById(ticker + '-ounce').value);
        var troy = parseFloat(document.getElementById(ticker + '-troy').value) * 1.09714;
        var gram = parseFloat(document.getElementById(ticker + '-gram').value) * 0.035274;

        if(isNaN(oz)) { oz = 0; }
        if(isNaN(troy)) { troy = 0; }
        if(isNaN(gram)) { gram = 0; }

        var value = '$' + ((oz + troy + gram) * ticker_prices[ticker]).toFixed(2);
    }else if(ticker == "bitcoin")
    {
        var base = parseFloat(document.getElementById(ticker + '-base').value);
        var milli = parseFloat(document.getElementById(ticker + '-milli').value)/1000;
        var micro = parseFloat(document.getElementById(ticker + '-micro').value)/1000000;

        if(isNaN(base)) { base = 0; }
        if(isNaN(milli)) { milli = 0; }
        if(isNaN(micro)) { micro = 0; }

        var value = '$' + ((base + milli + micro) * ticker_prices[ticker]).toFixed(2);
    }else if(ticker == "euro")
    {
        var base = parseFloat(document.getElementById(ticker + '-base').value);

        if(isNaN(base)) { base = 0; }
        var value = '$' + (base * ticker_prices[ticker]).toFixed(2);
    }
    document.getElementById(ticker + '-value').innerHTML = value;

    if(bool) grandTotal();
}
function grandTotal() {
    var total = 0;
    for(var metal in ticker_prices)
    {
        total += parseFloat(document.getElementById(metal + '-value').innerHTML.replace('$',''));
    }
    document.getElementById('total').innerHTML = '$' + total.toFixed(2);
}
