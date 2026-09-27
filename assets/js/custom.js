(function () {
	"use strict";

	window.onload = function () {

		// Preloader JS
		const getPreloaderId = document.getElementById('preloader');
		if (getPreloaderId) {
			getPreloaderId.style.display = 'none';
		}

		// Header Sticky
		const getNavbarId = document.getElementById("navbar");
		if (getNavbarId) {
			window.addEventListener('scroll', event => {
				const height = 150;
				const { scrollTop } = event.target.scrollingElement;
				document.querySelector('#navbar').classList.toggle('sticky', scrollTop >= height);
			});
		}
	};

	// Back to Top JS
	const getId = document.getElementById("backtotop");
	if (getId) {
		const topbutton = document.getElementById("backtotop");
		topbutton.onclick = function (e) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		};
		window.onscroll = function () {
			if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
				topbutton.style.opacity = "1";
			} else {
				topbutton.style.opacity = "0";
			}
		};
	}

	// Toggler JS
	const getnavbarTogglerId = document.getElementById('navbar_toggler');
	if (getnavbarTogglerId) {

		document.querySelector('.navbar-toggler').addEventListener('click', function () {
			this.classList.toggle('open');
		});

	}

	const getExchangeId = document.getElementById('exchange-form');
	if (getExchangeId)  {
		const rates = {
			ETH: { usd: 1750, icon: 'eth.svg' },
			BTC: { usd: 26000, icon: 'btc.svg' },
			BNB: { usd: 250, icon: 'bnb.svg' },
			ADA: { usd: 0.38, icon: 'ada.svg' },
			SOL: { usd: 50, icon: 'sol.svg' },
			XRP: { usd: 0.55, icon: 'xrp.svg' },
			DOGE: { usd: 0.09, icon: 'doge.svg' },
			TRX: { usd: 0.12, icon: 'trx.svg' }
		};

		// DOM elements
		const sellCrypto = document.getElementById('sellCrypto');
		const buyCrypto = document.getElementById('buyCrypto');
		const sellAmount = document.getElementById('sellAmount');
		const sellUsd = document.getElementById('sellUsd');
		const buyAmount = document.getElementById('buyAmount');
		const buyUsd = document.getElementById('buyUsd');
		const sellSymbol = document.getElementById('sellSymbol');
		const buySymbol = document.getElementById('buySymbol');
		const sellIcon = document.getElementById('sellIcon');
		const buyIcon = document.getElementById('buyIcon');

		function updateExchange() {
			const sell = sellCrypto.value;
			const buy = buyCrypto.value;
			const amount = parseFloat(sellAmount.value) || 0;

			const sellRate = rates[sell].usd;
			const buyRate = rates[buy].usd;
			const usdValue = amount * sellRate;
			const convertedBuy = usdValue / buyRate;

			sellUsd.textContent = `$${usdValue.toFixed(2)}`;
			buyAmount.value = convertedBuy.toFixed(2);
			buyUsd.textContent = `$${buyRate}`;
			sellSymbol.textContent = sell;
			buySymbol.textContent = buy;
			sellIcon.src = `assets/images/icons/${rates[sell].icon}`;
			buyIcon.src = `assets/images/icons/${rates[buy].icon}`;
		}

		// Initial load
		updateExchange();

		// Event listeners
		sellCrypto.addEventListener('change', updateExchange);
		buyCrypto.addEventListener('change', updateExchange);
		sellAmount.addEventListener('input', updateExchange);


		const exchangeBtn = document.getElementById('exchangeBtn');

		exchangeBtn.addEventListener('click', function (e) {
			e.preventDefault(); // Prevent link navigation

			const sell = sellCrypto.value;
			const buy = buyCrypto.value;
			const amount = parseFloat(sellAmount.value) || 0;

			if (!amount || amount <= 0) {
				alert("Please enter a valid amount to sell.");
				return;
			}

			const sellRate = rates[sell].usd;
			const buyRate = rates[buy].usd;
			const usdValue = amount * sellRate;
			const convertedBuy = usdValue / buyRate;

			// Output result – for now, show a simple alert
			alert(`You are exchanging ${amount} ${sell} (≈ $${usdValue.toFixed(2)}) for ${convertedBuy.toFixed(4)} ${buy}.`);
		});
	}

	// Feedback Slide JS
	var swiper = new Swiper(".feedback-slide", {
		spaceBetween: 30,
		centeredSlides: false,
		preventClicks: true,
		loop: false,
		autoHeight: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		navigation: {
			nextEl: ".prev1",
			prevEl: ".next1",
		},
		pagination: {
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 1,
			},
			992: {
				slidesPerView: 2,
			},
		}
	});
	
	// Dark/Light Toggle
	const getSwitchToggleId = document.getElementById('switch-toggle');
	if (getSwitchToggleId) {
		const switchtoggle = document.querySelector(".switch-toggle");
		const savedTheme = localStorage.getItem("grimo_theme");
		if (savedTheme) {
			document.body.setAttribute("data-theme", savedTheme);
		}
		switchtoggle.addEventListener("click", function () {
			if (document.body.getAttribute("data-theme") === "dark") {
				document.body.setAttribute("data-theme", "light");
				localStorage.setItem("grimo_theme", "light");
			} else {
				document.body.setAttribute("data-theme", "dark");
				localStorage.setItem("grimo_theme", "dark");
			}
		});
	}

})();

try {
	// function to set a given theme/color-scheme
	function setTheme(themeName) {
		localStorage.setItem('grimo_rtl', themeName);
		document.documentElement.className = themeName;
	}
	// function to toggle between light and dark theme
	function toggleTheme() {
		if (localStorage.getItem('grimo_rtl') === 'rtl') {
			setTheme('ltr');
		} else {
			setTheme('rtl');
		}
	}

	// Immediately invoked function to set the theme on initial load
	(function () {
		if (localStorage.getItem('grimo_rtl') === 'rtl') {
			setTheme('rtl');
			document.getElementById('slider').checked = false;
		} else {
			setTheme('ltr');
			document.getElementById('slider').checked = true;
		}
	})();
} catch { }