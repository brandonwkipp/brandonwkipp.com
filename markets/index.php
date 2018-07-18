<?php

ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
error_reporting(E_ALL | E_WARNING | E_NOTICE);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Current Values</title>
    <link rel="stylesheet" type="text/CSS" href="style.css"/>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="scripts.js"></script>
    <script src="visibility.js"></script>
    <script src="workers.js"></script>
</head>
<body>
<script>
    updatePrices();
</script>

<div id="container">
    <div class="section">
        <h3 class="title">Silver</h3>
        <p id="silver-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="silver-ounce" type="number" oninput="updateAmount('silver', true)" value="0" min="0"/>
            &nbsp;
            <label for="silver-ounce">oz</span>
        </div>
        <div class="amounts">
            <input id="silver-troy" type="number" oninput="updateAmount('silver', true)" value="0" min="0"/>
            &nbsp;
            <label for="silver-troy">ozt</span>
        </div>
        <div class="amounts">
            <input id="silver-gram" type="number" oninput="updateAmount('silver', true)" value="0" min="0"/>
            &nbsp;
            <label for="silver-gram">g</span>
        </div>
        <p id="silver-value" class="price">$0.00</p>
    </div>
    <div class="section">
        <h3 class="title">Gold</h3>
        <p id="gold-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="gold-ounce" type="number" oninput="updateAmount('gold', true)" value="0" min="0"/>
            &nbsp;
            <label for="gold-ounce">oz</span>
        </div>
        <div class="amounts">
            <input id="gold-troy" type="number" oninput="updateAmount('gold', true)" value="0" min="0"/>
            &nbsp;
            <label for="gold-troy">ozt</span>
        </div>
        <div class="amounts">
            <input id="gold-gram" type="number" oninput="updateAmount('gold', true)" value="0" min="0"/>
            &nbsp;
            <label for="gold-gram">g</span>
        </div>
        <p id="gold-value" class="price">$0.00</p>
    </div>
    <div class="section">
        <h3 class="title">Platinum</h3>
        <p id="platinum-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="platinum-ounce" type="number" oninput="updateAmount('platinum', true)" value="0" min="0"/>
            &nbsp;
            <label for="platinum-ounce">oz</span>
        </div>
        <div class="amounts">
            <input id="platinum-troy" type="number" oninput="updateAmount('platinum', true)" value="0" min="0"/>
            &nbsp;
            <label for="platinum-troy">ozt</span>
        </div>
        <div class="amounts">
            <input id="platinum-gram" type="number" oninput="updateAmount('platinum', true)" value="0" min="0"/>
            &nbsp;
            <label for="platinum-gram">g</span>
        </div>
        <p id="platinum-value" class="price">$0.00</p>
    </div>
    <div class="section">
        <h3 class="title">Palladium</h3>
        <p id="palladium-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="palladium-ounce" type="number" oninput="updateAmount('palladium', true)" value="0" min="0"/>
            &nbsp;
            <label for="palladium-ounce">oz</span>
        </div>
        <div class="amounts">
            <input id="palladium-troy" type="number" oninput="updateAmount('palladium', true)" value="0" min="0"/>
            &nbsp;
            <label for="palladium-troy">ozt</span>
        </div>
        <div class="amounts">
            <input id="palladium-gram" type="number" oninput="updateAmount('palladium', true)" value="0" min="0"/>
            &nbsp;
            <label for="palladium-gram">g</span>
        </div>
        <p id="palladium-value" class="price">$0.00</p>
    </div>
    <hr/>
    <div class="section">
        <h3 class="title">Bitcoin</h3>
        <p id="bitcoin-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="bitcoin-base" type="number" oninput="updateAmount('bitcoin', true)" value="0" min="0"/>
            &nbsp;
            <label for="bitcoin-base">BTC</span>
        </div>
        <div class="amounts">
            <input id="bitcoin-milli" type="number" oninput="updateAmount('bitcoin', true)" value="0" min="0"/>
            &nbsp;
            <label for="bitcoin-milli">mBTC</span>
        </div>
        <div class="amounts">
            <input id="bitcoin-micro" type="number" oninput="updateAmount('bitcoin', true)" value="0" min="0"/>
            &nbsp;
            <label for="bitcoin-micro">&mu;BTC</span>
        </div>
        <p id="bitcoin-value" class="price">$0.00</p>
    </div>
    <div class="section">
        <h3 class="title">Euro</h3>
        <p id="euro-price" class="price">Loading...</p>
        <div class="amounts">
            <input id="euro-base" type="number" oninput="updateAmount('euro', true)" value="0" min="0"/>
            &nbsp;
            <label for="euro-base">&euro;</span>
        </div>
        <p id="euro-value" class="price">$0.00</p>
    </div>
    <div class="section"></div>
    <div class="section"></div>
    <div id="grand-total">
        <h3>Your investment total is:</h3>
        <h1 id="total">$0.00</h1>
    </div>
</div>

</body>
</html>
