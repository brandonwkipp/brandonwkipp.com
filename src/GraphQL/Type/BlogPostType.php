<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

use Intersect\Blog\Models\Post;

class BlogPostType extends ObjectType {

    public function __construct()
    {
        $config = [
            'name' => 'BlogPost',
            'fields' => [
                'author' => [
                    'type' => Type::string(),
                    'description' => 'Author',
                    'resolve' => function(Post $blogPost) {
                        return $blogPost->author_id == 1 ? 'Brandon' : 'Unknown';
                    }
                ],
                'body' => Type::string(),
                'date_created' => Type::string(),
                'id' => Type::id(),
                'meta_data' => [
                    'type' => Type::string(),
                    'description' => 'Blog post meta data',
                    'resolve' => function(Post $blogPost) {
                        return json_encode($blogPost->meta_data);
                    }
                ],
                'slug' => Type::string(),
                'title' => Type::string(),
            ]
        ];

        parent::__construct($config);
    }
}
