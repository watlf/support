<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {
            DB::table('roles')->insert([
                ['name' => 'admin'],
                ['name' => 'user'],
            ]);

            $user = App\User::firstOrCreate(['name' => 'admin']);

            $role_admin = App\Role::where('name', '=', 'admin')->firstOrFail();

            $user->roles()->save($role_admin);
        });
    }
}
