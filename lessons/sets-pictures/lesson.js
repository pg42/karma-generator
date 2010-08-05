var TOTAL_QUES = 12;
var initialized = false;

function initialize(){
    if(!initialized) {
        scoreboardInitialize({'layout':'horizontal','winningScore': TOTAL_QUES});
        initialized = true;
    }
}

function createScreen(karma, content, objects, drop_targets, configuration) {
    initialize();
    scoreboardReset();
    var droppedObject =[];
    var zIndex = 1;

    $('#linkNextLesson').hide();
    $('#linkPrevLesson').hide();

    var draggables_div = createDiv(configuration.draggables_div_id);
    var droppables_div = createDiv(configuration.droppables_div_id);
    content
        .append(createDiv('section')
                .append(draggables_div)
                .append(droppables_div));

    $(Karma.shuffle(objects).map(
          function (object) {
              return createDiv(object.name)
                  .append(configuration.createObject(object.name))
                  .addClass(configuration.drag_objects_class)
                  .data('kind', object.kind)
                  .draggable({
                                 containment: '#content',
                                 revert: 'invalid',
                                 start: function(event, ui) {
                                     $(this).css({ zIndex: zIndex++ });
                                 }
                             });
          }
      ))
        .appendTo(draggables_div);

    $(drop_targets.map(
          function (drop_target) {
              var name = drop_target.name;
              return createDiv(name)
                  .addClass(configuration.drop_objects_class)
                  .droppable(
                      {
                          hoverClass: 'drophover',
                          drop: function(event, ui) {
                              var draggable = ui.draggable;
                              if (draggable.data('kind') == name) {
                                  draggable
                                      .draggable('disable')
                                      .addClass('dropped');
                                 if (droppedObject.indexOf(draggable) < 0) {
                                      scoreboardHit();
                                  }
                                  if ($('.dropped').length == 12) {
                                      configuration.enableNavigationButtons();
                                  }
                              } else {
                                  draggable.animate({ left: 0, top: 0 });
				  if(droppedObject.indexOf(draggable) < 0) {
                                      scoreboardMiss();
                                      droppedObject.push(draggable);
                                  }
                              }
                          }
                      });
          }))
        .appendTo(droppables_div);

    $(drop_targets.map(
          function (drop_target) {
              return createDiv()
                  .append(drop_target.text)
                  .addClass('dropText');
          }))
        .appendTo(droppables_div);
}

function createCommonScreen(karma, content, objects,drop_targets,navButtons,createText ) {
    createScreen(karma,
		 content,
		 objects,
		 drop_targets,
		 {
		     draggables_div_id: 'shapesSection1',
		     droppables_div_id: 'dropSection1',
		     drag_objects_class: 'dragObjectsText',
		     drop_objects_class: 'dropObjects1',
		     enableNavigationButtons:navButtons,
		     createObject:createText
		 });
}


function screen1(karma, content) {
    var objects = [ {name: 'fruit1', kind: 'fruit'},
		    {name: 'fruit2', kind: 'fruit'},
		    {name: 'fruit3', kind: 'fruit'},
		    {name: 'fruit4', kind: 'fruit'},
		    {name: 'veg1', kind: 'veg'},
		    {name: 'veg2', kind: 'veg'},
		    {name: 'veg3', kind: 'veg'},
		    {name: 'veg4', kind: 'veg'},
		    {name: 'other1', kind: 'other'},
		    {name: 'other2', kind: 'other'},
		    {name: 'other3', kind: 'other'},
		    {name: 'other4', kind: 'other'}
		  ];
    var drop_targets = [ {name: 'fruit', text: 'फलफूलको  समूह'},
			 {name: 'veg', text: 'तरकारीको समूह'},
			 {name: 'other', text: 'अन्य खानेकुराको समूह'}
		       ];
    createScreen(karma,
                 content,
                 objects,
                 drop_targets,
                 {
                     draggables_div_id: 'shapesSection',
                     droppables_div_id: 'dropSection',
                     drag_objects_class: 'dragObjects',
                     drop_objects_class: 'dropObjects',
                     enableNavigationButtons: function () {
                         $('#linkNextLesson').show();
                     },
                     createObject: function (img) {
                         return karma.createImg(img);
                     }
                 });
}

function screen2(karma, content) {
    var objects = [ {name:'चील', kind: 'air'},
		    {name:'परेवा', kind: 'air'},
		    {name:'सुगा', kind: 'air'},
		    {name:'मैना', kind: 'air'},
		    {name:'माछा', kind: 'water'},
		    {name:'गोही', kind: 'water'},
		    {name:'सार्क', kind: 'water'},
		    {name:'डोल्फिंन', kind: 'water'},
		    {name:'मृग', kind: 'land'},
		    {name:'बाघ', kind: 'land'},
		    {name:'घोडा', kind: 'land'},
		    {name:'खसी', kind: 'land'}
		  ];
    var drop_targets = [ {name: 'air', text: 'चराको  समूह'},
			 {name: 'water', text: 'पानीमा पाइने  जनावरको समूह'},
			 {name: 'land', text: 'अन्य जनावरको समूह'}
		       ];

    createCommonScreen(karma,
		       content,
		       objects,
		       drop_targets,
		       function() {
			   $('#linkNextLesson').show();
			   $('#linkPrevLesson').show();
		       },
		       function(text) {
			   return text;
		       }
		      );
}

function screen3(karma, content) {
     var objects = [ {name:'स्केल', kind: 'reading'},
		    {name:'कलम', kind: 'reading'},
		    {name:'इरेजर', kind: 'reading'},
		    {name:'किताब', kind: 'reading'},
		    {name:'बल', kind: 'playing'},
		    {name:'तास', kind: 'playing'},
		    {name:'ब्याट', kind: 'playing'},
		    {name:'क्याराम', kind: 'playing'},
		    {name:'झोला', kind: 'carrying'},
		    {name:'बाल्टिन', kind: 'carrying'},
		    {name:'गाग्रो', kind: 'carrying'},
		    {name:'डालो', kind: 'carrying'}
		  ];
    var drop_targets = [ {name: 'reading', text: 'पढ्ने सामग्रीको  समूह'},
			 {name: 'playing', text: 'खेल्ने सामग्रीको समूह'},
			 {name: 'carrying', text: 'बोक्ने सामग्रीको समूह'}
		       ];

    createCommonScreen(karma,
		       content,
		       objects,
		       drop_targets,
		       function() {
			   $('#linkPrevLesson').show();
		       },
		       function(text) {
			   return text;
		       }
		      );

}

setUpMultiScreenLesson([screen1,
			screen2,
			screen3
		       ]);
