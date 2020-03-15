const ranges = RangeTouch.setup('input[type="range"]');

// Image uploading functionality

$(function () {
    $(".bg-file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    localStorage.removeItem("bgurl");
    localStorage.setItem("bgurl", e.target.result);
    $('#myImg').attr('src', e.target.result);
};

window.onload = function() {
    $('#myImg').attr('src', localStorage.getItem("bgurl"));
};

// logo uploading

$(function () {
    $(".logo-file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded2;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded2(e) {
    localStorage.removeItem("logo-img");
    localStorage.setItem("logo-img", e.target.result);
    $('#logoImg').attr('src', e.target.result);
};

// Main categories - expanding functionality

function categoryExpand() {
// toggle sub categories and change classes
$(".input-sub-category").click(function(event) {
    $(event.target).toggleClass("toggle-open toggle-closed");
    $(event.target).next().slideToggle();
});

// toggle main categories, change classes and close other main categories
$(".input-main-category").click(function(event) {
    $(".input-main-category").not(event.target).next().slideUp();
    $(".input-main-category").not(event.target).removeClass("toggle-open").addClass("toggle-closed");
    $(event.target).toggleClass("toggle-open toggle-closed");
    $(event.target).next().slideToggle();
});
};

// overlay opacity

function adjOpacity(input,target,defaultval) {
    if (localStorage) {
        var sVal = localStorage.getItem(target + "Opacity") || defaultval;
        $(target).css("opacity", sVal);
        $(input).val(sVal * 100);
    };

    $(input).on("input", function() {
        var inputNum = $(this).val();
        var inputVal = inputNum / 100;
        $(target).css("opacity",inputVal);

        localStorage.removeItem(target + "Opacity");
        localStorage.setItem(target + "Opacity", inputVal);
    });
};

// Set color from jscolor

function overlayColor() {
    var color = $(".color-input").css("background-color");
    $(".post-overlay").css("background", color);

    localStorage.removeItem("overlayColor");
    localStorage.setItem("overlayColor", color);
};

function titleColor() {
    var color = $(".title-color-input").css("background-color");
    $(".post-title-text").css("color", color);

    localStorage.removeItem("titleColor");
    localStorage.setItem("titleColor", color);
};

function mainColor() {
    var color = $(".main-color-input").css("background-color");
    $(".post-main-text").css("color", color);

    localStorage.removeItem("mainColor");
    localStorage.setItem("mainColor", color);
};

function subtitleColor() {
    var color = $(".subtitle-color-input").css("background-color");
    $(".post-subtitle").css("color", color);

    localStorage.removeItem("subtitleColor");
    localStorage.setItem("subtitleColor", color);
};

function usernameColor() {
    var color = $(".username-color-input").css("background-color");
    $(".post-credit").css("color", color);

    localStorage.removeItem("usernameColor");
    localStorage.setItem("usernameColor", color);
};

// Set css properties for divs

function cssApply(inputSource,cssTarget,propertyType,units,defaultval) {
    if (localStorage) {
        var sVal = localStorage.getItem(inputSource + "prop");
        $(cssTarget).css(propertyType, (sVal || defaultval) + units);
        $(inputSource).val(sVal || defaultval);
    };

    $(inputSource).on("input", function() {
        var inputVal = $(inputSource).val();
        $(cssTarget).css(propertyType, inputVal + units);

        localStorage.removeItem(inputSource + "prop");
        localStorage.setItem(inputSource + "prop", inputVal);
    });
};

// slider number display updater

function slideDisplay(inputSource,displayElement,adjustments,units,defaultval) {
    if (localStorage) {
        var sVal = localStorage.getItem(inputSource + "valdisplay");
        $(displayElement).text((sVal || defaultval) + units);
    };

    $(inputSource).on("input", function() {
        var inputVal = $(inputSource).val();
        var finalVal = Number(inputVal) + Number(adjustments);
        $(displayElement).text(Number(finalVal) + units);

        localStorage.removeItem(inputSource + "valdisplay");
        localStorage.setItem(inputSource + "valdisplay", finalVal);
    });
};

// set alignment buttons to change colors when enabled, and apply text alignment css properties to corresponding elements

function alignmentButtons(buttonGroup,cssTarget,defaultval,defaultbtn) {
    if (localStorage) {
        var sVal = localStorage.getItem(buttonGroup + "alignment");
        var sValbtn = localStorage.getItem(buttonGroup + "button");
        $(cssTarget).css("text-align", sVal || defaultval);
        $(buttonGroup).removeClass("btn-enabled").addClass("btn-disabled");
        $("#" + (sValbtn || defaultbtn)).toggleClass("btn-enabled btn-disabled");
    };

    $(buttonGroup).click(function(event) {
        $(buttonGroup).removeClass("btn-enabled").addClass("btn-disabled");
        $(event.target).toggleClass("btn-enabled btn-disabled");
        if ($(event.target).hasClass("font-left")) {
            $(cssTarget).css("text-align", "left");
        } else if ($(event.target).hasClass("font-center")) {
            $(cssTarget).css("text-align", "center");
        } else if ($(event.target).hasClass("font-right")) {
            $(cssTarget).css("text-align", "right");
        } else if ($(event.target).hasClass("font-justify")) {
            $(cssTarget).css("text-align", "justify");
        };

        var targetbtn = $(event.target).attr("id");
        
        localStorage.removeItem(buttonGroup + "alignment");
        localStorage.removeItem(buttonGroup + "button");
        localStorage.setItem(buttonGroup + "alignment", $(cssTarget).css("text-align"));
        localStorage.setItem(buttonGroup + "button", targetbtn);

    });
};

// reset content position 

function resetPosition() {
    $(".position-reset").click(function(e) {

        var obj = $(this).data("filter");

        $("." + obj).css({
            "left": "0%",
            "top": "0%"
        });

        var posid = $("." + obj).attr("id");

        localStorage.removeItem(posid + "reset");
        localStorage.setItem(posid + "reset", "true");

    });
};

// Make objects draggable

function contentDrag() {
    // set draggable object paramenters using jquery UI
    $( function() {

        var sPositions = localStorage.positions || "{}",
        positions = JSON.parse(sPositions);

        $.each(positions, function (id, pos) {
            var rst = localStorage.getItem(id + "reset");
            if (rst == "true") {
                $("#" + id).css("top", "0%");
                $("#" + id).css("left", "0%");
            } else {
                $("#" + id).css(pos);
            };
        });

        $( ".draggable" ).draggable({
            grid: [ 10, 10 ],
            containment: ".post-content",
            start: function (e){
                $(this).children().removeClass("notdrag");
            },
            stop: function (e, ui){

                var posid = $(e.target).attr("id");

                localStorage.removeItem(posid + "reset");
                localStorage.setItem(posid + "reset", "false");

                var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) ) + "%" ;
                var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) ) + "%" ;
                $(this).css("left" , l);
                $(this).css("top" , t);
                setTimeout(function(){
                    $(e.target).children().addClass("notdrag");
                }, 100);

                var percentposition = {
                    "top" : t,
                    "left" : l
                }
                positions[this.id] = percentposition;
                localStorage.positions = JSON.stringify(positions);

            }
        });
    });
};

