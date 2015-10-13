<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|Role[] $roles
 * @property-read \Illuminate\Database\Eloquent\Collection|Country[] $country
 * @property-read \Illuminate\Database\Eloquent\Collection|Question[] $questions
 */
class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'email', 'password', 'confirmed', 'confirmation_code'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * The role that belong to many the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_users');
    }

    /**
     * The country that belong to many the user.
     */
    public function country()
    {
       return $this->belongsToMany(Country::class, 'country_users');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function getRole()
    {
        $roles = $this->roles()->first();

        return array_get($roles, 'name');
    }

    public function hasRole($role)
    {
        $roles = $this->roles()->first();

        return (array_get($roles, 'name') === $role);
    }

    public function getCountry()
    {
        $country = $this->country()->first();

        return array_get($country, 'name');
    }
}
