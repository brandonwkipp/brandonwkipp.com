<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Http\Response\TwigResponse;

use App\Models\Commodity;

class CommodityController extends AbstractController {

    public function index()
    {
        return new TwigResponse('commodities.twig', [

        ]);
    }
}
