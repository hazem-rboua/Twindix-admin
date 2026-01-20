<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('managed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('region_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_type_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_sub_type_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['active', 'paused'])->default('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['managed_by']);
            $table->dropForeign(['region_id']);
            $table->dropForeign(['user_type_id']);
            $table->dropForeign(['user_sub_type_id']);
            $table->dropColumn(['managed_by', 'region_id', 'user_type_id', 'user_sub_type_id', 'status']);
        });
    }
};
