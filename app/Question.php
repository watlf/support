<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Question
 *
 * @property-read User $users
 * @property-read User $user
 */
class Question extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'questions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['theme', 'text', 'answer', 'verified', 'user_id'];

    protected $visible = ['user', 'theme', 'text', 'answer', 'verified', 'created_at', 'id'];

    //protected $appends = ['user']; //if we want always append getUserAttribute


    public function user()
    {
        return $this->belongsTo(User::class)->with('country');
    }

    public function getUserAttribute()
    {
        return $this->user()->with('country')->getResults();
    }
}
