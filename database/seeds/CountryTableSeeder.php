<?php

use Illuminate\Database\Seeder;

class CountryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {
            DB::table('countries')->insert([
                ['name' => 'Ukraine'],
                ['name' => 'Poland'],
            ]);

            $user = App\User::firstOrCreate(['name' => 'admin']);

            $country = App\Country::where('name', '=', 'Ukraine')->firstOrFail();

            $user->countries()->save($country);
        });
    }
}
