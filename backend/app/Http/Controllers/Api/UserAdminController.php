<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use OpenApi\Attributes as OA;

class UserAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    #[OA\Get(
        path: '/api/super-admins',
        summary: 'List super admins',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function index()
    {
        $this->authorize('super-admins.read');
        $superAdmins = User::with(['region', 'userType', 'userSubType', 'subordinates'])
            ->byRole('Super Admin')->get();
        return response()->json(['success' => true, 'data' => $superAdmins]);
    }

    #[OA\Post(
        path: '/api/super-admins',
        summary: 'Create super admin',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 201, description: 'Created')]
    )]
    public function store(Request $request)
    {
        $this->authorize('super-admins.create');
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'region_id' => 'nullable|exists:regions,id',
            'user_type_id' => 'nullable|exists:user_types,id',
            'user_sub_type_id' => 'nullable|exists:user_sub_types,id',
        ]);

        $user = User::create([
            ...$request->only(['name', 'email', 'region_id', 'user_type_id', 'user_sub_type_id']),
            'password' => Hash::make($request->password),
            'status' => 'active',
        ]);
        $user->assignRole('Super Admin');
        
        activity()->performedOn($user)->log('created super admin');
        return response()->json(['success' => true, 'data' => $user], 201);
    }

    #[OA\Get(
        path: '/api/super-admins/{id}',
        summary: 'Get super admin',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function show(User $user)
    {
        $this->authorize('super-admins.read');
        $user->load(['region', 'userType', 'userSubType', 'subordinates']);
        return response()->json(['success' => true, 'data' => $user]);
    }

    #[OA\Put(
        path: '/api/super-admins/{id}',
        summary: 'Update super admin',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function update(Request $request, User $user)
    {
        $this->authorize('super-admins.update');
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'region_id' => 'nullable|exists:regions,id',
        ]);

        $user->update($request->only(['name', 'email', 'region_id']));
        return response()->json(['success' => true, 'data' => $user]);
    }

    #[OA\Delete(
        path: '/api/super-admins/{id}',
        summary: 'Delete super admin',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function destroy(User $user)
    {
        $this->authorize('super-admins.delete');
        activity()->performedOn($user)->log('deleted super admin');
        $user->delete();
        return response()->json(['success' => true, 'message' => 'Super admin deleted']);
    }

    #[OA\Post(
        path: '/api/super-admins/{id}/pause',
        summary: 'Pause account',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function pause(User $user)
    {
        $this->authorize('super-admins.pause');
        $user->update(['status' => 'paused']);
        activity()->performedOn($user)->log('paused account');
        return response()->json(['success' => true, 'message' => 'Account paused']);
    }

    #[OA\Post(
        path: '/api/super-admins/{id}/resume',
        summary: 'Resume account',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 200, description: 'Success')]
    )]
    public function resume(User $user)
    {
        $this->authorize('super-admins.resume');
        $user->update(['status' => 'active']);
        activity()->performedOn($user)->log('resumed account');
        return response()->json(['success' => true, 'message' => 'Account resumed']);
    }

    #[OA\Post(
        path: '/api/admins',
        summary: 'Create admin under super admin',
        security: [['bearerAuth' => []]],
        tags: ['Super Admins'],
        responses: [new OA\Response(response: 201, description: 'Created')]
    )]
    public function storeAdmin(Request $request)
    {
        $this->authorize('super-admins.create');
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'managed_by' => 'required|exists:users,id',
            'region_id' => 'nullable|exists:regions,id',
        ]);

        $admin = User::create([
            ...$request->only(['name', 'email', 'managed_by', 'region_id']),
            'password' => Hash::make($request->password),
            'status' => 'active',
        ]);
        $admin->assignRole('Admin');
        
        activity()->performedOn($admin)->log('created admin');
        return response()->json(['success' => true, 'data' => $admin], 201);
    }
}
