const Constant = require('./Constant');
const Util = require('./Utils');

module.exports = class Distance {

    attack(board, origin, range, pseudo) {
        var possible = [];

        var testedCase
        var i = 0;
        // On ajoute les "ranges" cases du dessus
        for(i=1; i<=range; i++) {
            if(origin.row - i < 0) {
                break;
            }
            testedCase = board[origin.row - i][origin.column];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row - i,
                    column: origin.column
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases du dessous
        for(i=1; i<=range; i++) {
            if(origin.row + i >= Constant.HEIGHT_SIZE) {
                break;
            }
            testedCase = board[origin.row + i][origin.column];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row + i,
                    column: origin.column
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases de droite
        for(i=1; i<=range; i++) {
            if(origin.column + i >= Constant.WIDTH_SIZE) {
                break;
            }
            testedCase = board[origin.row][origin.column + i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row,
                    column: origin.column + i
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases de gauche
        for(i=1; i<=range; i++) {
            if(origin.column - i < 0) {
                break;
            }
            testedCase = board[origin.row][origin.column - i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row,
                    column: origin.column - i
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases du diagonale HD
        for(i=1; i<=range; i++) {
            if(origin.row - i < 0 || origin.column + i >= Constant.WIDTH_SIZE) {
                break;
            }
            testedCase = board[origin.row - i][origin.column + i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row - i,
                    column: origin.column + i
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases du diagonale HG
        for(i=1; i<=range; i++) {
            if(origin.row - i < 0 || origin.column - i < 0) {
                break;
            }
            testedCase = board[origin.row - i][origin.column - i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row - i,
                    column: origin.column - i
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases de diagonale BD
        for(i=1; i<=range; i++) {
            if(origin.row + i >= Constant.HEIGHT_SIZE || origin.column + i >= Constant.WIDTH_SIZE) {
                break;
            }
            testedCase = board[origin.row + i][origin.column + i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row + i,
                    column: origin.column + i
                });
            }
            if(testedCase != null) {
                break;
            }
        }
        // On ajoute les "ranges" cases de diagonale BG
        for(i=1; i<=range; i++) {
            if(origin.row + i >= Constant.HEIGHT_SIZE || origin.column - i < 0) {
                break;
            }
            testedCase = board[origin.row + i][origin.column - i];
            if((testedCase == null) || (testedCase.pseudo != pseudo)) {
                possible.push({
                    row: origin.row + i,
                    column: origin.column - i
                });
            }
            if(testedCase != null) {
                break;
            }
        }

        return possible;
    }
}