<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ItemResource::collection(Item::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $item = Item::create([
            'name' => $request->validated('name'),
            'quantity' => $request->validated('quantity'),
            'price' => $request->validated('price'),
        ]);

        if (isset($request->categories)) {
            $item->categories()->attach($request->categories);
        }

        return ItemResource::make($item);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return ItemResource::make($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreItemRequest $request, Item $item)
    {
        $item->update([
            'name' => $request->validated('name'),
            'quantity' => $request->validated('quantity'),
            'price' => $request->validated('price'),
        ]);

        if (isset($request->categories)) {
            $item->categories()->sync($request->categories);
        }

        return response()->json(ItemResource::make($item), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->categories()->detach();
        $item->delete();

        return response()->json([
            'name' => $item->name,
        ]);
    }
}
