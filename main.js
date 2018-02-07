$(document).ready(function () {
        $('.contentWrapper').on('mousemove', function () {
            for(let i=0; i<launch.multiplier; i++) {
                launch.newCircle();
            }
            if (rocketShipOption) {
                launch.rocketBoost();
            } else {
                $('.rocket > img').css({'visibility': 'hidden'});
            }
        });
    $('.contentWrapper').on('click', function(e) {
            for (let i = 0; i < launch.splatterMultiplier; i++) {
                launch.newCircle();
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
    $('.linkedIn').on('click', function() {
        var win = window.open('https://www.linkedin.com/in/simon-hoblik-335073148/', '_blank');
        win.focus();
    });
    $('.github').on('click', function() {
        var win = window.open('https://github.com/Shoblik', '_blank');
        win.focus();
    });
    $('.webPortfolio').on('click', function() {
        var win = window.open('https://simonhoblik.com', '_blank');
        win.focus();
    });
    $('.resetBtn').on('click', function() {
       launch =  new Makecircles(7, 80);
       $('.colorDiv').remove();
        $('#randomTransitionTime')[0].checked = true;
        $('.randomTransTime').addClass('selected');

        $('#randomSizeCheckbox')[0].checked = true;
        $('.randomSize').addClass('selected');

        $('#linearTransitionCheckbox')[0].checked = true;
        $('.linearTransition').addClass('selected');

        $('#randomResizeCheckbox')[0].checked = false;
        $('.randomResize').removeClass('selected');

        $('.contentWrapper').css('background-color', 'black');
       $('input').val('');
    });
    $('.multiplierInput').on('input', function() {
        let multiplierInput = $('.multiplierInput').val();
        if (multiplierInput > 1) {
            launch.multiplier = multiplierInput;
        }
        if (multiplierInput > 4 && !launch.seenMultiplierMessage) {
            launch.seenMultiplierMessage = true;
            let message = $('<h3>').addClass('instructions fadeIn').text('Generating particles at rates higher than 4x may cause performance issues').css('color', 'red');
            $('.instructionsContainer').append(message);
            setTimeout(function() {
                $('.instructions').css({
                    'opacity': '0',
                    'transition': '2s'
                });
            }, 4000);
            setTimeout(function() {
                $('.instructionsContainer').empty();
            }, 6000);
        }
    });
    $('.splatterInput').on('input', function() {
       let splatterMultiplier =  $('.splatterInput').val();
       if (splatterMultiplier > 1) {
           launch.splatterMultiplier = splatterMultiplier;
       }
       if (splatterMultiplier > 150 && !launch.seenSplatterMessage) {
           launch.seenSplatterMessage = true;
           let message = $('<h3>').addClass('instructions fadeIn').text('Generating particle splatters at rates higher than 150 particles per click may cause performance issues').css('color', 'red');
           $('.instructionsContainer').append(message);
           setTimeout(function() {
               $('.instructions').css({
                   'opacity': '0',
                   'transition': '2s'
               });
           }, 5000);
           setTimeout(function() {
               $('.instructionsContainer').empty();
           }, 7000);
       }
    });
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
    $('.customColorBtn').on('click', function() {
       $('.colorSelectionDiv').toggleClass('showColorSelection');
    });
    $('.addColor').on('click', launch.addColor);
    $('.saveBtn').on('click', function() {
        $('.historyDiv').toggleClass('showHistoryDiv');
    })
    $('.randomColorBtn').on('click', function() {
       if ($('.randomColorBtn').hasClass('btn-danger')) {
           $('.randomColorBtn').removeClass('btn-danger').addClass('btn-success').text('Random Color: Off');
           launch.randomColor = false;
       } else {
           $('.randomColorBtn').removeClass('btn-success').addClass('btn-danger').text('Random Color: On');
           launch.randomColor = true;
       }
    });
    $('.newColorInput').on('click', function() {
        $(document).keypress(function (e) {
            if (e.which === 13) {
                launch.addColor();
            }
        });
    });
    //EVENT DELEGATOR FOR COLORDIV
    $('.colorSelectionDiv').on('click', '.colorDeleteBtn', function(e) {
        let colorIndex = $('.colorDeleteBtn').index(this);
        console.log(colorIndex);
        launch.colorArr.splice(colorIndex, 1);
        console.log(launch.colorArr);
        $(this).parent().remove();
    })
    //custom background color in the menu
    $('.customizeBackground').on('click', function() {
        $(document).keypress(function (e) {
            if (e.which == 13) {
                let input = $('.customizeBackground').val();
                let tempInput = input.split(',');
                if (tempInput.length > 1) {
                    //rgb input
                    $('.contentWrapper').css('background-color', 'rgb('+tempInput[0]+','+tempInput[1]+','+tempInput[2]+')');
                } else {
                    $('.contentWrapper').css('background-color', input);
                }
            }
        });
    });

    //instructions that run on page load
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
    this.multiplier = 1;
    this.splatterMultiplier = 50;
    this.seenMultiplierMessage = false;
    this.seenSplatterMessage = false;
    this.randomColor = true;
    this.colorArr = [];
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

        if (this.randomColor) {
            var backgroundColor = 'rgb(' + this.getRandom(255) + ',' + this.getRandom(255) + ',' + this.getRandom(255) + ')';
        } else {
            if (this.colorArr.length === 1) {
                var backgroundColor = this.colorArr[0];
            } else {
                function randomNum(max) {
                    return Math.floor(Math.random() * max);
                }
                let randomIndex = randomNum(this.colorArr.length);
                var backgroundColor = this.colorArr[randomIndex];
            }
        }

        var newCircle = $('<div>').addClass('circle').css({
            'top': event.clientY + 'px',
            'left': event.clientX + 'px',
            'background-color': backgroundColor,
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
    this.addColor = function() {
        let newColor = $('.newColorInput').val();
        let newColorArr = newColor.split(',');
        if (newColorArr.length === 1) {
            newColor = newColor.replace(" ", '');
        } else {
            newColor = 'rgb('+newColorArr[0]+','+newColorArr[1]+','+newColorArr[2]+')';
        }
        launch.colorArr.push(newColor);
        let colorDiv = $('<div>').addClass('colorDiv').text('').css('background-color', newColor);
        let deleteBtn = $('<span>').addClass('colorDeleteBtn glyphicon glyphicon-remove');
        $(colorDiv).append(deleteBtn);
        $('.colorSelectionDiv').append(colorDiv);
        $('.newColorInput').val('');
    };
    this.rocketBoost = function () {
        $('.rocket').css({
            'top': event.screenY + 'px',
            'left': event.screenX + 'px',
        });
    }
}

var launch = new Makecircles(7, 80);
