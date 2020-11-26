$(document).ready(function () {
	
	LoadTable();

    //Hook up the click event for the add/edit work request button
    $("#btnNewForm").click(function () {
        //clear form
        ClearForm();

        //open modal window
        $('#newFormModal').modal('toggle');
    });
});


function LoadTable() {
	
	$('#pnlMain').empty();
	
// Load forms from database with ajax
	$.ajax({
		url: "~/../Handlers/GetForms.php",
		context: document.body
		}).done(function(result) {
			
			
			// Build HTML table
			let table = '<table id="example" class="table table-striped table-bordered" BorderStyle="Solid" BorderWidth="2"><thead><tr>' + 
				'<th scope="col">ID</th>' +
				'<th scope="col">Form Name</th>' +
				'<th scope="col">Creator</th>' +
				'<th scope="col">Date</th>' +
				'<th scope="col">Published</th>' +
				'<th class="input-filter" style="text-align:center;width: 25%">Tools</th>' +
				'</tr></thead><tbody>';
			
			JSON.parse(result).forEach( function(item) {
				
				//console.log(item.Id);
				
				var published = (item.Published == 1) ? 'Y' : 'N';
				
				// Must remove spaces for click event
				var formname = item.FormName.replace(/\s/g, "");
				
				//console.log(formname);
				
				table += '<tr><td style="text-align:center"><a class="btn btn-primary btn-xs" id="view_"' + item.Id + '" onclick=btnDetails_Click("' + item.Id + '")>' + item.Id + '</a>' +  
					'</td><td>' + item.FormName + 
					'</td><td>' + item.CreatedBy + 
					'</td><td>' + item.CreatedAt + 
					'</td><td>' + published; 
				
				//call javascript function 
				table += "</td><td><a class='btn btn-success btn-xs' style='margin-left: 6px;' id='edit_" + item.Id + "' onclick=btnEdit_Click('" + item.Id + "')>Edit</a>";

				table += "<a class='btn btn-info btn-xs' style='margin-left: 10px;' id='load_" + item.Id + "' href=~/../Editor.php?fID=" + formname +  ">Load</a>";

				table += "<a class='btn btn-warning btn-xs' target='_blank' style='margin-left: 10px;' id='load_" + item.Id + "' href=~/../Preview.php?fID=" + formname +  ">Preview</a>";


				table += "<a class='btn btn-primary btn-xs' target='_blank' style='margin-left: 10px;' id='load_" + item.Id + "' href=~/../Form.php?fID=" + formname + ">Launch</a></td></tr> ";     
			});
			
			table += '</tbody>';
			table += '<tfoot><tr>' + 
				'<th>ID</th>' +
				'<th>Form Name</th>' +
				'<th>Creator</th>' +
				'<th>Date</th>' +
				'<th>Published</th>' +
				'<th>Tools</th>' +
				'</tr></tfoot></table>';
			
			// Append table to panel
			$('#pnlMain').append(table);
			
			
			// Hide buttons
			$("#btnLoadForm").hide();
			$("#btnSaveForm").hide();
			$("#btnPreviewForm").hide();
			$("#btnLaunchForm").hide();
			$("#btnExitForm").hide();
			
			// Convert static table to a dynamic one
			changeToDatatable();
			
	});
}


