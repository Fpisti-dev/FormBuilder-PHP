﻿<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Form Builder</title>

    <!--Scripts-->
    <script src="Scripts/js/jquery-1.12.4.js"></script>
    <script src="Scripts/js/jquery-ui.js"></script>
    <script src="Scripts/Bootstrap/js/bootstrap.min.js"></script>
    <script src="Scripts/DataTables/jquery.dataTables.min.js"></script>        
    <script src="Scripts/DataTables/dataTables.buttons.min.js"></script>    
    <script src="Scripts/DataTables/pdfmake.min.js"></script>
    <script src="Scripts/DataTables/vfs_fonts.js"></script>            
    <script src="Scripts/DataTables/buttons.html5.min.js"></script>
    <script src="Scripts/DataTables/buttons.html5.min.js"></script>
    <script src="Scripts/DataTables/buttons.print.min.js"></script>
    <script src="Scripts/DataTables/buttons.print.min.js"></script> 
    <script src="Scripts/Editor/editor.js"></script>
    
    <!--CodeMirror-->
    <link rel="stylesheet" href="Scripts/CodeMirror/lib/codemirror.css" />
	
    <script src="Scripts/CodeMirror/lib/codemirror.js"></script>
    <script src="Scripts/CodeMirror/lib/util/formatting.js"></script>
    <script src="Scripts/CodeMirror/mode/css/css.js"></script>
    <script src="Scripts/CodeMirror/mode/xml/xml.js"></script>
    <script src="Scripts/CodeMirror/mode/javascript/javascript.js"></script>
    <script src="Scripts/CodeMirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="Scripts/CodeMirror/addon/display/autorefresh.js"></script> 
    
 
    <!--Style sheets-->
    <link rel="stylesheet" href="Scripts/css/jquery-ui.css" />
    <link rel="stylesheet" href="Scripts/Bootstrap/css/bootstrap-select.css"  />
    <link rel="stylesheet" href="Scripts/Bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="Scripts/DataTables/css/demo_table_jui.css" />    
    <link rel="stylesheet" href="Scripts/DataTables/css/buttons.dataTables.min.css" />
    <link rel="stylesheet" href="Scripts/themes/base/jquery.ui.all.css" />
    <link rel="stylesheet" href="Scripts/css/font-awesome.css" />
    <link rel="stylesheet" href="Scripts/Editor/editor.css" />

    
    <!-- Custom styles -->
    <link rel="stylesheet" href="Scripts/css/style.css" />
    <link rel="stylesheet" href="Scripts/css/custom.css" />    

    <div id="headExtra"></div>
</head>
<body>
    <div>
        <div id="ContentPlaceHolder1"></div>

        <nav class="navbar navbar-inverse">                         
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="~/../index.php">Form Builder</a>
                </div>
                <div class="collapse navbar-collapse navbar-ex1-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li><button type="button" class="btn btn-xs btn-primary" id="btnNewForm" runat="server" style="margin-top: 15px; margin-right: 40px;">Add New</button></li>                        

                        <li><button type="button" class="btn btn-xs btn-warning" id="btnLoadForm" runat="server" style="margin-top: 15px; margin-left: 1em; " onclick="btnLoadForm_Click()">Load</button></li>

                        <li><button type="button" class="btn btn-xs btn-primary" id="btnSaveForm" runat="server" style="margin-top: 15px; margin-left: 1em; " onclick="btnSaveForm_Click()">Save</button></li>
                        
                        <li><button type="button" class="btn btn-xs btn-success" id="btnPreviewForm" runat="server" style="margin-top: 15px; margin-left: 1em; " onclick="btnPreviewForm_Click()">Preview</button></li>

                        <li><button type="button" class="btn btn-xs btn-info" id="btnLaunchForm" runat="server" style="margin-top: 15px; margin-left: 1em; " onclick="btnLaunchForm_Click()">Launch</button></li>
                        
                        <li><button type="button" class="btn btn-xs btn-danger" id="btnExitForm" runat="server" style="margin-top: 15px; margin-left: 1em; " onclick="btnExitForm_Click()">Exit</button></li>

                        <li><a id="lblUserName" runat="server" class="pull-right"></a></li>
                        
                    </ul>
                </div>
            </div>
        </nav>

        <div id="Content"></div>
    </div>
</body>
</html>
