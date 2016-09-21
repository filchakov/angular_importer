<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Facades\Excel;

class UserImport extends Model
{
    //const CREATED_AT = 'added_date';

    protected $fillable = ['firstname', 'lastname', 'email', 'country', 'city', 'address', 'status', 'password'];

    public static function getFile($inputData = [])
    {
        $config = \Config::get('user_import');

        $excel = Excel::load($config['path_price'].$inputData['file'], function ($reader) {
            $reader->noHeading();
        })->get()->toArray();

        $dataImport = self::formaterDataFile($excel, $inputData['file']);

        foreach ($dataImport as $key => $value) {
            $new_value = [];
            foreach ($inputData['mapping'] as $key_mapping => $mappingValue) {
                if (in_array($mappingValue, $config['required']) && (empty($value[$key_mapping]) && empty($inputData['defaultValue'][$mappingValue]))) {
                    throw new \Exception('You did not fill the required field: '.$config['table_header'][$mappingValue].', '.($key + 1).' line', 1);
                }
                $new_value[$mappingValue] = (!empty($value[$key_mapping])) ? $value[$key_mapping] : ((!empty($inputData['defaultValue'][$mappingValue])) ? $inputData['defaultValue'][$mappingValue] : '');
            }

            $dataImport[$key] = $new_value;
        }


        return $dataImport;
    }

    public static function parseFileImport(\Illuminate\Http\Request $r)
    {
        $result = [
            'items' => '',
            'file'  => '',
        ];
        $config = \Config::get('user_import');

        $generateName = uniqid().'.'.$r->file('file')->getClientOriginalExtension();

        $result['file'] = pathinfo($generateName)['basename'];

        $r->file('file')->move($config['path_price'], $result['file']);

        //$delimiter
        $excel = Excel::load($config['path_price'].$result['file'], function ($reader) {
            $reader->noHeading();
        });

        if ($excel->getTotalRowsOfFile() > 10) {
            $excel = $excel->take(3)->get()->toArray();
        } else {
            $excel = $excel->get()->toArray();
        }

        $result['items'] = self::formaterDataFile($excel, $generateName);


        return $result;
    }

    public static function formaterDataFile($excel, $fileName)
    {
        $result = [];

        $config = \Config::get('user_import');

        if (in_array(pathinfo($fileName)['extension'], $config['csv_extension'])) {
            //txt, csv
            $delimiter = detectedDelimiter($excel[0][0]);
            foreach ($excel as $key => $value) {
                $result[] = checkCountColspan('txt', $value, $delimiter);
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