// change font styling when button selected. font styles applied by clicking on words

// split input text into spans for styling clicks

function textModify() {

    var target = ["post-title", "post-main", "post-subtitle", "post-credit"];

    if (localStorage) {

        $.each(target, function(index, value) {
            var sVal = localStorage.getItem(target[index] + "text");
            $("." + target[index]).html(sVal || defaultcontent[value]);

            if ( ($(sVal).text()) == ($(defaultcontent[value]).text()) ) {
                $("." + target[index] + "-input").val("");
            } else {
                $("." + target[index] + "-input").val($(sVal).text());
            };
        });
    };

    $(".text-input").on("input", function(e) {

        var str = $(e.target).val();
        var words = str.split(" ");
        var spanstring = "";
        var postarea = $(e.target).data("filter");

        $.each(words, function(index, value){
            spanstring += "<span class='notdrag style-span' onclick='styleSpan(this)'>" + value + "</span> ";
        });
        $("." + postarea).html(spanstring);

        localStorage.removeItem($(e.target).data("filter") + "text");
        localStorage.setItem($(e.target).data("filter") + "text", spanstring);

    });
};

// add editing box and label around elements.

function editbox() {
    $(".text-input").focus(function(e) {
        
        var postarea = $(e.target).data("filter");

        $("." + postarea).addClass(postarea + "-label");
        $("." + postarea).addClass("editing-on");

    });

    $(".text-input").blur(function(e) {
        
        var postarea = $(e.target).data("filter");

        $("." + postarea).removeClass(postarea + "-label");
        $("." + postarea).removeClass("editing-on");

    });
};

