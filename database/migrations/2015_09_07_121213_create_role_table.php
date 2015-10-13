<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::transaction(function () {

            Schema::create('roles', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
            });

            Schema::create('role_users', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->unsignet();
                $table->integer('role_id')->unsignet();

                $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign('role_id')->references('id')->on('roles')->onUpdate('cascade')->onDelete('cascade');;
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
        Schema::drop('role_users');
        Schema::drop('roles');
    }
}
