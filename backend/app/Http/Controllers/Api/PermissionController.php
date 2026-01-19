<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignPermissionsRequest;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PermissionController extends Controller
{
    protected $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
        $this->middleware('auth:sanctum');
    }

    #[OA\Get(
        path: '/api/permissions',
        summary: 'Get permissions by role, type, and subtype',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        parameters: [
            new OA\Parameter(name: 'role_id', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'user_type_id', in: 'query', required: false, schema: new OA\Schema(type: 'integer')),
            new OA\Parameter(name: 'user_sub_type_id', in: 'query', required: false, schema: new OA\Schema(type: 'integer'))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Permissions retrieved successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'success', type: 'boolean'),
                        new OA\Property(
                            property: 'data',
                            properties: [
                                new OA\Property(property: 'role_permissions', type: 'array', items: new OA\Items(type: 'string')),
                                new OA\Property(property: 'subtype_permissions', type: 'array', items: new OA\Items(type: 'string')),
                                new OA\Property(property: 'available_permissions', type: 'array', items: new OA\Items())
                            ],
                            type: 'object'
                        )
                    ]
                )
            )
        ]
    )]
    public function index(Request $request)
    {
        $this->authorize('permissions.read');

        $permissions = $this->permissionService->getPermissionsByRoleTypeSubtype(
            $request->get('role_id'),
            $request->get('user_type_id'),
            $request->get('user_sub_type_id')
        );

        return response()->json([
            'success' => true,
            'data' => $permissions,
        ]);
    }

    #[OA\Get(
        path: '/api/permissions/groups',
        summary: 'Get all permissions grouped by category',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Grouped permissions retrieved successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'success', type: 'boolean'),
                        new OA\Property(property: 'data', type: 'array', items: new OA\Items())
                    ]
                )
            )
        ]
    )]
    public function groups()
    {
        $this->authorize('permissions.read');

        $groups = $this->permissionService->getGroupedPermissions();

        return response()->json([
            'success' => true,
            'data' => $groups,
        ]);
    }

    #[OA\Put(
        path: '/api/permissions/assign',
        summary: 'Assign permissions to role and/or subtype',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'role_id', type: 'integer', example: 1),
                    new OA\Property(property: 'user_sub_type_id', type: 'integer', example: 1),
                    new OA\Property(
                        property: 'permissions',
                        type: 'array',
                        items: new OA\Items(type: 'string'),
                        example: ['users.read', 'users.create', 'regions.read']
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Permissions assigned successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'success', type: 'boolean'),
                        new OA\Property(property: 'message', type: 'string')
                    ]
                )
            ),
            new OA\Response(response: 403, description: 'Unauthorized'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function assign(AssignPermissionsRequest $request)
    {
        $this->permissionService->assignPermissions(
            $request->get('role_id'),
            $request->get('user_sub_type_id'),
            $request->get('permissions')
        );

        return response()->json([
            'success' => true,
            'message' => 'Permissions assigned successfully',
        ]);
    }
}
