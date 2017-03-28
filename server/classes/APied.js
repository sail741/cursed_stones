const Constant = require('./Constant');
const Util = require('./Utils');

module.exports = class APied {

    APied(){

    }

    move(board, origin, profondeur) {
        var list_current = [];
        var has_next = [];
        var deja_visite = [];
        var prof = profondeur;
        list_current.push(origin);

        while (list_current.length > 0) {
            var current = list_current.pop();
            if(!Util.containsInArray(deja_visite, current)) {
                deja_visite.push(current);

                if (current.row >= 1 && prof > 0) {
                    if (board[current.row - 1][current.column] === null) {
                        var next = {
                            row: current.row - 1,
                            column: current.column
                        };
                        if (!Util.containsInArray(deja_visite, next)) {
                            has_next.push(next);
                        }
                    }
                }
                if (current.column >= 1 && prof > 0) {
                    if (board[current.row][current.column - 1] === null) {
                        var next = {
                            row: current.row,
                            column: current.column - 1
                        }
                        if (!Util.containsInArray(deja_visite, next)) {
                            has_next.push(next);
                        }
                    }
                }
                if (current.column < Constant.WIDTH_SIZE - 1 && prof > 0) {
                    if (board[current.row][current.column + 1] === null) {
                        var next = {
                            row: current.row,
                            column: current.column + 1
                        };
                        if (!Util.containsInArray(deja_visite, next)) {
                            has_next.push(next);
                        }
                    }
                }
                if (current.row < Constant.HEIGHT_SIZE - 1 && prof > 0) {
                    if (board[current.row + 1][current.column] === null) {
                        var next = {
                            row: current.row + 1,
                            column: current.column
                        };
                        if (!Util.containsInArray(deja_visite, next)) {
                            has_next.push(next);
                        }
                    }
                }

            }

            if (list_current.length == 0) {
                list_current = has_next;
                has_next = [];
                prof--;
            }
        }
        return deja_visite;
    }
}