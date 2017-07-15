$(function () {
    var $carouselList = $("#carousel ul"),
        carouselInterval,
        $carouselElem = $('#carousel'),
        carouselWidth = parseFloat($carouselElem.css('width'), 10),
        $firstItem = $carouselList.find("li:first"),
        $lastItem = $carouselList.find("li:last"),
        $leftControl = $(".left"),
        $rightControl = $(".right"),
        $carouselControls = $(".control");
    function runCarousel() {
        $carouselList.animate({'marginLeft': -carouselWidth * 2}, 500, function () {
            moveSlide("right");
        });
    }
    function setCarouselInterval() {
        carouselInterval = setInterval(runCarousel, 3000);
    }
    setCarouselInterval();
    $firstItem.before($lastItem);
    $carouselList.css({marginLeft: -carouselWidth});
    function moveSlide(direction) {
        $firstItem = $carouselList.find("li:first");
        $lastItem = $carouselList.find("li:last");
        if (direction == "right") {
            $lastItem.after($firstItem);
        } else if (direction == "left") {
            $firstItem.before($lastItem);
        }
        $carouselList.css({marginLeft: -carouselWidth});
    }
    $leftControl.click(function (event) {
        event.preventDefault();
        clearInterval(carouselInterval);
        $carouselList.animate({'marginLeft': 0}, 500, function () {
            moveSlide("left");
        });
    });
    $rightControl.click(function (event) {
        event.preventDefault();
        clearInterval(carouselInterval);
        runCarousel();
    });
    $carouselControls.hover(
        function () {
            clearInterval(carouselInterval);
        },
        function () {
            setCarouselInterval();
        }
    );
    $(window).resize(function () {
        clearInterval(carouselInterval);
        carouselWidth = parseFloat($carouselElem.css('width'), 10);
        setCarouselInterval();
    });
});