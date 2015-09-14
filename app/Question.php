<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Question
 *
 * @property-read User $users
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
    protected $fillable = ['theme', 'text', 'answer', 'verified'];


    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
