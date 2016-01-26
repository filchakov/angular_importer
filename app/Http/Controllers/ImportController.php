<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Http\Response;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class ImportController extends Controller
{
    public function parseFile(Request $r){

        try {


            $file = $r->file('file');

            switch ($file->getClientMimeType()) {
                case 'application/vnd.ms-excel':
                    
                    break;
                case 'text/plain':
                    
                    break;
                default:
                    throw new \Exception("File is not valid", 1);
                    break;
            }

            $statusCode = 200;
            $response = [
              'type'  => 'csv',
              'items' => []
            ];

            

            for($i = 0; $i < 10; $i++){
                $response['items'][] = ['first name '.$i, 'last name'.$i, 'email@mail.ru'];
            }

        } catch(\Exception $e) {
            $response = ["error" => $e->getMessage()];
            $statusCode = 400;
        } finally {
            return \Response::json($response, $statusCode);
        }
    }
}
