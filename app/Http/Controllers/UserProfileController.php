<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Response;

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
            'questions' => \Auth::user()->questions()->paginate(3),
            'status' => ['questions' => 'active']
        ]);
    }

    public function index()
    {
        return User::with('country')->paginate(10);
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

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return User
     */
    public function update(User $user,Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:2',
//            'email' => "required|email|unique:users,email,$id",
            'email' => "required|email",
            'confirmed' => 'boolean'
        ]);

        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'confirmed' => $request->input('confirmed'),
        ]);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return User
     */
    public function destroy(User $user)
    {
        $user->delete();

        return $user;
    }
}
