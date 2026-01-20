<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserType;
use App\Models\UserSubType;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class UserTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    #[OA\Get(
        path: '/api/user-types',
        summary: 'List types with subtypes',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function index()
    {
        $this->authorize('types.read');
        $types = UserType::with(['subTypes.permissions'])->get();
        return response()->json(['success' => true, 'data' => $types]);
    }

    #[OA\Post(
        path: '/api/user-types',
        summary: 'Create type',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 201, description: 'Created')]
    )]
    public function store(Request $request)
    {
        $this->authorize('types.create');
        $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        
        $type = UserType::create($request->only(['name', 'description']));
        activity()->performedOn($type)->log('created user type');
        
        return response()->json(['success' => true, 'data' => $type], 201);
    }

    #[OA\Put(
        path: '/api/user-types/{id}',
        summary: 'Update type',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function update(Request $request, UserType $userType)
    {
        $this->authorize('types.update');
        $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        
        $userType->update($request->only(['name', 'description']));
        return response()->json(['success' => true, 'data' => $userType]);
    }

    #[OA\Delete(
        path: '/api/user-types/{id}',
        summary: 'Delete type',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function destroy(UserType $userType)
    {
        $this->authorize('types.delete');
        $userType->delete();
        return response()->json(['success' => true, 'message' => 'Type deleted']);
    }

    #[OA\Post(
        path: '/api/user-types/{id}/sub-types',
        summary: 'Create subtype',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 201, description: 'Created')]
    )]
    public function storeSubType(Request $request, UserType $userType)
    {
        $this->authorize('types.create');
        $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        
        $subType = $userType->subTypes()->create($request->only(['name', 'description']));
        activity()->performedOn($subType)->log('created user subtype');
        
        return response()->json(['success' => true, 'data' => $subType], 201);
    }

    #[OA\Put(
        path: '/api/user-sub-types/{id}',
        summary: 'Update subtype',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function updateSubType(Request $request, UserSubType $userSubType)
    {
        $this->authorize('types.update');
        $request->validate(['name' => 'required|string', 'description' => 'nullable|string']);
        
        $userSubType->update($request->only(['name', 'description']));
        return response()->json(['success' => true, 'data' => $userSubType]);
    }

    #[OA\Delete(
        path: '/api/user-sub-types/{id}',
        summary: 'Delete subtype',
        security: [['bearerAuth' => []]],
        tags: ['Types'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function destroySubType(UserSubType $userSubType)
    {
        $this->authorize('types.delete');
        $userSubType->delete();
        return response()->json(['success' => true, 'message' => 'Subtype deleted']);
    }
}
