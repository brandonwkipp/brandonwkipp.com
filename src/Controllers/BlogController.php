<?php

namespace App\Controllers;

use Intersect\Controllers\AbstractController;
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
            'posts' => $this->blogService->getAllPosts(),
        ]);
    }

    public function postById($id)
    {
        $id = filter_var(trim($id), FILTER_SANITIZE_NUMBER_INT);
        if (is_null($id))
        {
            return new JsonResponse([
                'error' => 'Id required',
                'success' => false,
            ]);
        }

        $post = $this->blogService->getPostById($id);
        $tags = $this->blogService->getAllTagsForPostId($post->getPrimaryKeyValue());

        $attributes = [
            'body' => $post->body,
            'preview' => $post->getMetaDataByKey('preview'),
            'tags' => implode(' ', $tags),
            'title' => $post->title,
        ];

        return new JsonResponse([
            'error' => '',
            'payload' => $attributes,
            'success' => true,
        ]);
    }

    public function submitPost()
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
}
