<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\UpdateRegionRequest;
use App\Models\Country;
use App\Models\Region;
use App\Services\RegionService;
use OpenApi\Attributes as OA;

class RegionController extends Controller
{
    protected $regionService;

    public function __construct(RegionService $regionService)
    {
        $this->regionService = $regionService;
        $this->middleware('auth:sanctum');
    }

    #[OA\Get(
        path: '/api/regions',
        summary: 'List all regions',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 200, description: 'Success'),
            new OA\Response(response: 401, description: 'Unauthenticated')
        ]
    )]
    public function index()
    {
        $this->authorize('regions.read');
        $regions = Region::with(['countries', 'users'])->get();
        
        return response()->json(['success' => true, 'data' => $regions]);
    }

    #[OA\Post(
        path: '/api/regions',
        summary: 'Create new region',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 201, description: 'Created'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function store(StoreRegionRequest $request)
    {
        $region = $this->regionService->createRegion(
            $request->only(['name', 'code', 'description']),
            $request->input('country_ids', [])
        );

        return response()->json(['success' => true, 'data' => $region, 'message' => 'Region created successfully'], 201);
    }

    #[OA\Get(
        path: '/api/regions/{id}',
        summary: 'Get single region',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 200, description: 'Success'),
            new OA\Response(response: 404, description: 'Not found')
        ]
    )]
    public function show(string $id)
    {
        $this->authorize('regions.read');
        $region = $this->regionService->getRegionWithRelations($id);
        
        return response()->json(['success' => true, 'data' => $region]);
    }

    #[OA\Put(
        path: '/api/regions/{id}',
        summary: 'Update region',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 200, description: 'Success'),
            new OA\Response(response: 422, description: 'Validation error')
        ]
    )]
    public function update(UpdateRegionRequest $request, Region $region)
    {
        $region = $this->regionService->updateRegion(
            $region,
            $request->only(['name', 'code', 'description']),
            $request->input('country_ids', [])
        );

        return response()->json(['success' => true, 'data' => $region, 'message' => 'Region updated successfully']);
    }

    #[OA\Delete(
        path: '/api/regions/{id}',
        summary: 'Delete region',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 200, description: 'Success'),
            new OA\Response(response: 403, description: 'Forbidden')
        ]
    )]
    public function destroy(Region $region)
    {
        $this->authorize('regions.delete', $region);
        $this->regionService->deleteRegion($region);
        
        return response()->json(['success' => true, 'message' => 'Region deleted successfully']);
    }

    #[OA\Get(
        path: '/api/countries',
        summary: 'List all countries',
        security: [['bearerAuth' => []]],
        tags: ['Regions'],
        responses: [
            new OA\Response(response: 200, description: 'Success')
        ]
    )]
    public function countries()
    {
        $countries = Country::orderBy('name')->get();
        return response()->json(['success' => true, 'data' => $countries]);
    }
}
