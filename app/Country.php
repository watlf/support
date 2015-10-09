<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Country
 *
 * @property-read User $users
 */
class Country extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'countries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'id'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function users()
    {
       return $this->belongsToMany(User::class);
    }
}
