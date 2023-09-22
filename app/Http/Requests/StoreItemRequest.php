<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:64', Rule::unique('items')->ignore($this->name)],
            'quantity' => ['required', 'integer'],
            'price' => ['required', 'integer'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['required_with:categories', 'integer', 'exists:categories,id']
        ];
    }
}
