<?php

namespace App\Controllers;

use Intersect\AbstractController;
use Intersect\Blog\Services\BlogService;
use Intersect\Database\Model\Model;
use Intersect\Http\Response\TwigResponse;

class BlogController extends AbstractController {

    private $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
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
