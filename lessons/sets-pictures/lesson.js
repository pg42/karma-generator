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
var droppedObject =[];
var imgPath = "assets/image/";
var zIndex = 0;
var objectCount = 0;
var TOTAL_QUES = 12;
var initialized = false;

function initialize(){
    if(!initialized) {
	scoreboardInitialize({'layout':'horizontal','winningScore': TOTAL_QUES});
	initialized = true;
    }
}

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
			   objectCount++;
			   zIndex++;
			   checkComplete(index);
		       });

    $(dropObject).bind('drop',
		       function(event, ui) {
			   currentDropObject = event.target.id;
			   if(currentObject === currentDropObject){
			       $('#'+currentDragObject).draggable( 'disable' );
			       if(droppedObject.indexOf(ui.draggable) < 0) {
				   scoreboardHit();
			       }
			   }
			   else{
			       ui.draggable.animate({left:0,top:0});
			       if(droppedObject.indexOf(ui.draggable) < 0) {
				   scoreboardMiss();
				   droppedObject.push(ui.draggable);
			       }
			       console.log(droppedObject);

			   }
		       });
}

function checkComplete(page) {
    if(objectCount == 12) {
	if(page == 0) {
	    $('#linkNextLesson').show();
	    $('#linkPrevLesson').hide();
	}else if(page == 1) {
	    $('#linkNextLesson').show();
	    $('#linkPrevLesson').show();
	}else if(page == 2) {
	    $('#linkNextLesson').hide();
	    $('#linkPrevLesson').show();
	}else {
	    $('#linkNextLesson').hide();
	    $('#linkPrevLesson').hide();
	}
    }
}


function firstScreen(karma, content) {
    objectCount = 0;
    initialize();
    scoreboardReset();
    object = Karma.shuffle(objects[0]);

    $('#linkNextLesson').hide();
    $('#linkPrevLesson').hide();
    $('#score_box').show();

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
    dragAndDrop(0);
};


function textScreen(karma, content, index) {
    objectCount = 0;
    scoreboardReset();
    var object = Karma.shuffle(objects[index]);

    $('#linkNextLesson').hide();
    $('#linkPrevLesson').hide();
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
    dragAndDrop(index);
};



setUpMultiScreenLesson([firstScreen,
			function (karma, content) { textScreen(karma, content, 1); },
			function (karma, content) { textScreen(karma, content, 2); }]);
