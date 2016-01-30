<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Facades\Excel;

class UserImport extends Model
{
    //const CREATED_AT = 'added_date';

    protected $fillable = ['firstname', 'lastname', 'email', 'country', 'city', 'address', 'status', 'password'];

    static public function getFile($inputData = array()){
        $config = \Config::get('user_import');
        
        $excel = Excel::load($config['path_price'].$inputData['file'], function($reader){$reader->noHeading();})->get()->toArray();
        
        $dataImport = UserImport::formaterDataFile($excel, $inputData['file']);

        foreach ($dataImport as $key => $value) {
                
                $new_value = array();
                foreach ($inputData['mapping'] as $key_mapping => $mappingValue) {
                    if(in_array($mappingValue, $config['required']) && (empty($value[$key_mapping]) && empty($inputData['defaultValue'][$mappingValue])) ){
                        throw new \Exception("You did not fill the required field: ".$config['table_header'][$mappingValue] . ', '.($key+1).' line' , 1);
                    }
                    $new_value[$mappingValue] = (!empty($value[$key_mapping]))? $value[$key_mapping] : ((!empty($inputData['defaultValue'][$mappingValue]))? $inputData['defaultValue'][$mappingValue] : '');
                }

                $dataImport[$key] = $new_value;
            }


        return $dataImport;
    }

    static public function parseFileImport(\Illuminate\Http\Request $r){
        
        $result = array(
            'items' => '',
            'file' => ''
        );
        $config = \Config::get('user_import');
        
        $generateName = uniqid().'.'.$r->file('file')->getClientOriginalExtension();
        
        $result['file'] = pathinfo($generateName)['basename'];

        $r->file('file')->move($config['path_price'], $result['file']);

        $excel = Excel::load($config['path_price'].$result['file'], function($reader){$reader->noHeading();})->get()->toArray();


        $result['items'] = UserImport::formaterDataFile($excel, $generateName);
        

        return $result;
    }

    static function formaterDataFile($excel = array(), $fileName){
        $result = array();

        $config = \Config::get('user_import');

        if(in_array(pathinfo($fileName)['extension'], $config['csv_extension'])){
            //txt, csv
            foreach ($excel as $key => $value) {
                $result[] = checkCountColspan('txt', $value);
            }
        } else {
            //xls
            foreach ($excel[0] as $key => $value) {
                $result[] = checkCountColspan('xls', $value);
            }
        }
        return $result;
    }
}
