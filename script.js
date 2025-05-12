let point = 0;
let gameRunning = false;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let list = [];
let clist = [];

function resp() {
    $('#res').text('Result').css("background-color", "").css("color", "");
}

function oodu() {
    resp();
    if (gameRunning) return;
    gameRunning = true;
    list = [];
    clist = [];

    let total = getRandomInt(1, 4);

    for (let i = 1; i <= total; i++) {
        setTimeout(() => {
            let temp = getRandomInt(1, 4);
            console.log(`ibox${temp} is working`);
            $(`#ibox${temp}`).css('opacity', 0.5);
            list.push('ibox' + temp);
            setTimeout(() => {
                console.log(`Finished ibox${temp}`);
                $(`#ibox${temp}`).css('opacity', 1);
                if (i === total) {
                    clist = [];
                    gameRunning = false;
                }
            }, 400);
        }, i * 600);
    }
}

$(".ibox").on("click", function () {
    if (gameRunning) return;
    let i = $(this).attr("id");
    clist.push(i);

    if (clist.length === list.length) {
        let correct = true;
        for (let j = 0; j < list.length; j++) {
            if (list[j] !== clist[j]) {
                correct = false;
                break;
            }
        }

        if (correct) {
            $("#res").text("Correct").css("background-color", "green").css("color", "white");
            point++;

            if (point === 10) {
                gameRunning = true;
                let message = "You WIN!!!";
                let see = "";
                let delay = 0;

                for (let j = 0; j < message.length; j++) {
                    setTimeout(() => {
                        see += message[j];
                        $("#res").text(see).css("background-color", "black").css("color", "white");
                    }, delay);
                    delay += 250;
                }

                setTimeout(() => {
                    if (confirm("You WIN!!!\nDo you want to continue?")) {
                        point = 0;
                        gameRunning = false;
                        oodu();
                    } else {
                        window.close(); // Use () to invoke it
                    }
                }, delay + 1000);
            } else {
                setTimeout(oodu, 1000);
            }

        } else {
            point--;
            $("#res").text("Wrong").css("background-color", "white").css("color", "black");

            if (point < 0) {
                gameRunning = true;
                let message = "You Lose";
                let see = "";
                let delay = 0;

                for (let j = 0; j < message.length; j++) {
                    setTimeout(() => {
                        see += message[j];
                        $("#res").text(see).css("background-color", "black").css("color", "white");
                    }, delay);
                    delay += 250;
                }

                setTimeout(() => {
                    point = 0;
                    gameRunning = false;
                    oodu();
                }, delay + 1000);
            }
        }
    }
});

$("#res").on("mouseenter", function () {
    $('#res').text(`${point}`);
});
