function generateTask() {
    var addend1 = Karma.rand(10,99);
    var addend2 = Karma.rand(10,99);
    var sum = addend1 + addend2;
    return {
        question: addend1 + ' + ' + addend2 + ' = ',
        answer: sum
    };
}
