<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\UserImport;

use Illuminate\Http\Response;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class ImportController extends Controller
{

    public function index(){
        return view('welcome');
    }

    public function import(){

        $config = \Config::get('user_import');

        try {
            $inputData = Input::all();
            $statusCode = 200;
            $response['items'] = UserImport::getFile($inputData);            

            foreach ($response['items'] as $key => $value) {
                $response['status'] = UserImport::create($value)->save();
            }

        } catch(\Exception $e) {
            $response = ["error" => $e->getMessage()];
            $statusCode = 400;
        } finally {
            return \Response::json($response, $statusCode);
        }
    }

    public function parseFile(Request $r){

        try {

            $file = $r->file('file');
            $config = \Config::get('user_import');

            if(!in_array($file->getClientMimeType(), $config['valide_mime_type'])) throw new \Exception("File is not valid", 1);
            
            $statusCode = 200;

            $parse = UserImport::parseFileImport($r);

            $response = [
              'items' => (count($parse['items']) > 10)? array_slice($parse['items'], 0, 3) : $parse['items'],
              'file' => $parse['file'],
              'total_row' => count($parse['items']),
              'table_header' => $config['table_header'],
              'mapping' => $config['default_maping']
            ];

        } catch(\Exception $e) {
            $response = ["error" => 'File invalid'];
            $statusCode = 400;
        } finally {
            return \Response::json($response, $statusCode);
        }
    }
}
