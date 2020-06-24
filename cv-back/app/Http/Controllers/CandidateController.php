<?php

namespace App\Http\Controllers;

use App\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;
class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $candidates =  Candidate::all()->sortByDesc('created_at')->values()->all();
        return response(['message'=>'candidates retrieved','data'=>$candidates],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($request->all(),[
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'phone' => 'required|size:8',
            'email' => 'required|unique:candidates|email',
            'cv_file' => 'sometimes|mimes:doc,pdf,docx|max:1000',
        ]);

        if($validator->fails()){
            return response(['errors'=>$validator->errors(),'message'=>"data not valid"],400);
        }
        if($request->hasFile('cv_file')){
            $file = $request->file('cv_file');
            $file_name = 'cv-file-'.uniqid().'.'.$file->getClientOriginalExtension();
            $file_path = 'public/cv_files';
            $file->storeAs($file_path,$file_name);
            $input['cv_path'] = $file_name;
        }


        $candidate = Candidate::create($input);
        return response(['message'=>'candidate stored','data'=>$candidate],200);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function show(Candidate $candidate)
    {
        return response(['message'=>'candidate retrieved','data'=>$candidate],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Candidate $candidate)
    {
        $candidate = $candidate->update($request->all());
        return response(['message'=>'candidate updated','data'=>$candidate],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Candidate $candidate)
    {
        $candidate->delete();
        return response(['message'=>'candidate deleted'],200);
    }
}
