//////////////////////////////////////////////
// WYSIWYG Editor by Muhammad Habib Rohman  //
// Copyright 2016 - 2017                    //
// Contact: mhrohman@live.com               //
//////////////////////////////////////////////

$(window).on('load', function(){
	frameEditor.document.designMode = 'on';
}).on('mouseup', function(){
	hideSubMenu();
});
frameEditor.document.onclick = function(){
	hideSubMenu();
}
// Hide sub menu when active
function hideSubMenu(){
	$('[data-collapse]').find('ul[id]').hide();
};

$('ul.menu-action li').on('click', function(){
	var action = $(this).attr('action') || false,
		custom = $(this).attr('custom') || null;
	if(action){
		if(custom == 'true'){
			openPopupAction(action);
			return false;
		}
		frameEditor.document.execCommand(action, false, custom)
		hideSubMenu();
	}
});

function insertToFrame(data){
	var values,
		data = makeJSONfromArray(data);
	if(sectionPopupOpened){
		switch(sectionPopupOpened){
			case 'createLink':
				values = data.CL_LINK;
				$('#CL_LINK').val('http://');
				break;
		}
		frameEditor.document.execCommand(sectionPopupOpened, false, values);
		closePopupAction();
	}
}

var sectionPopupOpened = '';

function openPopupAction(action){
	var initTarget = '#' + action;
	$('#popupAction').show();
	$(initTarget).show();
	sectionPopupOpened = action;
}

function closePopupAction(){
	sectionPopupOpened = '';
	$('#popupAction').hide();
	$('.overlay section').hide();
}

$('.btn-submit').click(function(event){
	event.preventDefault();
	var parent = $(this)[0].parentElement,
		data = $(parent).serializeArray();
	insertToFrame(data);
})


$('ul.menu-action li.downlist').on('click', function(event){
	event.stopPropagation();
	var dataCollapse = $(this).attr('data-collapse');
	$(dataCollapse).toggle();
});

function makeJSONfromArray(array){
	var b = {};
	for(var a in array){
		b[array[a].name] = array[a].value;
	}
	return b;
}