<!DOCTYPE html>
<head>
    <title>Test task</title>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/ngstorage/ngStorage.js"></script>
    
    
    <link rel="stylesheet" href="http://getbootstrap.com/dist/css/bootstrap.min.css">
    <style type="text/css">
        .btn-file {
            position: relative;
            overflow: hidden;
        }
        .btn-file input[type=file] {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            font-size: 100px;
            text-align: right;
            filter: alpha(opacity=0);
            opacity: 0;
            outline: none;
            background: white;
            cursor: inherit;
            display: block;
        }
    </style>
</head>
    <body ng-app="parserApp">
        
        <div id="wrapper">
            <div class="container">
                <div class="header clearfix"> 
                    <h3 class="text-muted">Test task upload users list</h3> 
                </div>

                <div ng-view></div>

            </div>
        </div>
        
    <script src="bower_components/angular-file-upload/dist/angular-file-upload.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/services.js"></script>

    </body>

</html>