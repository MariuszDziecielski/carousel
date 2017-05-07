$(function () {
    var carouselList = $("#carousel ul"),
        carouselElem = $('#carousel'),
        carouselWidth = parseInt(carouselElem.css('width'), 10);
    setInterval(changeSlide, 3000);
    function changeSlide() {
        carouselList.animate({'marginLeft': -carouselWidth}, 500, moveFirstSlide);
    }
    function moveFirstSlide() {
        var firstItem = carouselList.find("li:first"),
            lastItem = carouselList.find("li:last");
        lastItem.after(firstItem);
        carouselList.css({marginLeft: 0});
    }
});