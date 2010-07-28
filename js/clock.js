function Clock() {
    $('#footer')
        .append(createDiv('timerBar')
                .append(createDiv('picClock'))
                .append(createDiv('timerBox1').addClass('timerBoxes'))
                .append(createDiv('timerBox2').addClass('timerBoxes'))
                .append(createDiv('timerBox3').addClass('timerBoxes'))
                .hide());
    this.seconds = 0;
    this.interval_id = null;
    this.display();
}

Clock.prototype.start = function () {
    var clock = this;
    this.interval_id = setInterval(function () { clock.tick(); },
                                   1000);
};

Clock.prototype.tick = function () {
    this.seconds++;
    this.display();
};

Clock.prototype.hours_minutes_seconds = function() {
    var s = this.seconds;
    var m = Math.floor(s / 60);
    s = s % 60;
    var h = Math.floor(m / 60);
    m = m % 60;
    return {hours: h, minutes: m, seconds: s};
};

Clock.prototype.display = function() {
    var hms = this.hours_minutes_seconds();
    $('#timerBox1').html(padLeft(hms.seconds, '0', 2));
    $('#timerBox2').html(padLeft(hms.minutes, '0', 2));
    $('#timerBox3').html(padLeft(hms.hours, '0', 2));
};

Clock.prototype.stop = function () {
    if (this.interval_id) {
        clearInterval(this.interval_id);
        this.interval_id = null;
    }
};

Clock.prototype.reset = function () {
    this.stop();
    this.seconds = 0;
    this.display();
};

Clock.prototype.hide = function () {
    $('#timerBar').hide();
}

Clock.prototype.show = function () {
    $('#timerBar').show();
}