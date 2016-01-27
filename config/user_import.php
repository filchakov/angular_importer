<?php 
return [
    'path_price' => storage_path().'/price_tmp/',
    'valide_mime_type' => [
        'text/csv',
        'application/vnd.ms-excel',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    'csv_extension' => ['txt','csv'],
    'csv_split' => ';',
    'count_colspan' => [
        'min' => 3,
        'max' => 5,
        'error_text' => 'Invalid import file, a minimum of %d and a maximum of %d columns'
    ],
    'table_header' => [
        'firstname' => 'First name',
        'lastname' => 'Last name',
        'email' => 'Email',
        'country' => 'Country',
        'city' => 'City',
        'address' => 'Address',
        'status' => 'Status',
        'password' => 'Password'
    ],
    'default_maping' => [
        0 => 'firstname',
        1 => 'lastname',
        2 => 'email',
        3 => 'country',
        4 => 'city',
        5 => 'address',
        6 => 'status',
        7 => 'password',
    ]

];