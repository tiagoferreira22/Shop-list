<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Auth::user()->products()->get()->toArray();
        return Inertia::render('dashboard', ["products" => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|min:3|max:255',
                'type' => 'required|in:alimentício,limpeza,higiene pessoal,beleza,utensílios',
                'amount' => 'required|integer|min:1',
                'status' => 'required|in:comprando,comprado'
            ]);

            $product = Auth::user()->products()->create($validated);

            $request->session()->put('debug_flash', 'Mensagem de teste');
            Log::debug('Produto criado, enviando flash message');

            return redirect()->back()->with('success', 'Produto adicionado com sucesso!');
        }catch (\Exception $e) {
            return back()->with('error', 'Erro ao criar produto: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:alimentício,limpeza,higiene pessoal,beleza,utensílios',
            'status' => 'required|in:comprando,comprado',
            'amount' => 'required|integer|min:1',
        ]);

        $product->update($validated);

        return back()->with([
            'success'=> 'Produto atualizado com sucesso!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Verifica se o produto pertence ao usuário logado
            if ($product->user_id !== Auth::user()->id) {
                abort(403, 'Ação não autorizada');
            }

            $product->delete();

            return redirect()->back()->with([
                'success'=> 'Produto excluído com sucesso!',
                'products' => Auth::user()->products()->get()
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Erro ao excluir produto: ' . $e->getMessage());
        }
    }
}
