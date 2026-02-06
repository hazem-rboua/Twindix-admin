<?php

namespace App\Services;

use App\Models\Region;
use Illuminate\Support\Facades\DB;

class RegionService
{
    /**
     * Create a new region with countries.
     */
    public function createRegion(array $data, array $countryIds): Region
    {
        return DB::transaction(function () use ($data, $countryIds) {
            $region = Region::create([
                'name' => $data['name'],
                'code' => $data['code'],
                'description' => $data['description'] ?? null,
            ]);

            if (!empty($countryIds)) {
                $region->countries()->attach($countryIds);
            }

            // Log activity
            activity()
                ->performedOn($region)
                ->withProperties([
                    'name' => $region->name,
                    'code' => $region->code,
                    'countries' => $countryIds,
                ])
                ->log('created region');

            return $region->load('countries');
        });
    }

    /**
     * Update a region with countries.
     */
    public function updateRegion(Region $region, array $data, array $countryIds): Region
    {
        return DB::transaction(function () use ($region, $data, $countryIds) {
            $oldData = [
                'name' => $region->name,
                'code' => $region->code,
                'countries' => $region->countries->pluck('id')->toArray(),
            ];

            $region->update([
                'name' => $data['name'],
                'code' => $data['code'],
                'description' => $data['description'] ?? null,
            ]);

            $region->countries()->sync($countryIds);

            // Log activity
            activity()
                ->performedOn($region)
                ->withProperties([
                    'old' => $oldData,
                    'new' => [
                        'name' => $region->name,
                        'code' => $region->code,
                        'countries' => $countryIds,
                    ],
                ])
                ->log('updated region');

            return $region->fresh(['countries']);
        });
    }

    /**
     * Get a region with all its relations.
     */
    public function getRegionWithRelations(int $id): Region
    {
        return Region::with(['countries', 'users', 'superAdmins'])->findOrFail($id);
    }

    /**
     * Delete a region.
     */
    public function deleteRegion(Region $region): void
    {
        activity()
            ->performedOn($region)
            ->withProperties([
                'name' => $region->name,
                'code' => $region->code,
            ])
            ->log('deleted region');

        $region->delete();
    }
}
