<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {   
 
        $last_posts = Post::with('images')->latest()->first();
        return Inertia::render('menu', [
            'last_post' => $last_posts,
            'limit' => Post::with('images')->orderByDesc('id')->offset(1)->limit(4)->get()
        ]);
    }

    public function detail_post(Post $post)
    {
        $posdetail = Post::with('images','user')->where('slug', $post['slug'])->first();
       return Inertia::render('detail_post', [
           'post' => $posdetail,
            'limit' => Post::with('images')->where('slug','!=',$post->slug)->orderByDesc('id')->limit(4)->get()
       ]);
    }
}
