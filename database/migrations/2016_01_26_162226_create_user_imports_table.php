<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_imports', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname', 255);
            $table->string('lastname', 255);
            $table->string('email', 255);
            $table->string('country', 255)->nullable();
            $table->string('city', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->enum('status', ['active', 'suspended', 'disabled']);
            $table->string('password', 255);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_imports');
    }
}
