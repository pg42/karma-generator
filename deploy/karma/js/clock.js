var AbstractTimer = Object.create(
    {},
    {
        initialize: function () {
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
            return this;
        },
        start: function () {
            var that = this;
            this.interval_id = setInterval(function () { that.tick(); },
                                           1000);
        },
        stop: function () {
            if (this.interval_id) {
                clearInterval(this.interval_id);
                this.interval_id = null;
            }
        },
        reset: function () {
            this.stop();
            this.seconds = 0;
            this.display();
        },
        tick: toBeOverridden('tick'),
        hoursMinutesSeconds: function () {
            var s = this.seconds;
            var m = Math.floor(s / 60);
            s = s % 60;
            var h = Math.floor(m / 60);
            m = m % 60;
            return {hours: h, minutes: m, seconds: s};
        },
        display: function () {
            var hms = this.hoursMinutesSeconds();
            $('#timerBox1').html(padLeft(hms.seconds, '0', 2));
            $('#timerBox2').html(padLeft(hms.minutes, '0', 2));
            $('#timerBox3').html(padLeft(hms.hours, '0', 2));
        },
        hide: function () {
            $('#timerBar').hide();
        },
        show: function () {
            $('#timerBar').show();
        }
    }
);

var Clock = Object.create(
    AbstractTimer,
    {
        tick: function () {
            ++this.seconds;
            this.display();
        }
    }
);

function createClock() {
    return Object.create(Clock, {})
        .initialize();
}

var CountdownTimer = Object.create(
    AbstractTimer,
    {
        initialize: function (callback, seconds) {
            AbstractTimer.initialize();
            this.callback = callback;
            this.setTime(seconds);
            return this;
        },
        tick: function () {
            var current_time = --this.seconds;
            this.display();
            if (current_time == 0) {
                this.stop();
                this.callback();
            }
        },
        setTime: function (seconds) {
            this.time = seconds;
            this.display();
        }
    }
);

function createCountdownTimer(callback, seconds) {
    return Object.create(CountdownTimer, {})
        .initialize(callback, seconds);
}
