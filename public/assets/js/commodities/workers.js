var marqueeLoop, ajax, marquee_prices;
var marquee_array = [
    "silver",
    "gold",
    "platinum",
    "palladium",
    "bitcoin",
    "euro"
];

function marquee(index, ajax) {
    function marqueeUpdate()
    {
        switch(index)
        {
            case 0:
                document.title = 'SLV: $' + marquee_prices[index].toFixed(2);
                break;
            case 1:
                document.title = 'GLD: $' + marquee_prices[index].toFixed(2);
                break;
            case 2:
                document.title = 'PLT: $' + marquee_prices[index].toFixed(2);
                break;
            case 3:
                document.title = 'PLD: $' + marquee_prices[index].toFixed(2);
                break;
            case 4:
                document.title = 'BTC: $' + marquee_prices[index].toFixed(2);
                break;
            case 5:
                document.title = 'EUR: $' + marquee_prices[index].toFixed(2);
                break;
            default:
                break;
        }
        marquee_index++;
        if(marquee_index > 5)
        {
            marquee_index = 0;
            marqueeLoop = setTimeout("marquee(marquee_index, 1)", 5000);
        }else
        {
            marqueeLoop = setTimeout("marquee(marquee_index, 0)", 5000);
        }
    }
    if(ajax)
    {
        $.ajax({
            url: "update-prices.php",
        }).done(function(data) {
            marquee_prices = JSON.parse(data);

            if(index == 5)
            {
                updateMarqueePrice();
            }
            marqueeUpdate();
        });
    }else {
        marqueeUpdate();
    }

}
function marquee_reset() {
    marquee_index = 0;
    clearTimeout(marqueeLoop);

    document.title = "Current Values";
}
