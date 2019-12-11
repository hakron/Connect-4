//variables
var playerTurn = "one";
var btn = $(".btn");
var turn = $("#turn");
var slots = $(".slot");
var winnerText = $(".winner");
var layer = $("#layer");
$(document).ready(function Token() {
    //trigger the resetBoard function in a btn
    btn.click(() => resetBoard());
    slots.click(function(e) {
        //function that allows to drop the toke with anim
        var column = $(e.target).closest(".col");
        var slots = column.find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (!slots.eq(i).hasClass("one") && !slots.eq(i).hasClass("two")) {
                slots.eq(i).addClass(playerTurn);
                //create a bounce effect and make the board bigger when you drop the token
                slots.eq(i).effect(
                    "bounce",
                    {
                        times: 3
                    },
                    "slow"
                );
                break;
            }
        }
        checkForWin(column);
        if (playerTurn == "one") {
            playerTurn = "two";
            indicateTurn();
        } else {
            playerTurn = "one";
            indicateTurn();
        }
    });
});

function checkForWin(column) {
    //all checks in a function
    checkWinnerHorizontal();
    checkWinnerVertical(column);
    checkWinnerDiagonal();
}

function checkWinnerVertical(column) {
    //check vertical win
    var slots = column.find(".slot");
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(playerTurn)) {
            count++;
            if (count >= 4) {
                winnerAnimation();
                break;
            }
        } else {
            count = 0;
        }
    }
}

function checkWinnerHorizontal() {
    //check horizontal win
    var row;
    var count = 0;
    var col = $(".col");
    for (var i = 0; i < 6; i++) {
        count = 0;
        row = $(".row" + i);
        for (var j = 0; j < row.length; j++) {
            if (row.eq(j).hasClass(playerTurn)) {
                count++;

                if (count >= 4) {
                    winnerAnimation();
                    return;
                }
            } else {
                count = 0;
            }
        }
    }
}

function checkWinnerDiagonal() {
    //check diagonalWin
    var diagonalWin = [
        // all possible diagonal wins up-down
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [9, 14, 19, 24],
        [5, 10, 15, 20],
        [10, 15, 20, 25],
        [15, 20, 25, 30],
        [11, 16, 21, 36],
        [16, 21, 26, 31],
        [21, 26, 31, 36],
        [8, 15, 22, 29],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [17, 22, 27, 32],
        [22, 27, 32, 37],
        [23, 28, 33, 38],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        [18, 25, 32, 39]
    ];

    for (var i = 0; i < diagonalWin.length; i++) {
        var check1 = slots.eq(diagonalWin[i][0]);
        var check2 = slots.eq(diagonalWin[i][1]);
        var check3 = slots.eq(diagonalWin[i][2]);
        var check4 = slots.eq(diagonalWin[i][3]);

        if (
            check1.hasClass(playerTurn) &&
            check2.hasClass(playerTurn) &&
            check3.hasClass(playerTurn) &&
            check4.hasClass(playerTurn)
        ) {
            winnerAnimation();
            break;
        }
    }
}

function resetBoard() {
    //reset the board and start again
    winnerText.effect("transfer");
    location.reload();
}

function winnerAnimation() {
    // popup a text if there is a winner with anim and a text
    btn.show();
    layer.show();
    winnerText.append("<br>" + "Player" + " " + playerTurn + "</br>");
    winnerText.addClass(playerTurn);
    winnerText.show();
    winnerText.animate(
        {
            top: "50%",
            height: "100px",
            width: "400px"
        },
        1000
    );
    setInterval(function() {
        //shake without a limit till you press the btn
        winnerText.effect("shake", { distance: 30 }, 1000);
    }, 1500);
}

function indicateTurn() {
    //indicate the turn of the current player and changing color
    turn.html("It's your turn Player" + " " + playerTurn).css({
        color: playerTurn == "one" ? "rgb(255, 135, 0)" : "rgb(110, 41, 236)"
    });
}

