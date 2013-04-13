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
            var plugin1 = document.getElementById("plugin1");
            
            if (plugin1) {
                plugin1.style.webkitTransform = "translateX(-400px) rotateY(-60deg)";
            }
            
            var plugin2 = document.getElementById("plugin2");
            
            if (plugin2) {
                plugin2.style.webkitTransform = "translateX(-350px) rotateY(-60deg)";
            }
            
            var plugin3 = document.getElementById("plugin3");
            if (plugin3) {
                plugin3.style.webkitTransform = "translateX(-300px) rotateY(-60deg)";
            }
            
            var plugin4 = document.getElementById("plugin4");
            
            if (plugin4) {
                plugin4.style.webkitTransform = "translateX(-250px) rotateY(-60deg)";                    
            }
            
            var plugin5 = document.getElementById("plugin5");
            
            if (plugin5) {            
                plugin5.style.webkitTransform = "translateX(-200px) rotateY(-60deg)";
            }
            
            var plugin6 = document.getElementById("plugin6");
            
            if (plugin6) {
                plugin6.style.webkitTransform = "translateX(-150px) rotateY(-60deg)";
            }
            
            var plugin7 = document.getElementById("plugin7");
            
            if (plugin7) {
                plugin7.style.webkitTransform = "translateX(-100px) rotateY(-60deg)";
            }
            
            var plugin8 = document.getElementById("plugin8");
            if (plugin8) {
                plugin8.style.webkitTransform = "translateX(0px) rotateY(0deg) translateZ(200px)";
            }
            
            var plugin9 = document.getElementById("plugin9");
            
            if (plugin9) {
                plugin9.style.webkitTransform = "translateX(100px) rotateY(60deg)";
            }
            
            var plugin10 = document.getElementById("plugin10");
            if (plugin10) {            
                plugin10.style.webkitTransform = "translateX(150px) rotateY(60deg)";
            }
            
            var plugin11 = document.getElementById("plugin11");
            
            if (plugin11) {
                plugin11.style.webkitTransform = "translateX(200px) rotateY(60deg)";
            }
            
            var plugin12 = document.getElementById("plugin12");
            
            if (plugin12) {
                plugin12.style.webkitTransform = "translateX(250px) rotateY(60deg)";
            }
            
            var plugin13 = document.getElementById("plugin13");
            
            if (plugin13) {
                plugin13.style.webkitTransform = "translateX(300px) rotateY(60deg)";
            }
            
            var plugin14 = document.getElementById("plugin14");
            
            if (plugin14) {            
                plugin14.style.webkitTransform = "translateX(350px) rotateY(60deg)";
            }
            
            var plugin15 = document.getElementById("plugin15");
            
            if (plugin15) {
                plugin15.style.webkitTransform = "translateX(400px) rotateY(60deg)";
            }
            
            var plugin16 = document.getElementById("plugin16");
            
            if (plugin16) {
                plugin16.style.webkitTransform = "translateX(450px) rotateY(60deg)";
            }
            
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
