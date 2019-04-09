<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Blog\Models\Post;
use Intersect\Blog\Services\BlogService;
use Intersect\Database\Model\Model;
use Intersect\Database\Query\QueryParameters;
use Intersect\Http\Response\JsonResponse;
use Intersect\Http\Response\TwigResponse;

class BlogController extends AbstractController {

    private $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function createPost()
    {
        $request = $this->getRequest();

        $id = filter_var(trim($request->data('id')), FILTER_SANITIZE_NUMBER_INT);
        if (is_null($id))
        {
            return 'Id is null.';
        }

        $title = filter_var(trim($request->data('title')), FILTER_SANITIZE_STRING);
        if (is_null($title) || empty($title))
        {
            return 'title is null';
        }

        $body = trim($request->data('body'));
        if (is_null($body) || empty($body))
        {
    		return 'body is empty';
        }

        $preview = filter_var(trim($request->data('preview'), FILTER_SANITIZE_STRING));
        if (is_null($preview) || empty($preview))
        {
    		return 'preview is empty';
        }

        $post = new Post();
        $post->title = $title;
        $post->body = $body;
        $post->author_id = 1;
        $post->addMetaData('preview', $preview);

        $operation = ($id === '0') ? $this->blogService->createPost($post, array()) : $this->blogService->updatePost($post, $id);
        if (is_null($operation) || $operation instanceof Post)
        {
            return new JsonResponse([
                'error' => false,
                'success' => true,
            ]);
        }
    }

    public function display()
    {
        $queryParameters = new QueryParameters();
        $queryParameters->setOrder('date_created DESC');
        $posts = Post::find($queryParameters);

        return new TwigResponse('blog.twig', [
            'posts' => $posts,
        ]);
    }

    public function editor()
    {
        return new TwigResponse('blog-editor.twig', [

        ]);
    }
}
