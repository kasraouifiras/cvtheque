<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $table = 'candidates';


    protected $fillable = [
        'first_name', 'last_name','email','phone','cv_path'
    ];

    protected $attributes = [
        'cv_path' => "",
    ];
}
