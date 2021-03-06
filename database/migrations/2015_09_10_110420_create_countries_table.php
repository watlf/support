<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::transaction(function () {

            Schema::create('countries', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->unique();
            });

            Schema::create('country_users', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->unsignet();
                $table->integer('country_id')->unsignet();

                $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign('country_id')->references('id')->on('countries')->onUpdate('cascade')->onDelete('cascade');;
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('country_users');
        Schema::drop('countries');
    }
}
