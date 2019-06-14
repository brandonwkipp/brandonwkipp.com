<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Database\Model\Model;
use Intersect\Http\Response\TwigResponse;

use App\Models\SiteLanguage;

class IndexController extends AbstractController {

    public function index()
    {
        $language['bio'] = SiteLanguage::BIO;

        return new TwigResponse('index.twig', [
            'blogs' => array(),
            'language' => $language
        ]);
    }

    public function getRepo($repo)
    {
        if (isset($repo) && !empty(trim($repo)))
        {
            $string = filter_var(trim($repo), FILTER_SANITIZE_STRING);
            echo shell_exec("touch /var/www/repos/" . $string);
        }
    }

    public function displayTime()
    {
        return new TwigResponse('time.twig', [
        ]);
    }
}