// // Set text to be editable

// function textApply() {

//     $(".text-edit").click(function() {

//         $(this).toggleClass("edit-disabled edit-enabled");

//         if ($(this).hasClass("edit-enabled")) {

//             $(".draggable").draggable("disable");

//             $(".post-line").addClass("editing-on");

//             $(".edit-text-icon").removeClass("fa-lock").addClass("fa-lock-open");
//             $(".editing-text").text(" Done Editing").css("color", "#f74a6a");
//             $(".editing-warning").show();

//             $(".post-line").children().removeClass("notdrag");

//             $(".post-title-text").text($(".post-title-text").text());
//             $(".post-main-text").text($(".post-main-text").text());
//             $(".post-subtitle").text($(".post-subtitle").text());
//             $(".post-credit").text($(".post-credit").text());

//             $(".post-title-text").addClass("title-label");
//             $(".post-main-text").addClass("main-label");
//             $(".post-subtitle").addClass("subtitle-label");
//             $(".post-credit").addClass("credit-label");

//             $(".post-line").attr("contenteditable", "true");

//         } else if ($(this).hasClass("edit-disabled")) {

//             $(".draggable").draggable("enable");

//             $(".post-line").removeClass("editing-on");

//             $(".post-line").children().addClass("notdrag");

//             $(".edit-text-icon").removeClass("fa-lock-open").addClass("fa-lock");
//             $(".editing-text").text(" Edit Text").css("color", "white");
//             $(".editing-warning").hide();

//             $(".post-title-text").removeClass("title-label");
//             $(".post-main-text").removeClass("main-label");
//             $(".post-subtitle").removeClass("subtitle-label");
//             $(".post-credit").removeClass("credit-label");

//             textModify(".post-title-text");
//             textModify(".post-main-text");
//             textModify(".post-subtitle");
//             textModify(".post-credit");

//             $(".post-line").attr("contenteditable", "false");

//         };

//     });

// };

// style / un-style when clicking on items.

var styleButton = "bold";

function styleSpan(elem) {
    if ($(elem).hasClass("notdrag")) {
        $(elem).toggleClass(styleButton);
        strikeUnder(elem);

        var postarea = $(elem).parent().attr("id");
        var parentName = "post-" + postarea + "text";

        var textUpdate = $(elem).parent().html();

        localStorage.removeItem(parentName);
        localStorage.setItem(parentName, textUpdate);
    };
};

// change which style to apply with clicks, depending on which button has been pressed.

function fontStyleButtons() {

    if (localStorage) {

        var active = localStorage.getItem("currentstyle") || "bold-btn";

        $(".style-button").removeClass("btn-enabled").addClass("btn-disabled");
        $("#" + active).toggleClass("btn-enabled btn-disabled");
        styleButton = active.replace("-btn", "");
    };
    $(".style-button").click(function(e) {
        $(".style-button").removeClass("btn-enabled").addClass("btn-disabled");
        $(e.target).toggleClass("btn-enabled btn-disabled");
        var style = $(e.target).data("filter");

        styleButton = style;

        var currentStyle = $(e.target).attr("id");

        localStorage.removeItem("currentstyle");
        localStorage.setItem("currentstyle", currentStyle);
    });
};

// if span has both underline and strikethrough classes, add class strikeunder. Remove if either removed.

function strikeUnder(element) {
    var styleSpan = $(element);
    if (styleSpan.hasClass("underline") && styleSpan.hasClass("strikethrough")) {
        styleSpan.addClass("strikeunder");
    } else {
        styleSpan.removeClass("strikeunder");
    };
};

// set background filters and slider values

var filterList = "";

var bg;

