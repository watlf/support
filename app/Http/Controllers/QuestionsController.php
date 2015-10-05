<?php

namespace App\Http\Controllers;

use App\Question;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class QuestionsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return Response
     */
    public function create(Request $request, User $user)
    {
        $this->validate($request,[
            'theme' => 'required|min:6',
            'text' => 'required|min:10',
            'g-recaptcha-response' => 'required|captcha',
        ], [
            'g-recaptcha-response.required' => 'The captcha is required',
            'g-recaptcha-response.captcha' => 'It\'s not so simple, bu-ga-ga.'
        ]);

        $question = new Question([
            'theme' => $request->input('theme'),
            'text' => $request->input('text'),
        ]);

        $question->user_id = $user->getAttribute('id');

        $question->save();

        return response('', 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
