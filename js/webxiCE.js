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
    $('#myImg').attr('src', e.target.result);

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

function adjOpacity(input,target) {
    $(input).on("input", function() {
        var inputNum = $(this).val();
        var inputVal = inputNum / 100;
        $(target).css("opacity",inputVal);
    });
};

// Set color from jscolor

function overlayColor() {
    var color = $(".color-input").css("background-color");
    $(".post-overlay").css("background", color);
};

function titleColor() {
    var color = $(".title-color-input").css("background-color");
    $(".post-title-text").css("color", color);
};

function mainColor() {
    var color = $(".main-color-input").css("background-color");
    $(".post-main-text").css("color", color);
};

function subtitleColor() {
    var color = $(".subtitle-color-input").css("background-color");
    $(".post-subtitle").css("color", color);
};

function usernameColor() {
    var color = $(".username-color-input").css("background-color");
    $(".post-credit").css("color", color);
};

// Set css properties for divs

function cssApply(inputSource,cssTarget,propertyType,units) {
    $(inputSource).on("input", function() {
        var inputVal = $(inputSource).val();
        $(cssTarget).css(propertyType, inputVal + units);
    });
};

// slider number display updater

function slideDisplay(inputSource,displayElement,adjustments,units) {
    $(inputSource).on("input", function() {
        var inputVal = $(inputSource).val();
        var finalVal = Number(inputVal) + Number(adjustments);
        $(displayElement).text(Number(finalVal) + units);

    });
};

// set alignment buttons to change colors when enabled, and apply text alignment css properties to corresponding elements

function alignmentButtons(buttonGroup,cssTarget) {
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
    });
};

// Make objects draggable

function contentDrag() {
    // set draggable object paramenters using jquery UI
    $( function() {
        $( ".draggable" ).draggable({
            grid: [ 10, 10 ],
            containment: ".post-content",
            start: function (e){
                $(this).children().removeClass("notdrag");
            },
            stop: function (e){
                var l = ( 100 * parseFloat($(this).css("left")) / parseFloat($(this).parent().css("width")) ) + "%" ;
                var t = ( 100 * parseFloat($(this).css("top")) / parseFloat($(this).parent().css("height")) ) + "%" ;
                $(this).css("left" , l);
                $(this).css("top" , t);
                setTimeout(function(){
                    $(e.target).children().addClass("notdrag");
                }, 100);
            }
        });
    });
};

// change font styling when button selected. font styles applied by clicking on words

// split input text into spans for styling clicks

function textModify(text) {
    $()
        var str = $(text).text();
        var words = str.split(" ");
        var spanstring = "";

        $.each(words, function(index, value){
            spanstring += "<span class='notdrag style-span' onclick='styleSpan(this)'>" + value + "</span> ";
        });
        $(text).html(spanstring);
};

// Set text to be editable

function textApply() {

    $(".text-edit").click(function() {

        $(this).toggleClass("edit-disabled edit-enabled");

        if ($(this).hasClass("edit-enabled")) {

            $(".draggable").draggable("disable");

            $(".post-line").addClass("editing-on");

            $(".edit-text-icon").removeClass("fa-lock").addClass("fa-lock-open");
            $(".editing-text").text(" Done Editing").css("color", "#f74a6a");
            $(".editing-warning").show();

            $(".post-line").children().removeClass("notdrag");

            $(".post-title-text").text($(".post-title-text").text());
            $(".post-main-text").text($(".post-main-text").text());
            $(".post-subtitle").text($(".post-subtitle").text());
            $(".post-credit").text($(".post-credit").text());

            $(".post-title-text").addClass("title-label");
            $(".post-main-text").addClass("main-label");
            $(".post-subtitle").addClass("subtitle-label");
            $(".post-credit").addClass("credit-label");

            $(".post-line").attr("contenteditable", "true");

        } else if ($(this).hasClass("edit-disabled")) {

            $(".draggable").draggable("enable");

            $(".post-line").removeClass("editing-on");

            $(".post-line").children().addClass("notdrag");

            $(".edit-text-icon").removeClass("fa-lock-open").addClass("fa-lock");
            $(".editing-text").text(" Edit Text").css("color", "white");
            $(".editing-warning").hide();

            $(".post-title-text").removeClass("title-label");
            $(".post-main-text").removeClass("main-label");
            $(".post-subtitle").removeClass("subtitle-label");
            $(".post-credit").removeClass("credit-label");

            textModify(".post-title-text");
            textModify(".post-main-text");
            textModify(".post-subtitle");
            textModify(".post-credit");

            $(".post-line").attr("contenteditable", "false");

        };

    });

};

// style / un-style when clicking on items.

var styleButton = "bold";

function styleSpan(elem) {
    if ($(elem).hasClass("notdrag")) {
        $(elem).toggleClass(styleButton);
        strikeUnder(elem);
    };
};

// change which style to apply with clicks, depending on which button has been pressed.