function bgfilter() {

    var filterunits = ["%","%","%","deg","%","px","%","%","%"];

    if (localStorage) {

        var filternames = ["brightness","contrast","saturate","hue-rotate","sepia","blur","grayscale","invert","opacity"];
        var defaultfilterval = ["70","130","115","0","0","4","0","0","100"];
        var slidernames = ["bg-brightness-percent","bg-contrast-percent","bg-saturation-percent","bg-hue-percent","bg-sepia-percent","bg-blur-percent","bg-grayscale-percent","bg-invert-percent","bg-opacity-percent"];

        $.each(filternames, function(index, value) {
            var fname = localStorage.getItem(value + "filter") || filternames[index];
            var fval = localStorage.getItem(value + "value") || defaultfilterval[index];
            var funit = filterunits[index];

            filterList += fname + "(" + fval + funit + ") ";
            $("." + slidernames[index]).text(fval + "%");
            $("#" + fname).val(fval);

        });

        $("#myImg").css("filter", filterList);

    };

    bg = filterList.split(" ");
    bg.pop();

    $('.bg-filter-tabs').on('input', '.slider-tag input', function() {
        var filter, value;
        filter = $(this).data('filter');
        value = $(this).val();
        fIndex = $(this).data("index");

        bg[fIndex] = filter + "(" + value + filterunits[fIndex] + ")";

        filterList = bg[0] + " " + bg[1] + " " + bg[2] + " " + bg[3] + " " + bg[4] + " " + bg[5] + " " + bg[6] + " " + bg[7] + " " + bg[8];

        $("#myImg").css("filter", filterList);

        // set slider value
        $(this).prev().find('.slider-value').text(value + "%");

        localStorage.removeItem(filter + "filter");
        localStorage.setItem(filter + "filter", filter);

        localStorage.removeItem(filter + "value");
        localStorage.setItem(filter + "value", value);
    });
};

// change CSS stylesheet depending on screen size (media querly calc() not supported in chrome)

function switchCSS(width,height) {
    var res = $("#responsive").attr("href");
    if ( (width >= (height + 250)) && (res != "stylesheets/desktop.css") ) {
        $("#responsive").attr("href", "stylesheets/desktop.css");
    } else if ( (width >= (height * 0.8)) && (width <= (height + 249)) && (res != "stylesheets/tablet.css") ) {
        $("#responsive").attr("href", "stylesheets/tablet.css");
    } else if ( (width < (height * 0.8)) && (res != "stylesheets/mobile.css") ) {
        $("#responsive").attr("href", "stylesheets/mobile.css");
    } else {
    };
    res = $("#responsive").attr("href");
};

$(window).resize(function() {
    switchCSS($(this).width(),$(this).height());
});

// clear localstorage on click

function resetDefaults() {
    $(".reset-defaults").click(function() {
        var confirmreset = confirm("Are you sure you want to clear the canvas? All changes will be lost.");
            if (confirmreset == true) {
                localStorage.clear();
                location.reload();
            } else {
                return;
            };
    });
};

// run functions on window load

window.onload = function() {
    if (localStorage) {

        // retrieve cached background image and logo image
        $('#myImg').attr('src', localStorage.getItem("bgurl") || "images/default.png");
        $('#logoImg').attr('src', localStorage.getItem("logo-img") || "images/webxi-logo.png");

        // retrieve color settings for overlay and font options
        $(".color-input").css("background-color", localStorage.getItem("overlayColor"));
        $(".post-overlay").css("background", localStorage.getItem("overlayColor"));

        $(".title-color-input").css("background-color", localStorage.getItem("titleColor"));
        $(".post-title-text").css("color", localStorage.getItem("titleColor"));

        $(".main-color-input").css("background-color", localStorage.getItem("mainColor"));
        $(".post-main-text").css("color", localStorage.getItem("mainColor"));

        $(".subtitle-color-input").css("background-color", localStorage.getItem("subtitleColor"));
        $(".post-subtitle").css("color", localStorage.getItem("subtitleColor"));

        $(".username-color-input").css("background-color", localStorage.getItem("usernameColor"));
        $(".post-credit").css("color", localStorage.getItem("usernameColor"));

    };
};

