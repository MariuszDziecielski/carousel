class Carousel {
    constructor(element) {
        this.$carouselElem = element;
        this.$carouselList = $("#carousel ul");
        this.$carouselControls = $(".control");
        this.carouselWidth = parseFloat(this.$carouselElem.css('width'), 10);
        this.$firstItem = this.$carouselList.find("li:first");
        this.$lastItem = this.$carouselList.find("li:last");
        this.carouselInterval = 0;
        this.$carouselControls.on({
            click: e => {
                this.handleCarouselControl(e);
            },
            mouseenter: () => {
                clearInterval(this.carouselInterval);
            },
            mouseleave: () => {
                this.setCarouselInterval();
            }
        });
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
    handleCarouselControl(e) {
        e.preventDefault();
        clearInterval(this.carouselInterval);
        if ($(e.target).is(".right")) {
            this.runCarousel();
        } else {
            this.$carouselList.animate({'marginLeft': 0}, 500, () => {
                this.moveSlide("left");
            });
        }
    }
    moveSlide(direction) {
        this.$firstItem = this.$carouselList.find("li:first");
        this.$lastItem = this.$carouselList.find("li:last");
        if (direction == "right") {
            this.$lastItem.after(this.$firstItem);
        } else {
            this.$firstItem.before(this.$lastItem);
        }
        this.$carouselList.css({marginLeft: -this.carouselWidth});
    }
}
const carousel = new Carousel($('#carousel'));
carousel.setCarouselInterval();
carousel.$firstItem.before(carousel.$lastItem);
carousel.$carouselList.css({marginLeft: -carousel.carouselWidth});