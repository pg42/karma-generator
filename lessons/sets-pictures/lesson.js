var objects = [	["fruit1_fruit","fruit2_fruit","fruit3_fruit","fruit4_fruit","veg1_veg","veg2_veg","veg3_veg","veg4_veg","other1_other","other2_other","other3_other","other4_other"],
		["चील_air","परेवा_air","सुगा_air","मैना_air","माछा_water","गोही_water","सार्क_water","डोल्फिंन_water","मृग_land"," बाघ_land","घोडा_land","खसी_land"],
		["स्केल_reading","कलम_reading","इरेजर_reading","किताब_reading","बल_playing","तास_playing","ब्याट_playing","क्याराम_playing","झोला_carrying","बाल्टिन_carrying","गाग्रो_carrying","डालो_carrying"]
];

var dropTarget = [["fruit","veg","other"],
		  ["air","water","land"],
		  ["reading","playing","carrying"]
];

var dropTargetText = [	["फलफूलको  समूह","तरकारीको समूह","अन्य खानेकुराको समूह"],
			["चराको  समूह","पानीमा पाइने  जनावरको समूह","अन्य जनावरको समूह"],
			["पढ्ने सामग्रीको  समूह","खेल्ने सामग्रीको समूह","बोक्ने सामग्रीको समूह"]
];
var imgPath = "assets/image/";
var zIndex = 0;
var objectCount = 0;

function dragAndDrop(index){

    var currentObject,currentTarget;
    var dragObject = '.dragObjects';
    var dropObject = '.dropObjects';
    if(index > 0){
	dragObject = '.dragObjectsText';
	dropObject = '.dropObjects1';
    }
    $(dragObject).bind('dragstart',
		       function(event, ui) {
			   currentDragObject = event.target.id;
			   currentObject = event.target.id.slice(event.target.id.lastIndexOf('_')+1,event.target.id.length);
			   $('#'+event.target.id).css({'z-index':zIndex});
			   zIndex++;
		       });

    $(dropObject).bind('drop',
		       function(event, ui) {
			   currentDropObject = event.target.id;
			   if(currentObject === currentDropObject || currentObject === currentDropObject || currentObject === currentDropObject){
			       $('#'+currentDragObject).css({'z-index':zIndex});  //drop the object to fit the drop area
			       $('#'+currentDragObject).draggable( 'disable' );
			       objectCount++;

			   }
			   else{
			       ui.draggable.animate({left:0,top:0});
			   }
		       });
}


function firstScreen(karma, content) {
    var object = Karma.shuffle(objects[0]);

    $('#content')
	.append(createDiv('section')
		.append(createDiv('shapesSection'))
		.append(createDiv('dropSection')));

    $(object.map(
	  function (obj){
	      return createDiv(obj)
		  .append(karma.createImg(obj.slice(0,obj.lastIndexOf('_'))))
		  .addClass('dragObjects ui-draggable')
		  .draggable({ containment: '#content'});
	  })).appendTo($('#shapesSection'));


    $(dropTarget[0].map(
	  function (obj){
	      return createDiv(obj)
		  .addClass('dropObjects ui-droppable')
		  .droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
	  })).appendTo($('#dropSection'));

    $(dropTargetText[0].map(
	  function (obj){
	      return createDiv()
		  .append(obj)
		  .addClass('dropText');
	  })).appendTo($('#dropSection'));

};


function textScreen(karma, content, index) {
    var object = Karma.shuffle(objects[index]);

    $('#content')
	.append(createDiv('section1')
		.append(createDiv('shapesSection1'))
		.append(createDiv('dropSection1')));

    $(object.map(
	  function (obj){
	      return createDiv(obj)
		  .append(obj.slice(0,obj.lastIndexOf('_')))
		  .addClass('dragObjectsText ui-draggable')
		  .draggable({ containment: '#content'});
	  })).appendTo($('#shapesSection1'));

    $(dropTarget[index].map(
	  function (obj){
	      return createDiv(obj)
		  .addClass('dropObjects1 ui-droppable')
		  .droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
	  })).appendTo($('#dropSection1'));

    $(dropTargetText[index].map(
	  function (obj){
	      return createDiv()
		  .append(obj)
		  .addClass('dropText');
	  })).appendTo($('#dropSection1'));

};



setUpMultiScreenLesson([firstScreen,
			function (karma, content) { textScreen(karma, content, 1); },
			function (karma, content) { textScreen(karma, content, 2); }]);
