<?php

namespace App\Http\Controllers;

use App\Question;
use App\User;
use App\View;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //TODO  need refactor

        $countryId = Auth::user()->getCountryId();

        $popularity = \DB::table('questions')
            ->select(\DB::raw('count(*) as count, questions.id, questions.theme, questions.text'))
            ->join('users', 'users.id', '=', 'questions.user_id')
            ->join('country_users', 'country_users.user_id', '=', 'users.id')
            ->join('views', 'views.question_id', '=', 'questions.id')
            ->where('country_users.country_id', '=', $countryId)
            ->groupBy('questions.id', 'questions.theme', 'questions.text')
            ->orderBy('count', 'desc')
            ->limit(5)->get();

        return view('welcome', [
            'popularity' => $popularity,
            'questions'  => Question::orderBy('updated_at', 'desc')->verified()->answered()->paginate(5)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  Question $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        if (\Auth::check()) {
            View::create([
                'question_id' => $question->id,
                'user_id' => \Auth::user()->id
            ]);
        }

        return $question;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
