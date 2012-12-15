(function (coverflow, $, undefined) {

    var min = 1;
    var max = 16;
    var current = 8;
    var currPos = 0;
    var newPos = 0;
    var currAngle = 0;
    var newAngle = 0;
    var gap = 50;
    var clickedIndex = 0;
    var diff = 0;

    coverflow.initialThrust = function() {
        setTimeout(function () {
            document.getElementById("plugin1").style.webkitTransform = "translateX(-400px) rotateY(-60deg)";
            document.getElementById("plugin2").style.webkitTransform = "translateX(-350px) rotateY(-60deg)";
            document.getElementById("plugin3").style.webkitTransform = "translateX(-300px) rotateY(-60deg)";
            document.getElementById("plugin4").style.webkitTransform = "translateX(-250px) rotateY(-60deg)";
            document.getElementById("plugin5").style.webkitTransform = "translateX(-200px) rotateY(-60deg)";
            document.getElementById("plugin6").style.webkitTransform = "translateX(-150px) rotateY(-60deg)";
            document.getElementById("plugin7").style.webkitTransform = "translateX(-100px) rotateY(-60deg)";
            document.getElementById("plugin8").style.webkitTransform = "translateX(0px) rotateY(0deg) translateZ(200px)";
            document.getElementById("plugin9").style.webkitTransform = "translateX(100px) rotateY(60deg)";
            document.getElementById("plugin10").style.webkitTransform = "translateX(150px) rotateY(60deg)";
            document.getElementById("plugin11").style.webkitTransform = "translateX(200px) rotateY(60deg)";
            document.getElementById("plugin12").style.webkitTransform = "translateX(250px) rotateY(60deg)";
            document.getElementById("plugin13").style.webkitTransform = "translateX(300px) rotateY(60deg)";
            document.getElementById("plugin14").style.webkitTransform = "translateX(350px) rotateY(60deg)";
            document.getElementById("plugin15").style.webkitTransform = "translateX(400px) rotateY(60deg)";
            document.getElementById("plugin16").style.webkitTransform = "translateX(450px) rotateY(60deg)";
        }, 500);
    }

    coverflow.moveTo = function (index) {
        clickedIndex = index;

        if (clickedIndex > current) {
            diff = clickedIndex - current;
            for (var i = 1; i <= diff; i++) {
                coverflow.right();
            }
        }
        else if (clickedIndex < current) {
            diff = (current - clickedIndex);
            for (var i = 1; i <= diff; i++) {
                coverflow.left();
            }
        }
    }

    coverflow.left = function() {
        if (current > min) {
            current--;             

            for (var i = 1; i <= max; i++) {

                var plugin = $('#plugin' + i);
                var data = plugin.data();
                currPos = data.cp;
                currAngle = data.a;

                if (currPos == "-100" || currPos == "0") {
                    newPos = parseInt(currPos) + (gap * 2) * (1);
                    if (currPos == "0") {
                        newAngle = -60;
                    }
                    else if (currPos = "-100") {
                        newAngle = 0;
                    }
                    else {
                    }
                }
                else {
                    newPos = parseInt(currPos) + (gap) * (1);
                    newAngle = parseInt(currAngle);
                }

                if (i == current) {
                    plugin.css('webkitTransform', "translateX(" + newPos + "px) rotateY(" + newAngle + "deg) translateZ(200px)");
                }
                else {
                    plugin.css('webkitTransform', "translateX(" + newPos + "px) rotateY(" + newAngle + "deg)");
                }

                plugin.data('cp', newPos);
                plugin.data('a', newAngle);
            }
        }
    }

    coverflow.right = function() {
        if (current < max) {
            current++;           

            for (var i = 1; i <= max; i++) {

                var plugin = $('#plugin' + i);
                var data = plugin.data();
                currPos = data.cp;
                currAngle = data.a;

                if (currPos == "100" || currPos == "0") {
                    newPos = parseInt(currPos) + (gap * 2) * (-1);
                    if (currPos == "0") {
                        newAngle = 60;
                    }
                    else if (currPos = "100") {
                        newAngle = 0;
                    }
                }
                else {
                    newPos = parseInt(currPos) + (gap) * (-1);
                    newAngle = parseInt(currAngle);
                }

                if (i == current) {
                    plugin.css('webkitTransform', "translateX(" + newPos + "px) rotateY(" + newAngle + "deg) translateZ(200px)");
                }
                else {
                    plugin.css('webkitTransform', "translateX(" + newPos + "px) rotateY(" + newAngle + "deg)");
                }

                plugin.data('cp', newPos);
                plugin.data('a', newAngle);
            }
        }
    }

    $(function () {
        coverflow.initialThrust();

        $('#partyMachine-plugins').on('click', '.plugin', function () {
            coverflow.moveTo($(this).index());
        });
    });

}(window.partyMachineCoverflow = window.partyMachineCoverflow || {}, jQuery));