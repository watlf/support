<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\View
 *
 * @property-read User $users
 * @property-read Question $questions
 */
class View extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'views';

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->belongsTo(Question::class);
    }
}