function fontStyleButtons() {
    $(".style-button").click(function(e) {
        $(".style-button").removeClass("btn-enabled").addClass("btn-disabled");
        $(e.target).toggleClass("btn-enabled btn-disabled");
        var style = $(e.target).data("filter");

        styleButton = style;

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

var bg = {
    brightness : "brightness(70%) ",
    contrast: "contrast(130%) ",
    hue: "hue-rotate(0deg) ",
    saturate: "saturate(115%) ",
    grayscale: "grayscale(0%) ",
    sepia: "sepia(0%) ",
    invert: "invert(0%) ",
    blur: "blur(4px) ",
    opacity: "opacity(100%) "
};

var filterList = "";

function bgfilter() {

    $('.bg-filter-tabs').on('input', '.slider-tag input', function() {
        var filter, value;
        filter = $(this).data('filter');
        value = $(this).val();

        if (filter == "hue-rotate") {
            eval("bg.hue = '" + filter + "(" + value + "deg) '");
        } else if (filter == "blur") {
            eval("bg.blur = '" + filter + "(" + value + "px) '");
        } else {
            eval("bg." + filter + " = '" + filter + "(" + value + "%) '");
        };

        filterList = bg.brightness + bg.contrast + bg.hue + bg.saturate + bg.grayscale + bg.sepia + bg.invert + bg.blur + bg.opacity;

        $("#myImg").css("filter", filterList);

    // set slider value
    $(this).prev().find('.slider-value').text(value + "%");
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

// reset content position 

function resetPosition() {
    $(".position-reset").click(function(e) {
        var txt = $(this).data("filter");
        $("." + txt).css({
            "left": "0%",
            "top": "0%"
        });
    });
};

// Initialize functions
$(document).ready(function() {

// set post text

textApply();
    
// reset text position
resetPosition();
    
// screen size detection
switchCSS($(this).width(),$(this).height());

// content width adjustment sliders
slideDisplay(".title-text-width",".title-text-width-percent","","%");
cssApply(".title-text-width",".post-title-text","width","%");

slideDisplay(".main-text-width",".main-text-width-percent","","%");
cssApply(".main-text-width",".post-main-text","width","%");

slideDisplay(".subtitle-text-width",".subtitle-text-width-percent","","%");
cssApply(".subtitle-text-width",".post-subtitle","width","%");

slideDisplay(".username-text-width",".username-text-width-percent","","%");
cssApply(".username-text-width",".post-credit","width","%");

// make content draggable
contentDrag();

// filter background
bgfilter();

// font styling buttons
fontStyleButtons();

// post text alignment buttons
alignmentButtons(".title-align-button",".post-title-text");
alignmentButtons(".main-align-button",".post-main-text");
alignmentButtons(".subtitle-align-button",".post-subtitle");
alignmentButtons(".username-align-button",".post-credit");

// controls category slide functions
categoryExpand();

// overlay opacity. Overlay color is inline with .color-input div
slideDisplay(".overlay-opacity-input",".overlay-opacity-percent","","%");
adjOpacity(".overlay-opacity-input",".post-overlay");

// title input
// textApply(".title-text-input",".post-title-text","title");
cssApply(".title-font-input",".post-title-text","font-family","");

slideDisplay(".title-font-size",".title-font-size-percent","","px");
cssApply(".title-font-size",".post-title-text","font-size","vmin");

slideDisplay(".title-left-width",".title-left-width-percent","50","%");
cssApply(".title-left-width",".post-title-text","margin-left","vmin");

slideDisplay(".title-line-height",".title-line-height-percent","","%");
cssApply(".title-line-height",".post-title-text","margin-top","vmin");


// main input
// textApply(".main-input",".post-main-text","main");
cssApply(".maintext-font-input",".post-main-text","font-family","");

slideDisplay(".maintext-font-size",".maintext-font-size-percent","","px");
cssApply(".maintext-font-size",".post-main-text","font-size","vmin");

slideDisplay(".main-left-width",".main-left-width-percent","50","%");
cssApply(".main-left-width",".post-main-text","margin-left","vmin");

slideDisplay(".maintext-line-height",".maintext-line-height-percent","","%");
cssApply(".maintext-line-height",".post-main-text","margin-top","vmin");

// subtitle input
// textApply(".subtitle-input",".post-subtitle","subtitle");
cssApply(".subtitle-font-input",".post-subtitle","font-family","");

slideDisplay(".subtitle-font-size",".subtitle-font-size-percent","","px");
cssApply(".subtitle-font-size",".post-subtitle","font-size","vmin");

slideDisplay(".subtitle-left-width",".subtitle-left-width-percent","50","%");
cssApply(".subtitle-left-width",".post-subtitle","margin-left","vmin");

slideDisplay(".subtitle-line-height",".subtitle-line-height-percent","","%");
cssApply(".subtitle-line-height",".post-subtitle","margin-top","vmin");

// username / credit input
// textApply(".tag-input",".post-credit","username");
// textApply(".credit-input",".post-link","username");
cssApply(".username-font-input",".post-credit","font-family","");

slideDisplay(".username-font-size",".username-font-size-percent","","px");
cssApply(".username-font-size",".post-credit","font-size","vmin");

slideDisplay(".username-left-width",".username-left-width-percent","50","%");
cssApply(".username-left-width",".post-credit","margin-left","vmin");

slideDisplay(".username-line-height",".username-line-height-percent","","%");
cssApply(".username-line-height",".post-credit","margin-top","vmin");

// logo image properties
slideDisplay(".logo-size-input",".logo-size-percent","","%");
cssApply(".logo-size-input",".post-company-logo","width","vmin");

slideDisplay(".logo-opacity-input",".logo-opacity-percent","","%");
adjOpacity(".logo-opacity-input",".post-company-logo");

slideDisplay(".logo-width-input",".logo-width-percent","","%");
cssApply(".logo-width-input",".post-company-logo","margin-left","vmin");

slideDisplay(".logo-height-input",".logo-height-percent","","%");
cssApply(".logo-height-input",".post-company-logo","margin-top","vmin");

});