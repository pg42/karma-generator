// -*- coding: utf-8 -*-

function generateTask() {
    var divisor = Karma.rand(2,12);
    // Dividend should be between 20 and 99 (inclusive).
    var quotient_low = Math.floor((20 - 1) / divisor) + 1;
    var quotient_high = Math.ceil((99 + 1) / divisor) - 1;
    var quotient = randomElement(range(quotient_low, quotient_high + 1));
    var dividend = quotient * divisor;
    return {
        question: dividend + ' ÷ ' + divisor + ' = ',
        answer: quotient
    };
}
