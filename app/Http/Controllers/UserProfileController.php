<?php

namespace App\Http\Controllers;

use App\Country;
use App\Question;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserProfileController extends Controller
{

    public function getProfile()
    {
        $user = \Auth::user();

        return view('user.profile', [
            'status' => ['profile' => 'active'],
            'user' => [
                'name'  => $user->name,
                'role'  => $user->getRole(),
                'email' => $user->email,
            ]
        ]);
    }

    public function getQuestions()
    {
        return view('user.questions', [
            'questions' => \Auth::user()->question()->paginate(3),
            'status' => ['questions' => 'active']
        ]);
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
