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

function checkCountColspan($type = '', $array = array(), $delimiter = ';'){
    $result = array();
    
    switch ($type) {
        case 'txt':
            $result = explode($delimiter, array_shift($array));
            break;
        
        case 'xls':
            $result = (count($array)==1)? explode(';', $array) : array_values($array);
            break;
    }

    $additional_colspan = array_fill(0, count(\Config::get('user_import.table_header')) - count($result), '');
    $result = array_merge($result, $additional_colspan);

    return $result;
}

function detectedDelimiter($string = ''){
    $probable_delimiters = \Config::get('user_import.csv_split');

    $delimiter_count_array = array(); 

    foreach ($probable_delimiters as $probable_delimiter) {
        $probable_delimiter_count = substr_count($string, $probable_delimiter);
        $delimiter_count_array[$probable_delimiter] = $probable_delimiter_count;
    }

    $max_value = max($delimiter_count_array);
    $determined_delimiter_array = array_keys($delimiter_count_array, max($delimiter_count_array));
    
    while( $element = each( $determined_delimiter_array ) ){
        $determined_delimiter_count = $element['key'];
        $determined_delimiter = $element['value'];
    }
    return $determined_delimiter;
}