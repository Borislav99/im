<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $numOfItems = Item::count();
            $numOfCategories = Category::count();
            $numOfItemsInEachCategory = Category::select('name')->withCount('items')->get();
        } catch(\Throwable $exception) {
            Log::error("Couldn't get data from database. Reason: {$exception}");
            return response()->json(['message' => "Internal Server Error"], 500);
        }
        
        $stats = [
            'itemsCount' => $numOfItems,
            'categoriesCount' => $numOfCategories,
            'itemsInEachCategory' => $numOfItemsInEachCategory
        ];
        
        return response()->json(['data' => $stats], 200);
    }
}