function changeToDatatable() {

	console.log('Swap to datatable');
	
    //Datatable
    $('#example tfoot th').each(function (i) {

        if (i < ($('#example tfoot th').length - 1)) {
            var title = $(this).text();
            $(this).html('<input class="col-sm-12" type="text" placeholder="' + title + '" />');
        }
    });

    // DataTable
    var table = $('#example').DataTable({
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            }
        ],
        "oLanguage": {
            "sZeroRecords": "No records to display",
            "sSearchPlaceholder": "Search in all columns",
            "sSearch": "Search "
        },
        "aLengthMenu": [[10, 20, 50, 100, 150, 250], [10, 20, 50, 100, 150, 250]],
        "iDisplayLength": 10,
        "bSortClasses": false,
        "bStateSave": false,
        "bPaginate": true,
        "bAutoWidth": false,
        "bProcessing": true,
        "bDestroy": true,
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "bDeferRender": true,
        "columnDefs": [{ //this definition is set so the column with the action buttons is not sortable
            "targets": -1, //this references the last column of the date
            "orderable": false,
            "searchable": false
        }]
    });


    // Apply columns search
    table.columns().every(function () {
        var that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
}

// Insert new form to database
function btnSaveForm_Click() {
		
    // Validate that form and user name name were entered
    var errorMsg = "";
		
    if (!$("#txtFormName").val()) {
        errorMsg += "\n* Form Name required!";
    }
		
	if (!$("#txtUserName").val()) {
        errorMsg += "\n* User Name required!";
    }

    if (errorMsg != "") {
        errorMsg = "The following errors were found: \n" + errorMsg + "\n\n Please enter the required information and try again.";
        alert(errorMsg);
    }
    else {
        //JQuery ajax call
        $.ajax({
            method: "POST",
            url: "~/../Handlers/InsertForm.php",
            dataType: "json",
            data: {
                FormName: $("#txtFormName").val(),
				UserName: $("#txtUserName").val()					
            },
            success: function (result) {
					
                console.log(result);
			
				if (result != 1) {
					alert("Name duplication! Please select another name?");
				}
				else {
					$('#newFormModal').modal('toggle');
					location.reload();
				}
            },
				error: function (xhr, ajaxOptions, thrownError) {
                alert("AJAX Save Request error" + thrownError);
            }
        })
    }
}

// Display form details
function btnDetails_Click(x) {

    console.log("Clicked: " + x);

    //Clear form
    //ClearForm();

    $.ajax({
        method: "POST",
        url: "~/../Handlers/FormDetails.php",
        dataType: "json",
        async: true,
        data: {
            Id: x
        },
        success: function (result) {
			
			let res = result[0];
			
			var published = (res.Published == 1) ? 'Y' : 'N';
            
			$('#lblID').text(x);
            $('#lblFormName').text(res.FormName);
            $('#lblCreatedBy').text(res.CreatedBy);
            $('#lblCreatedAt').text(res.CreatedAt);
            $('#lblPublished').text(published);
            $('#lblLastEditedBy').text(res.LastEditedBy);
            $('#lblLastEditDate').text(res.LastEditDate);

            $('#DetailsModal').modal('toggle');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Load User AJAX Error:" + thrownError);
        }
    });
}


// Edit form name and published state
function btnEdit_Click(x) {

    console.log("Edit: " + x);

    //Clear form
    //ClearForm();

    $.ajax({
        method: "POST",
        url: "~/../Handlers/FormDetails.php",
        dataType: "json",
        async: true,
        data: {
            Id: x
        },
        success: function (result) {
			
			let res = result[0];
			
			console.log(res); 	
			
            $('#lblEditID').text(x);
            $('#txtEditFormName').val(res.FormName);
            $('#lblEditCreatedBy').text(res.CreatedBy);
            $('#lblEditCreatedAt').text(res.CreatedAt);
            $('#slbEditPublished').val(res.Published).change();                    
            $('#txtEditorName').text(res.LastEditedBy);
            $('#lblEditLastEditDate').text(res.LastEditDate);
            $('#cEditID').val(x);

            console.log('-' + res.Published + '-');

            $('#EditModal').modal('toggle');	
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Load User AJAX Error:" + thrownError);
        }
    });
};

// Update form name and publis state on database
function btnEditUpdate_Click() {
    var id = $('#cEditID').val();

    $.ajax({
        method: "POST",
        url: "~/../Handlers/UpdateForm.php",
        dataType: "json",
        async: true,
        data: {
            ID: id,
            FormName: $("#txtEditFormName").val(),
            Published: $("#slbEditPublished").val(),
			UserName: $("#txtEditorName").val()
        },
        success: function (result) {
			
			console.log(result);
			
			if (result != 1) {
				alert("Name duplication! Please select another name?");
			}
			else {
				$('#EditModal').modal('toggle');
				location.reload();
			}			
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("AJAX Update request error: " + thrownError);
        }
    });
};

function ClearForm() //blank the add/edit popup form
{
    $("#newRequest input").each(function () {
        $(this).val('');
    });
    $("#slbUpdate").val('');
}


