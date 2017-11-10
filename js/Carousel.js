class Carousel {
    constructor(element) {
        this.$carouselElem = element;
        this.$carouselList = $("#carousel ul");
        this.$leftControl = $(".left");
        this.$rightControl = $(".right");
        this.$carouselControls = $(".control");
        this.carouselWidth = parseFloat(this.$carouselElem.css('width'), 10);
        this.$firstItem = this.$carouselList.find("li:first");
        this.$lastItem = this.$carouselList.find("li:last");
        this.carouselInterval = 0;
        this.$leftControl.click(event => {
            event.preventDefault();
            clearInterval(this.carouselInterval);
            this.$carouselList.animate({'marginLeft': 0}, 500, () => {
                this.moveSlide("left");
            });
        });
        this.$rightControl.click(event => {
            event.preventDefault();
            clearInterval(this.carouselInterval);
            this.runCarousel();
        });
        this.$carouselControls.hover(
            () => {
                clearInterval(this.carouselInterval);
            },
            () => {
                this.setCarouselInterval();
            }
        );
        $(window).resize(() => {
            clearInterval(this.carouselInterval);
            this.carouselWidth = parseFloat(this.$carouselElem.css('width'), 10);
            this.setCarouselInterval();
        });
    }
    runCarousel() {
        carousel.$carouselList.animate({'marginLeft': -carousel.carouselWidth * 2}, 500, () => {
            carousel.moveSlide("right");
        });
    }
    setCarouselInterval() {
        this.carouselInterval = setInterval(this.runCarousel, 3000);
    }
    moveSlide(direction) {
        this.$firstItem = this.$carouselList.find("li:first");
        this.$lastItem = this.$carouselList.find("li:last");
        if (direction == "right") {
            this.$lastItem.after(this.$firstItem);
        } else if (direction == "left") {
            this.$firstItem.before(this.$lastItem);
        }
        this.$carouselList.css({marginLeft: -this.carouselWidth});
    }
}
const carousel = new Carousel($('#carousel'));
carousel.setCarouselInterval();
carousel.$firstItem.before(carousel.$lastItem);
carousel.$carouselList.css({marginLeft: -carousel.carouselWidth});