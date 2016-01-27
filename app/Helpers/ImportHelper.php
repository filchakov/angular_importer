<?php 

/**
 * [checkLimitCountInRow ]
 * @param  array  $array [Array with data from import file]
 * @return [boolean]
 */
function checkLimitCountInRow(&$array = array()){

    $rules_count = \Config::get('user_import.count_colspan');
    
    $row_count = count(array_filter(end($array)));
    
    if($row_count < $rules_count['min'] || $row_count > $rules_count['max']){
        throw new \Exception(sprintf($rules_count['error_text'], $rules_count['min'], $rules_count['max']) , 1);
    }
    
    return true;
}

function checkCountColspan($type = '', $array = array()){
    $result = array();
    
    switch ($type) {
        case 'txt':
            $result = explode(\Config::get('user_import.csv_split'), array_shift($array));
            break;
        
        case 'xls':
            $result = (count($array)==1)? explode(';', $array) : array_values($array);
            break;
    }

    $additional_colspan = array_fill(0, count(\Config::get('user_import.table_header')) - count($result), '');
    $result = array_merge($result, $additional_colspan);

    return $result;
}