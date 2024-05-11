const myCarousel = document.getElementById('myCarousel')

myCarousel.addEventListener('slide.bs.carousel', event => {
  // do something...
})

const carouselItems = myCarousel.querySelectorAll('.carousel-item')

let currentSlide = 0

const updateCarousel = () => {
  carouselItems.forEach((item, index) => {
    if (index === currentSlide) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}

const nextSlide = () => {
  if (currentSlide < carouselItems.length - 1) {
    currentSlide++
  } else {
    currentSlide = 0
  }
  updateCarousel()
}

const prevSlide = () => {
  if (currentSlide > 0) {
    currentSlide--
  } else {
    currentSlide = carouselItems.length - 1
  }
  updateCarousel()
}

const carouselControlPrev = myCarousel.querySelector('.carousel-control-prev')
const carouselControlNext = myCarousel.querySelector('.carousel-control-next')

carouselControlPrev.addEventListener('click', prevSlide)
carouselControlNext.addEventListener('click', nextSlide)

setInterval(() => {
  nextSlide()
}, 5000)