var activePage = 'page_first';

$(document).ready(function () {
    //get form name from URL
    var formName = decodeURIComponent(getQueryString('fID'));
    //$('#title-preview').text(formName);
    LoadFormPreviewByName(formName);

});

var getQueryString = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

function LoadFormPreviewByName(sFormName) {

    $.ajax({
        method: "POST",
        url: "~/../Handlers/LoadFormByName.php",
        dataType: "json",
        async: true,
        data: {
            FormName: sFormName
        },
        success: function (result) {
			
			let res = result[0];
			
			console.log(res);
			
			//add style to head
            var sStyle = res.Styling;
            $('head').append('<style>' + sStyle + '</style>');
                    

            //add script to head
            var sScript = res.Scripting;
            $('head').append('<script>' + sScript + '</script>');

            //add style sheets to head
            var aStyles = (res.ResourcesStyle).split('|');
            $.each(aStyles, function (i, e) {

                var link = '<link rel="stylesheet" type="text/css" href="' + e + '">';
                $('head').append(link);
            });

            //add scripts
            var aScripts = (res.ResourcesScript).split('|');
            $.each(aScripts, function (i, e) {
                $.getScript(e);
            });


            //empty pages and designer and add results
            var menu = $.parseHTML(res.PageHtml);                    
            var pages = $.parseHTML(res.DesignerHtml, document, true);
            $('#menu-preview').empty().html($(menu).find('#uPages'));
            $('#pages-preview').empty().html($(pages).find('.panel-body'));
                    

            //remove useless elements and classes
            $('span').remove(); // to do, removes HTML contetn if it uses <span>  !!!!
            $('#btnNewPage').remove();
            $('li').removeClass('ui-sortable');
            $('div').removeClass('layouts layout items drop box droppable-for-items ui-droppable ui-sortable');

            //hide unvisible elements
            $('*[data-visible="false"]').hide();

            //hide all pages
            $('#uPages li').each(function () {
                var pageID = (this.id).replace('link_', '');
				$('#' + pageID).hide();
            });

            //set first page to activ and shows it
            activePage = 'page_first';
            $('#' + activePage).show();
            $('#title-preview').text(res.FormName); 
			
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("AJAX Load Request error: " + thrownError);
        }
    });
};

function pageClick(p) {

    if (activePage != p) {
        var title = $('#' + p).attr('data-title');
        console.log(title);
        $('#pageTitle').text(title);
        $('#' + activePage).hide();
        activePage = p;
        $('#' + activePage).show();
    }
};