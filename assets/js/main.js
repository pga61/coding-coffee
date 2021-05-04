/**
 * Custom JS file for Coding Coffee website
 */
(function () {
	"use strict";
	/*
		Helper functions
	*/
	// select DOM element
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}

	// set event listener on element
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all)
		if (selectEl) {
			if (all) {
				selectEl.forEach(e => e.addEventListener(type, listener))
			} else {
				selectEl.addEventListener(type, listener)
			}
		}
	}

	// set "on scroll" event listener
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	// Set Navbar links active state when scrolling
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach(navbarlink => {
			if (!navbarlink.hash) return
			let section = select(navbarlink.hash)
			if (!section) return
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				navbarlink.classList.add('active')
			} else {
				navbarlink.classList.remove('active')
			}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)

	// Back to top button visibility handling
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
			} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}

	// Hamburger nav toggle
	on('click', '.hamburger-nav-toggle', function (e) {
		select('body').classList.toggle('hamburger-nav-active')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})

	/**
	 * Scrolling handler using Bootstrap 5 built-in scrollspy feature
	 */
	const scrollto = (el) => {
		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos,
			behavior: 'smooth'
		})
	}

	on('click', '.scrollto', function (e) {
		if (select(this.hash)) {
			e.preventDefault()

			let body = select('body')
			if (body.classList.contains('hamburger-nav-active')) {
				body.classList.remove('hamburger-nav-active')
				let navbarToggle = select('.hamburger-nav-toggle')
				navbarToggle.classList.toggle('bi-list')
				navbarToggle.classList.toggle('bi-x')
			}
			scrollto(this.hash)
		}
	}, true)

	// Add Scrolling behaviors with offset on page load
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});

	/**
	 * Preloader
	 */
	let preloader = select('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove()
		});
	}

	/**
	 * Hero text type effect
	 */
	const typed = select('.typed')
	if (typed) {
		let typed_strings = typed.getAttribute('data-typed-items')
		typed_strings = typed_strings.split('/')
		new Typed('.typed', {
			strings: typed_strings,
			loop: true,
			startDelay: 2000,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 2000
		});
	}

	/**
	 * Event filter behaviors using isotope JS script
	 */
	window.addEventListener('load', () => {
		let eventContainer = select('.event-container');
		if (eventContainer) {
			let eventIsotope = new Isotope(eventContainer, {
				itemSelector: '.event-item'
			});

			let eventFilters = select('#event-filters li', true);

			on('click', '#event-filters li', function (e) {
				e.preventDefault();
				eventFilters.forEach(function (el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');

				eventIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				eventIsotope.on('arrangeComplete', function () {
					AOS.refresh()
				});
			}, true);
		}

	});

	/**
	 * Event lightbox initialization
	 */
	const eventLightbox = GLightbox({
		selector: '.event-lightbox'
	});

	/**
	 * Event details lightbox initialization
	 */
	const eventDetailsLightbox = GLightbox({
		selector: '.event-details-lightbox',
		width: '90%',
		height: '90vh'
	});

	/**
	 * Event details slider
	 */
	new Swiper('.event-details-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		effect: 'cube',
		cubeEffect: {
			slideShadows: true,
		},
	});

	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	/**
	 * Animation on scroll
	 */
	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		})
	});

})()