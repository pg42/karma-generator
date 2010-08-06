var question1 = ['एउटा झोलामा  x ओटा आपहरु छन  ।',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
				'एउटा प्याकेटमा z ओटा कलमहरु छन ।', 
				'एउटा झोलामा  y ओटा आपहरु छन ।',
				'एउटा डालोमा  y ओटा आपहरु छन ।',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
				'एउटा बिस्कुटको प्याकेटमा  x ओटा बिस्कुटहरु छन ।',
				'एउटा बट्टामा z ओटा कलमहरु छन ।'			
			];
var question2 = ['x भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
				'z भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
				'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
				'y भनेको कति हो खनाएर हेर्दा थाहा हुन्छ ।',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',
				'x भनेको कति हो प्याकेट खोलेर  हेर्दा थाहा हुन्छ ।',	
				'z भनेको कति हो बट्टा खोलेर  हेर्दा थाहा हुन्छ ।'
			];
var infoQues = ['आप खन्याउन झोलामा  क्लिक गर्नुहोस ।',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
				'आप खन्याउन झोलामा  क्लिक गर्नुहोस ।',
				'आप खन्याउन डालोमा  क्लिक गर्नुहोस ।',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
				'प्याकेट खोल्न प्याकेटमा  क्लिक गर्नुहोस ।',
				'बट्टा खोल्न बट्टामा  क्लिक गर्नुहोस ।'				
			];
var infoQuesClicked = ['एउटा झोलामा 12 ओटा आपहरु रहेछन ।',
					'एउटा प्याकेटमा 10 ओटा बिस्कुटहरु रहेछन ।',
					'एउटा प्याकेटमा 10 ओटा कलमहरु रहेछन ।',
					'एउटा झोलामा 9 ओटा आपहरु रहेछन ।',
					'एउटा डालोमा 10 ओटा आपहरु रहेछन ।',
					'एउटा प्याकेटमा 15 ओटा बिस्कुटहरु रहेछन ।',
					'एउटा प्याकेटमा 20 ओटा बिस्कुटहरु रहेछन ।',
					'एक बट्टामा 4 ओटा कलमहरु छन ।'
				];

var answers = ['12','10','10','9','10','15','20','4'];
var variables = ['x','x','z','y','y','x','x','z'];
var timer;

function initialize(){
	scoreboardInitialize({});
}

function startLesson(karma) {
	scoreboardReset();
    var totalCounter = 0;
    var questionNo = Karma.shuffle(range(0, 8));
    var currentQuestion;
    var flagScore;

    $('#content')
        .empty()
        .append(createDiv('section')
			.append(createDiv('leftSide')
				.append(createDiv('topText')
					.html('चलको मान पत्ता लगाउ'))
				.append(createDiv()
					.addClass('bgQues'))
				.append(createDiv()
					.addClass('bgAns'))
			)
			.append(createDiv('rightSide')
				.append(createDiv('question1')
					.addClass('bgQuestion'))
				.append(createDiv('question2')
					.addClass('bgQuestion'))
				.append(createDiv()
					.addClass('bgInfo'))
			)
        )   
       $('#linkCheck')
			.unclickable()
			.clickable(
				function () {
					if(answers[currentQuestion] === $('.textBox').val()){
						if (flagScore == false)
							scoreboardHit();
						else
							scoreboardMiss();
						
						$('#linkCheck')
							.hide();												
						karma.play('correct');
						totalCounter++;
						timer = setTimeout(nextQuestion, 1000);
					}else{
						flagScore = true;
						karma.play('incorrect');
					}              
		});		
		
	var nextQuestion = function(){
		flagScore = false;
		if (totalCounter == 8) {
			$('#content')
				.empty()
				.append(createDiv('gameOver'));
		} else {					
			currentQuestion = questionNo[totalCounter]
			img_name = 'img' + currentQuestion;
			
			$('.bgAns').hide(); 
			$('.bgQues')
				.empty()
				.append(karma.createImg(img_name)
					.attr('id', img_name)
					.clickable(function(){
							$('#linkCheck')
								.show();																
							$('.bgQues')
								.empty()
								.append(karma.createImg(img_name + 'Clicked')
									.attr('id', img_name))
							$('.bgAns')
								.empty()
								.show()
								.append(createDiv('ans')
									.addClass('quesText')
									.append('तेसो भए यहा ' +variables[currentQuestion] + "=")
									.append($(document.createElement('input'))
										.attr('class','textBox')
										.attr('maxlength', '2')									
									)
									.append(' हुन्छ ।')
								);							
							$('.bgInfo')
								.addClass('quesText')
								.html(infoQuesClicked[currentQuestion]);							
							$('.textBox').focus();							
					}));					 	
			$('#question1')
				.empty()
				.addClass('quesText')
				.html(question1[currentQuestion]);
			$('#question2')
				.empty()
				.addClass('quesText')
				.html(question2[currentQuestion]);
			$('.bgInfo')
				.addClass('quesText')
				.html(infoQues[currentQuestion]);			
		}
	};
	nextQuestion();		
}
setUpLesson(initialize, startLesson);
