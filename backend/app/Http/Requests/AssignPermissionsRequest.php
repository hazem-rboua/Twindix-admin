<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignPermissionsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('permissions.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role_id' => 'nullable|exists:roles,id',
            'user_sub_type_id' => 'nullable|exists:user_sub_types,id',
            'permissions' => 'required|array',
            'permissions.*' => 'required|string|exists:permissions,name',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'role_id.exists' => 'The selected role does not exist.',
            'user_sub_type_id.exists' => 'The selected user sub-type does not exist.',
            'permissions.required' => 'At least one permission is required.',
            'permissions.*.exists' => 'One or more selected permissions do not exist.',
        ];
    }
}
