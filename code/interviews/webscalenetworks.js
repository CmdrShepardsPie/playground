"use strict";
/**
 * Printing Pyramid
 *
 * A function is given with positive number N.
 * Then the function needs to print pyramid to the console using '*' as characters.
 * Make sure to have spaces around '*' to unify the length of each pyramid layers.
 *
 * ex)
 * printPyramid(2);
 * ' * '
 * '***'
 *
 * printPyramid(3);
 * '  *  '
 * ' *** '
 * '*****'
 *
 * printPyramid(4);
 * '   *   '
 * '  ***  '
 * ' ***** '
 * '*******'
 */
function printPyramid(pieces) {
    const pyramid = [];
    const maxWidth = (pieces * 2) - 1;
    for (let row = 1; row <= pieces; row++) {
        const rowPieces = ((row * 2) - 1);
        console.log(buildRow(maxWidth, rowPieces));
    }
}
function buildRow(maxWidth, fillWidth) {
    const row = [];
    const totalPadding = maxWidth - fillWidth;
    for (let i = 0; i < maxWidth; i++) {
        if (i < (totalPadding / 2) || i > ((maxWidth) - (totalPadding / 2) - 1)) {
            row.push(' ');
        }
        else {
            row.push('*');
        }
    }
    return row.join('');
}
console.log('2');
printPyramid(2);
console.log('');
console.log('3');
printPyramid(3);
console.log('');
console.log('4');
printPyramid(4);
console.log('');
console.log('5');
printPyramid(5);
console.log('');
//# sourceMappingURL=webscalenetworks.js.map