<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Database\Model\Model;
use Intersect\Http\Response\TwigResponse;

use App\Models\SiteLanguage;

class IndexController extends AbstractController {

    public function index()
    {
        // require_once 'security.php';
        //
        // $blogs = [];
        // $sql = "SELECT * FROM blogs";
        //
        // if ($result->num_rows > 0)
        // {
        //     foreach($result as $row)
        //     {
        //         $date = $row['date'];
        //         $id = $row['id'];
        //         $images = $row['images'];
        //         $links = $row['links'];
        //         $text = $row['text'];
        //         $title = $row['title'];
        //
        //         $row_array = array('date'=>$date,'id'=>$id,'images'=>$images,'links'=>$links,'text'=>$text,'title'=>$title);
        //         array_push($blogs, $row_array);
        //     }
        // }

        $language['bio'] = SiteLanguage::BIO;

        return new TwigResponse('index.twig', [
            'blogs' => array(),
            'language' => $language
        ]);
    }

    public function product()
    {
        $language['bio'] = SiteLanguage::BIO;

        return new TwigResponse('product.twig', [
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
}
