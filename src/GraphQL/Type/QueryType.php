<?php
namespace App\GraphQL\Type;

use App\GraphQL\Types;

use GraphQL\Examples\Blog\AppContext;
use GraphQL\Examples\Blog\Data\DataSource;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;

use Intersect\Blog\Models\Post;
use Intersect\Database\Query\QueryParameters;

class QueryType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'IntersectQuery',
            'fields' => [
                'posts' => [
                    'type' => Types::listOf(Types::BlogPost()),
                    'description' => 'Returns all blog posts',
                    // 'args' => [
                    //     'limit' => Types::nonNull(Types::int())
                    // ]
                ],
                'fieldWithException' => [
                    'type' => Types::string(),
                    'resolve' => function() {
                        throw new \Exception("Exception message thrown in field resolver");
                    }
                ],
            ],
            'resolveField' => function($rootValue, $args, $context, ResolveInfo $info) {
                return $this->{$info->fieldName}($rootValue, $args, $context, $info);
            }
        ];

        parent::__construct($config);
    }

    public function posts() {
        $queryParameters = new QueryParameters();
        $queryParameters->setOrder('date_created DESC');
        $posts = Post::find($queryParameters);

        return $posts;
    }
}
