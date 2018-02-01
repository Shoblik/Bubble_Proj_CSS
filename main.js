$(document).ready(function () {
        $('.contentWrapper').on('mousemove', function () {
                launch.newCircle();
                circleLimit = 0;
            if (rocketShipOption) {
                launch.rocketBoost();
            } else {
                $('.rocket > img').css({'visibility': 'hidden'});
            }
        });
    $('.navbar').on('mouseover', function () {
        $('.rocket > img').css({'visibility': 'hidden'});
    })
    $('.navbar').on('mouseout', function () {
        $('.rocket > img').css({'visibility': 'visible'});
    });
    $('.contentWrapper').on('transitionend', '.circle', function () {
        $(this).remove();
    });
var circleLimit = 0;
    //*****************Toggle the rocket****************************//
    $('.rocketToggle').on('click', function () {
        if ($('.rocketToggle').hasClass('selected')) {
            $('.rocketToggle').toggleClass('selected');
            $('.rocket > img').css({'visibility': 'hidden'});
            rocketShipOption = false;
        } else {
            $('.rocketToggle').addClass('selected');
            $('.rocket > img').css({'visibility': 'visible'});
            rocketShipOption = true;
        }
    });
    ///////////////////Ball size/////////////////////////////////////////////////
    $('#ballSizePx').on('input', function () {
        launch.maxSize = $('#ballSizePx').val();
        $('.ballSize').addClass('selected');
    });
    $('#transitionTime').on('input', function () {
        launch.transitionTime = $('#transitionTime').val();
        $('.transTime').addClass('selected');
    });
    $('#randomSizeCheckbox').on('click', function() {
        $('.randomSize').toggleClass('selected');
    });
    $('#transitionDelayInput').on('input', function () {
        launch.transitionDelay = $('#transitionDelayInput').val();
        $('.transDelay').addClass('selected');
    });
    $('#randomTransitionTime').on('click', function() {
        $('.randomTransTime').toggleClass('selected');
    });
    $('#linearTransitionCheckbox').on('click', function() {
        $('.linearTransition').toggleClass('selected');
    });
    $('#randomResizeInput').on('input', function() {
        if ($('#randomResizeCheckbox').is(':checked')) {
            $('.randomResize').addClass('selected');
        }
        launch.maxRandomSizeTransition = $('#randomResizeInput').val();
    });
    $('#randomResizeCheckbox').on('click', function() {
        if ($('#randomResizeCheckbox').is(':checked')) {
            $('.randomResize').addClass('selected');
        } else {
            $('.randomResize').removeClass('selected');
        }
    });

    function displayInstructions(instructions) {
        $('.instructions').fadeOut(1000);
        let h1 = $('<h1>').addClass('instructions').text(instructions[displayInstructions.count]);
        setTimeout(function() {
            $('.instructionsContainer').append(h1);

            if (displayInstructions.count === 1) {
                setTimeout(function() {
                    $('.navbar-toggle').click();
                }, 2000);
                setTimeout(function() {
                    $('.navbar-toggle').click();
                }, 6000);
            }
        }, 1000);
        displayInstructions.count++;
    };
    displayInstructions.count = 0;

    let instructInterval = setInterval(function() {
        const instructions = ['make use of the settings menu to customize your experience.', 'Finally check out my Web Portfolio and Github', ''];
        if (displayInstructions.count < instructions.length) {
            displayInstructions(instructions);
        } else {
            clearInterval(instructInterval);
            $('.instructionsContainer').empty();
        }
    }, 4000);
});
var rocketShipOption = false;


function Makecircles(maxTransTime, maxSize) {
    this.transitionDelay = 0;
    this.maxSize = maxSize;
    this.getRandom = function (max) {
        return Math.floor(Math.random() * max) + 1;
    };
    this.newCircle = function () {
        if ($('#randomSizeCheckbox').is(':checked')) {
            var size = this.size();
        } else {
            var size = this.maxSize;
        }

        if ($('#randomTransitionTime').is(':checked')) {
            var transTime = this.getRandom(this.transitionTime);
        } else {
            var transTime = this.transitionTime;
        }

        var newCircle = $('<div>').addClass('heart').css({
            'top': event.clientY + 'px',
            'left': event.clientX + 'px',
            // 'background-color': 'rgb(' + this.getRandom(255) + ',' + this.getRandom(255) + ',' + this.getRandom(255) + ')',
            'transition': transTime + 's',
            'height': size + 'px',
            'width': size + 'px',
            'transition-delay': this.transitionDelay + 's',
        });
        this.circleDiv = newCircle;
        this.renderCircleOnDOM(this.circleDiv);
        this.setting1(this.circleDiv);
    };
    this.circleDiv = null;
    this.size = function () {
        return this.getRandom(this.maxSize);
    };
    this.maxRandomSizeTransition = 200;
    this.transitionTime = maxTransTime;
    this.renderCircleOnDOM = function (newCircle) {
        $('.contentWrapper').append(newCircle);
    };
    this.setting1 = function (circle) {
            if ($('#linearTransitionCheckbox').is(':checked')) {
                var topTransition = Math.floor(Math.random() * 101) + '%';
            } else {
                var topTransition = $(circle).css('top') + 'px';
            }
            if ($('#randomResizeCheckbox').is(':checked')) {
                console.log(this);
                var size = this.getRandom(this.maxRandomSizeTransition);
            } else {
                var size = $('.circle').css('width');
            }
            setTimeout(function () {
            $(circle).css({
                'transition-timing-function': 'linear',
                'left': '115%',
                'top': topTransition,
                'height': size + 'px',
                'width': size + 'px',
            });
            if ($(circle).css('left') > 114) {
                $(circle).remove();
            }
        }, 0)
    };
    this.rocketBoost = function () {
        $('.rocket').css({
            'top': event.screenY + 'px',
            'left': event.screenX + 'px',
        });
    }
}

var launch = new Makecircles(7, 80);
