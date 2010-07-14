$(document).ready(function(){
    $("#content")
        .append(createDiv('section')
            .append(createDiv('left-side')
                .append(createDiv('tv')
                    .append(createDiv('tvLayer').addClass('tvOn'))
                )
                .append(createDiv('cupBoard'))
            )
            .append(createDiv('right-side')
                .append(createDiv('borderWall')
                    .append(createDiv('imgDisplay'))
                )
                .append(createDiv('calcSection'))
            )
        );
        
    for(var i = 0; i< TOTAL_QUES; i++){
        $('#imgDisplay').append(createDiv('img'+i).addClass('default'));
    }
        
    $("#footer").append(createDiv('timerBar')
        .append(createDiv('timerTitle').html('Timer:'))
        .append(createDiv('timerBox1').addClass('timerBoxes'))
    );
    
    $('#timerBar').hide();
	
});