// Initialize functions
$(document).ready(function() {

// reset image defaults

resetDefaults();

// set post text

textModify();

// add edit box when editing text
editbox()
    
// reset text position
resetPosition();
    
// screen size detection
switchCSS($(this).width(),$(this).height());

// content width adjustment sliders
slideDisplay(".title-text-width",".title-text-width-percent","","%","100");
cssApply(".title-text-width",".post-title-text","width","%","100");

slideDisplay(".main-text-width",".main-text-width-percent","","%","100");
cssApply(".main-text-width",".post-main-text","width","%","100");

slideDisplay(".subtitle-text-width",".subtitle-text-width-percent","","%","100");
cssApply(".subtitle-text-width",".post-subtitle","width","%","100");

slideDisplay(".username-text-width",".username-text-width-percent","","%","100");
cssApply(".username-text-width",".post-credit","width","%","100");

// make content draggable
contentDrag();

// filter background
bgfilter();

// font styling buttons
fontStyleButtons();

// post text alignment buttons
alignmentButtons(".title-align-button",".post-title-text","left","title-align-left");
alignmentButtons(".main-align-button",".post-main-text","left","main-align-left");
alignmentButtons(".subtitle-align-button",".post-subtitle","left","subtitle-align-left");
alignmentButtons(".username-align-button",".post-credit","left","credit-align-left");

// controls category slide functions
categoryExpand();

// overlay opacity. Overlay color is inline with .color-input div
slideDisplay(".overlay-opacity-input",".overlay-opacity-percent","","%","80");
adjOpacity(".overlay-opacity-input",".post-overlay","0.8");

// title input
// textApply(".title-text-input",".post-title-text","title");
cssApply(".title-font-input",".post-title-text","font-family","","Montserrat");

slideDisplay(".title-font-size",".title-font-size-percent","","px","4");
cssApply(".title-font-size",".post-title-text","font-size","vmin","4");

slideDisplay(".title-left-width",".title-left-width-percent","50","%");
cssApply(".title-left-width",".post-title-text","margin-left","vmin");

slideDisplay(".title-line-height",".title-line-height-percent","","%");
cssApply(".title-line-height",".post-title-text","margin-top","vmin");


// main input
// textApply(".main-input",".post-main-text","main");
cssApply(".maintext-font-input",".post-main-text","font-family","","Montserrat");

slideDisplay(".maintext-font-size",".maintext-font-size-percent","","px","4");
cssApply(".maintext-font-size",".post-main-text","font-size","vmin","4");

slideDisplay(".main-left-width",".main-left-width-percent","50","%");
cssApply(".main-left-width",".post-main-text","margin-left","vmin");

slideDisplay(".maintext-line-height",".maintext-line-height-percent","","%");
cssApply(".maintext-line-height",".post-main-text","margin-top","vmin");

// subtitle input
// textApply(".subtitle-input",".post-subtitle","subtitle");
cssApply(".subtitle-font-input",".post-subtitle","font-family","","Montserrat");

slideDisplay(".subtitle-font-size",".subtitle-font-size-percent","","px","3");
cssApply(".subtitle-font-size",".post-subtitle","font-size","vmin","3");

slideDisplay(".subtitle-left-width",".subtitle-left-width-percent","50","%");
cssApply(".subtitle-left-width",".post-subtitle","margin-left","vmin");

slideDisplay(".subtitle-line-height",".subtitle-line-height-percent","","%");
cssApply(".subtitle-line-height",".post-subtitle","margin-top","vmin");

// username / credit input
// textApply(".tag-input",".post-credit","username");
// textApply(".credit-input",".post-link","username");
cssApply(".username-font-input",".post-credit","font-family","","Montserrat");

slideDisplay(".username-font-size",".username-font-size-percent","","px","2");
cssApply(".username-font-size",".post-credit","font-size","vmin","2");

slideDisplay(".username-left-width",".username-left-width-percent","50","%");
cssApply(".username-left-width",".post-credit","margin-left","vmin");

slideDisplay(".username-line-height",".username-line-height-percent","","%");
cssApply(".username-line-height",".post-credit","margin-top","vmin");

// logo image properties
slideDisplay(".logo-size-input",".logo-size-percent","","%","10");
cssApply(".logo-size-input",".post-company-logo","width","vmin","10");

slideDisplay(".logo-opacity-input",".logo-opacity-percent","","%","100");
adjOpacity(".logo-opacity-input",".post-company-logo","1");

slideDisplay(".logo-width-input",".logo-width-percent","","%");
cssApply(".logo-width-input",".post-company-logo","margin-left","vmin");

slideDisplay(".logo-height-input",".logo-height-percent","","%");
cssApply(".logo-height-input",".post-company-logo","margin-top","vmin");

});