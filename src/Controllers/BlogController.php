<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Blog\Models\Post;
use Intersect\Blog\Services\BlogService;
use Intersect\Database\Model\Model;
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

        if ($id === '0')
        {
            $createdPost = $this->blogService->createPost($post, array());
            if (is_null($createdPost) || $createdPost instanceof Post)
            {
                return new JsonResponse([
                    'error' => false,
                    'success' => true,
                ]);
            }
        }
        else
        {
            //$this->blogService->updatePost($post, $id);
        }
    }

    public function display()
    {
        $posts = array();
        //$json = json_decode(file_get_contents('../blog.json'));
        $posts = Post::find();

        /*foreach ($json->blogs as $post)
        {
            $posts[] = $post;
        }*/

        return new TwigResponse('blog.twig', [
            'posts' => $posts,
        ]);
    }

    public function displayRecentPosts()
    {
        $posts = $this->blogService->getLatestPosts();

        return $this->view('blog/post-list.twig', [
            'posts' => $posts
        ]);
    }

    public function displayPosts()
    {
        $posts = $this->blogService->getLatestPosts();

        return $this->view('blog/main.twig', [
            'posts' => $posts
        ]);
    }

    public function editor()
    {
        return new TwigResponse('blog-editor.twig', [

        ]);
    }

    public function postDetailsById($id)
    {
        $post = $this->blogService->getPostById($id);
        $tags = $this->blogService->getAllTagsForPostId($post->getPrimaryKeyValue());

        $attributes = [
            'body' => $post->body,
            'preview' => $post->getMetaDataByKey('preview'),
            'publishToMedium' => $post->getMetaDataByKey('publishToMedium'),
            'publishToRT' => $post->getMetaDataByKey('publishToRT'),
            'tags' => implode(' ', $tags),
            'title' => $post->title,
        ];

        echo json_encode($attributes);
    }

    public function postDetailsBySlug($slug)
    {
        $post = $this->blogService->getPostBySlug($slug);
        $tags = $this->blogService->getAllTagsForPostId($post->getPrimaryKeyValue());

        return $this->view('blog/post-details.twig', [
            'post' => $post,
            'tags' => $tags,
            'showHeader' => false
        ]);
    }

    public function postListByTag($name)
    {
        $posts = $this->blogService->getAllPostsWithTagName($name);

        return $this->view('blog/post-list.twig', [
            'posts' => $posts,
            'showHeader' => false
        ]);
    }

    public function postListByCategory($slug)
    {
        $category = $this->blogService->getCategoryBySlug($slug);
        $posts = $this->blogService->getAllPostsInCategoryId($category->getPrimaryKeyValue());

        return $this->view('blog/post-list.twig', [
            'posts' => $posts,
            'showHeader' => false
        ]);
    }

    protected function view($viewFile, $data = [])
    {
        $additionalBlogData = [];

        $additionalBlogData['showHeader'] = true;
        $additionalBlogData['categories'] = $this->blogService->getAllCategories();
        $additionalBlogData['tags'] = $this->blogService->getAllTags();

        return parent::view($viewFile, array_merge($additionalBlogData, $data));
    }
}
