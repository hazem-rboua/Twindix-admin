<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('regions.create');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:regions,code',
            'description' => 'nullable|string',
            'country_ids' => 'required|array',
            'country_ids.*' => 'exists:countries,id',
        ];
    }
}
