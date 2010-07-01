function scoreboard() {
    return $('#score_box');
}

function scoreboardInitialize(configuration) {
    scoreboard()
        .show()
        .scoreboard(configuration);
}

function scoreboardReset() {
    scoreboard().scoreboard('reset');
}

function scoreboardHit() {
    scoreboard()
        .scoreboard('inc')
        .scoreboard('incTotal');
}

function scoreboardMiss() {
    scoreboard()
        .scoreboard('incTotal');
}

function scoreboardScore() {
    return scoreboard().scoreboard('getScore');
}

function scoreboardTotal() {
    return scoreboard().scoreboard('getTotal');
}
