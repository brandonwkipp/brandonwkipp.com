<?php

namespace App\Controllers;

use App\GraphQL\Types;

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use Intersect\Controllers\AbstractController;
use Intersect\Http\Response\JsonResponse;

class GraphQLController extends AbstractController {

    public function graphql()
    {
        try {
            // See docs on schema options:
            // http://webonyx.github.io/graphql-php/type-system/schema/#configuration-options
            $schema = new Schema([
                'query' => Types::query(),
            ]);

            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = isset($input['variables']) ? $input['variables'] : null;
            $result = GraphQL::executeQuery($schema, $query, null, $variableValues);
            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage()
                ]
            ];
        }

        return new JsonResponse($output);
    }
}
