document.addEventListener('DOMContentLoaded', eventDomLoaded);
document.addEventListener("click", eventDocClick, false);
window.addEventListener("load", eventWindowLoad, false);
window.addEventListener("resize", function () { fnDelay(function () { eventWindowResize() }, 300) }, false);

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

window.onbeforeunload = function(){window.scrollTo({top:0,left:0,behavior: "instant"});}

function eventDomLoaded() {
	textPreLoader();	
	tabListFilter.onload();
}
function eventWindowLoad() {
	var partnersList,
		headerMain = document.querySelector(".headerMain");
		vpH = window.innerHeight;

	if(partnersList = document.querySelector(".partners__list")) {
		var partnersListItems = partnersList.querySelectorAll(".partners__list__item");
		partnersListItems.forEach((item) => {
			item.addEventListener("mouseleave", () => {
				item.classList.add("mleaved");
				setTimeout(function() {
					item.classList.remove("mleaved");
				},700);
			});
		});
	}

	if(document.querySelector(".page-index")) {
		if(getCookie("textPreLoader")) {		
			launchAllAnimations();
		}
		else {
			bgs.setPosition();
		}
	}
	else {
		if(!document.querySelector(".textPreloader-container")) {
			launchAllAnimations();
		}
	}

	ScrollTrigger.create({
		trigger: document.body,
		start: "top center",
		onUpdate: (self) => {
			if(self.direction == -1) {
				headerMain.classList.add("show");
				headerMain.classList.remove("hide");				
			}
			else {
				if((window.scrollY > vpH/2)) {					
					headerMain.classList.remove("show");				
					headerMain.classList.add("hide");				
				}
			}
		}
	});
}
function eventWindowResize() {	
	bgs.setPosition();
}
function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;

    while (targ && targ != this) {
    	if(targ.classList.contains("headerMain__menu__bar")) {
    		targ.classList.toggle("active");
    		if(targ.classList.contains("active")) {
    			popup.show(".popup__menu");
    		}
    		else {
    			popup.close(".popup__menu");
    		}
    		break;
    	}
    	if(targ.classList.contains("tablist-filter")) {
    		let tabClicked = undefined;
    		if(clickedEl.getAttribute("data-filterby")) {
    			tabClicked = clickedEl;
    		}
    		else if(clickedEl.parentNode.getAttribute("data-filterby")) {
    			tabClicked = clickedEl.parentNode;
    		}
    		if(tabClicked) {
    			tabListFilter.init(tabClicked, targ);
    			break;
    		}
    		break;
    	}
    	if(targ.classList.contains("bubbles__item")) {
    		if(targ.querySelector(".bubbles__item__inner")) {    			
	    		bubbles.click(targ);
    		}
    		break;
    	}
    	if(targ.classList.contains("cards-slickWrapper-firstLoad")) {
    		if((clickedEl.classList.contains("slick-arrow-inner") && clickedEl.parentNode.classList.contains("slick-next"))
    			||
    			clickedEl.classList.contains("slick-next")
    			) {
    			targ.classList.remove("cards-slickWrapper-firstLoad");
    		}
    	}
    	if(targ.classList.contains("tab-grouping")) {    		
		    setTimeout(bgs.setPosition, 300);
		    break;
    	}

        targ = targ.parentNode;
    }
}
function launchAllAnimations() {
	logosRunningLines();
	orbitaPills();
	teamOnMain();
	bubbles.init();
	plusSpin();
	sectionParalax();
	bgs.setPosition();
	initSlick.check();

	let headerMain = document.querySelector(".headerMain");
	let trigger =  document.querySelector(".contentMain.theme-light");
	ScrollTrigger.create({
		trigger: trigger,
		start: "top 50px",
		end: "bottom 50px",
		onToggle: self => {
			if(self.isActive) {
				headerMain.classList.add("blackOnWhite");
			}
			else {				
				headerMain.classList.remove("blackOnWhite");
			}
		}
	});	
}
var fnDelay = function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}();
var loadJS = function(url, callback, locToInsert){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = callback;
    scriptTag.onreadystatechange = callback;

    locToInsert.appendChild(scriptTag);
};
function imgTobg(img) {
    var _img,
    	parent;

    _img = img;
    
    parent = !!_img.dataset.parent ? document.querySelector(_img.dataset.parent) : _img.parentNode;

    if(parent.tagName.toLowerCase() == "picture") {
    	parent = parent.parentNode;
    }


    if(parent.classList.contains("imgToBg-done")) {
    	return;	
    } 
    
    let src;
    if(_img.parentNode.tagName.toLowerCase() == "picture") {

    	let _prnt = _img.parentNode;
    	let forEachBreak;

    	try {            		
        	_prnt.querySelectorAll("source").forEach((item, i) => {

        		if(window.matchMedia(item.getAttribute("media")).matches) {
            		src = item.dataset.srcset;
            		parent.style.backgroundImage = "url('"+src+"')";
            		parent.classList.add("imgToBg-done");
                    throw forEachBreak;
                }
        	});
    	}
    	catch(e) {
    		if (e !== forEachBreak) throw e;
    	}
    }
    else {
    	parent.style.backgroundImage = "url('"+_img.dataset.src+"')";
		parent.classList.add("imgToBg-done");
    }        
}
function setCookie(name, value, expires) {
    //alert(value);
    var dt = new Date();
    var dtt = "";
    dt.setTime(dt.getTime() + expires * 24 * 60 * 60 * 1000);
    dtt = dt.toGMTString();
    document.cookie = name + "=" + value + ";expires=" + dtt + ";path=/";
}
function getCookie(name) {
    var prefix = name + "=";
    var cookieStartIndex = document.cookie.indexOf(prefix);
    if (cookieStartIndex == -1)
        return null;
    var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = document.cookie.length;
    return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}
function deleteCookie(name) {
    if (getCookie(name)) {
        document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/";
    }
}
/*var callRellax = function(){
	var rellax = new Rellax('.rellax', {
		center: true,
		zIndex:-1
	});
}*/
/*AOS.init({
	offset: 100,
	duration: 3000,
});*/
var tabListFilter = {
	init: function(tab, tabList) {
		this.setTabActive(tab, tabList);
		this.doFilter(tab, tabList.getAttribute("data-target"), true);
	},
	onload: function() {
		var tabList,
		 	targetContentCls,
		 	tabActive;
		if(tabList = document.querySelector(".tablist-filter")) {
			if(targetContentCls = tabList.getAttribute("data-target")) {
				if(document.querySelector("."+targetContentCls)) {
					if(tabActive = tabList.querySelector(".active")) {
						this.doFilter(tabActive, targetContentCls);						
					}
				}
			}
		}
	},
	setTabActive: function(tab, tabList) {
		var prevActive;
		prevActive = tabList.querySelector(".active");
		prevActive.setAttribute("aria-selected", "false");
		prevActive.classList.remove("active");
		tab.classList.add("active");
		tab.setAttribute("aria-selected", "true");
	},
	doFilter: function(tab, targetContentCls, animation) {
		var contentWrapper;
		if(targetContentCls && (contentWrapper = document.querySelector("."+targetContentCls))) {
			var filterCriterion = tab.getAttribute("data-filterby");
			var items = contentWrapper.querySelectorAll("[data-filter]");
			for(let i = 0; i < items.length; i++) {
				if(filterCriterion == "all") {
					if(animation) {
						gsap.set(items[i], {opacity:0})
							.then(() => {items[i].classList.remove("hidden")});
						gsap.to(items[i], {opacity:1, duration:1});
					}
					else {
						items[i].classList.remove("hidden");						
					}
				}
				else {
					if(items[i].getAttribute("data-filter") == filterCriterion) {
						if(animation) {
							gsap.set(items[i], {opacity:0})
								.then(() => {items[i].classList.remove("hidden")});
							gsap.to(items[i], {opacity:1, duration:1});
						}
						else {
							items[i].classList.remove("hidden");							
						}
					}
					// hide no filterCriterion
					else {
						if(animation) {
							items[i].classList.add("hidden");							
						}
						else {
							items[i].classList.add("hidden");							
						}
					}					
				}
			}
		}
	}
};
var initSlick = {
	check: function() {
		var isCardsSlick = document.getElementsByClassName("cards-slick")[0] ? 1 : 0;
		var isGallerySlick = document.getElementsByClassName("gallery-slick")[0] ? 1 : 0;

		if(isGallerySlick) {
			if (typeof $.fn.slick == "undefined") {
	        	loadJS("js/slick1.8.1.min.js", initSlick.start, document.body);
	        }
	        else {
	        	this.startGallery();	        
	        }
		}
		if(window.innerWidth >= 768) {
			if (
					isCardsSlick
				) 
			{
				if (typeof $.fn.slick == "undefined") {
		        	loadJS("js/slick1.8.1.min.js", initSlick.start, document.body);
		        }
		        else {
		        	this.startCards();		        	
		        }
			}		
		}
	},
	startCards: function() {
		var slickWrapper;
		$(".cards-slick").on("init", function(event, slick) {
			slickWrapper = slick.$list[0].closest(".cards-slickWrapper");
			if(slickWrapper.classList.contains("cardBlog-slickWrapper")) {
				initCardBlogSlickWrapper(slickWrapper.clientHeight);
			}
			else if(slickWrapper.classList.contains("cardCalendar-slickWrapper")) {
				initCardCalendarSlickWrapper(slickWrapper.clientHeight);
			}

			if(slickWrapper.classList.contains("cards-slickWrapperForAnimate")) {
				slickWrapper.classList.add("cards-slickWrapper-firstLoad");
			}
		});
		$(".cards-slick").slick(initSlick.cardsSlickParams_1);
	},
	startGallery: function() {
		$(".gallery-slick").slick(initSlick.cardsSlickParams_2);
	},	
	cardsSlickParams_1: {
	    dots: false,
	    infinite: false,
	    speed: 500,
	    slidesToShow: 2,
	    slidesToScroll: 2,
	    slide: 'div',
	    arrows: true,
	    autoplay: false,
	    mobileFirst: true,
	    variableWidth: true,
	    prevArrow:"<button type='button' class='slick-prev slick-arrow pull-left'><span class='slick-arrow-inner'></span></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow pull-right'><span class='slick-arrow-inner'></span></button>",
	    responsive: [
	        {
	            breakpoint: 1279,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 991,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 767,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 300,
	            settings: "unslick"
	        }
	    ]
	},
	cardsSlickParams_2: {
	    dots: false,
	    infinite: false,
	    speed: 500,
	    slidesToShow: 3,
	    slidesToScroll: 1,
	    slide: 'div',
	    arrows: true,
	    autoplay: false,
	    mobileFirst: true,
	    variableWidth: false,
	    infinite: true,
	    centerMode: true,
	    centerPadding: '0px',
	    prevArrow:"<button type='button' class='slick-prev slick-arrow pull-left'><span class='slick-arrow-inner'></span></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow pull-right'><span class='slick-arrow-inner'></span></button>",
	    responsive: [
	        {
	            breakpoint: 1279,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 991,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 767,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        },
	        {
	            breakpoint: 300,
	            settings: {
	                slidesToShow: 3,
	                slidesToScroll: 1
	            }
	        }
	    ]
	}	
};
var bubbles = {
	currAnimation1: undefined,
	currAnimation2: undefined,
	init: function() {
		var bubblesWrapper;
		if(bubblesWrapper = document.querySelector(".bubbles")) {

			ScrollTrigger.create({
				trigger: bubblesWrapper,
				start: "top 90%",
				end: "bottom 50px",
				onToggle: self => {
					if(self.isActive) {						
						action();
					}
					else {
						floating.kill();
					}
				}
			});

			var floating;
			function action() {

				var timeAction = gsap.utils.random(2, 5);

				floating = gsap.timeline({onComplete:action});

				floating.to(bubblesWrapper.querySelectorAll(".bubbles__item"), {
					x: "random(-15, 15)",
					y: "random(-15, 15)",
					rotation: "random(-10, 10)",
					transformOrigin:'50% 50%',
					duration: timeAction, 
					ease:"none",
					repeat:1, 
					repeatRefresh: true
				})
			}

			if(window.innerWidth >= 992) {				
				bubblesWrapper.addEventListener("mousemove", function(e) {				
					gsap.to(bubblesWrapper.querySelectorAll(".bubbles__item"), 
						{
							duration:3, 
							x:function(i){return (e.clientX/window.innerWidth)/(i+1)*150}, 
							y:function(i){return i*-20*(e.clientY/window.innerHeight)}, 
							rotation: "random(-10, 10)",
							overwrite:'auto'
						});
				});
			}
		}
	},
	click: function(bubble) {
		this.closeOldBubble(bubble);
		bubble.classList.toggle("active");
		if(this.currAnimation1 || this.currAnimation2) {
			this.currAnimation1.kill();
			this.currAnimation2.kill();
		}
		if(bubble.classList.contains("active")) {
			this.currAnimation1 = gsap.to(bubble.querySelector(".bubbles__item__title"), {
				ease: "power4.out",
				duration: 1,
				scale: 1.2,
				opacity: 0
			})
			this.currAnimation2 = gsap.fromTo(bubble.querySelectorAll(".bubbles__item__smallBuble"), 
				{
					opacity: 0,
					scale: 0.9
				},			
				{
					delay: 0.5,
					ease: "elastic.out(1, 0.3)",
					duration: 1,
					opacity: 1,
					scale: 1,
					stagger: 0.1
				}
			)
		}
		else {
			this.currAnimation1 = gsap.to(bubble.querySelectorAll(".bubbles__item__smallBuble"), 
				{
					duration: 0.2,
					opacity: 0,
					scale: 0.8,
					stagger: 0.1
				}
			)
			this.currAnimation2 = gsap.to(bubble.querySelector(".bubbles__item__title"), {
				delay: 0.2,
				ease: "power4.out",
				duration: 1,
				scale: 1,
				opacity: 1
			})
		}
	},
	closeOldBubble: function(newBubble) {
		var bubblesWrapper = newBubble.parentNode;
		if(bubblesWrapper.querySelector(".active")) {
			var allBubbles = bubblesWrapper.querySelectorAll(".bubbles__item");
			allBubbles.forEach((bubble) => {
				if(bubble.classList.contains("active")
					&&
					(bubble.classList[1] != newBubble.classList[1])
				) 
				{
					bubble.classList.remove("active");
					gsap.to(bubble.querySelectorAll(".bubbles__item__smallBuble"), 
						{
							duration: 0.2,
							opacity: 0,
							scale: 0.8,
							stagger: 0.05
						}
					)
					gsap.to(bubble.querySelector(".bubbles__item__title"), {
						delay: 0.2,
						ease: "power4.out",
						duration: 0.5,
						scale: 1,
						opacity: 1
					})
				}
			});
		}
	}
}
var bgs = {
	excludeToReColor: ["header_bg"],
	excludeToReSize: ["header_bg", "band"],
	setBg: function(bgEl) {
		let bgsEls = document.querySelectorAll(".bgs__bg");
		if(bgEl) {
			ScrollTrigger.create({
				trigger: bgEl,
				start: "top 50%",
				end: "bottom -50%",
				onToggle: self => {
					if(self.isActive) {
						let img,
							that = window.bgs;

						if(img = self.trigger.querySelector(".imgToBg")) {
							imgTobg(img);
						}

						if(!that.checkException(self.trigger.classList, that.excludeToReColor)) {
							self.trigger.classList.add("active");
						}

						activeBgs = document.querySelectorAll(".bgs__bg.active");
						if(window.innerWidth >= 992) {
							gsap.set(activeBgs,{filter:"hue-rotate(" + 1 +"deg) contrast(" + 1 + ")", backgroundSize:"100% 700px"});
						}
						else {
							gsap.set(activeBgs,{filter:"hue-rotate(" + 1 +"deg) contrast(" + 1 + ")"});
						}
						liveBg();
					}
					else {
						self.trigger.classList.remove("active");
					}
				}
			});

			let floating,
				activeBgs;
			function liveBg() {

				var timeAction = gsap.utils.random(3, 10);
				var rndHue = gsap.utils.random(-30, 30, 1);
				var rndContrast = gsap.utils.random(0.5, 1.5, 0.1);
				var rndBgSizeX = gsap.utils.random(65, 115, 1);

				activeBgs = document.querySelectorAll(".bgs__bg.active");

				floating = gsap.timeline({onComplete:liveBg});
				floating.to(activeBgs, {
					filter:"hue-rotate(" + rndHue +"deg) contrast(" + rndContrast + ")",					
					duration: timeAction, 
					ease:"none",
					repeat:0, 
					repeatRefresh: true
				})
				.to(activeBgs, {
					backgroundSize: (index, element) => {
						let self = window.bgs;
						if(window.innerWidth >= 992) {							
							// if(!element.classList.contains("band")) {
							if(!self.checkException(element.classList, self.excludeToReSize)) {
								return rndBgSizeX + "% " + (element.clientHeight-200) + "px"
							}
						}
					},
					duration:7
				})				
			}
		}
	},
	setPosition: function() {
		let bgs = document.querySelectorAll(".bgs__bg");

		if(document.querySelector(".imgToBg-done")) {
			window.bgs.cleanup();
		}
		if(bgs.length) {
			bgs.forEach((bgEl, i) => {				
				let anchorEl = document.querySelector(bgEl.dataset.anchor);
				if(anchorEl) {
					bgEl.style.top = anchorEl.getBoundingClientRect().top + window.pageYOffset + "px";

					if(bgEl.dataset.shift) {
						bgEl.style.transform = "translateY("+bgEl.dataset.shift+")";
					}
					window.bgs.setBg(bgEl);
				}
				else {
					window.bgs.setBg(bgEl);	
				}
			});
		}

	},
	cleanup: function() {
		let bgs = document.querySelectorAll(".imgToBg-done");
		if(bgs.length) {
			bgs.forEach((item) => {
				item.classList.remove("imgToBg-done");
			});
		}
	},
	checkException: function(verificationArr, referenceArr) {
		let isException = false;
		verificationArr.forEach((cls) => {
			if(referenceArr.includes(cls)) {
				isException = true;
			}
		});
		return isException;
	}
}
var popup = {
	timeoutID: 0,
	show: function(idPopup) {
		let popupActive;
		clearTimeout(this.timeoutID);
		if(popupActive = document.querySelector(idPopup)) {
			document.body.classList.add("popup-menu-active");
			popupActive.classList.add("popup_active");

			this.timeoutID = setTimeout(function() {
				popupActive.classList.add("popup_show");

				let menuList = popupActive.querySelector(".popup__menu__menuList"),
					menulistItems = menuList.querySelectorAll("li");

				menulistItems.forEach((item, i) => {
					gsap.set(item, {
						opacity:0,
						scale:1.3,
						y: 25 * i * -1,
						onComplete: () => {
							if(i >= menulistItems.length-1) {
								showMenuItems()
							}
						}
					})
				});
				function showMenuItems() {						
					let tl = gsap.timeline({});
					menulistItems.forEach((item, i) => {						
						tl.to(item,{
							scale:1,
							y:0,
							ease: "elastic",
							duration:1.5,
							opacity:1
						}, "<.1")
					})
				}
			}, 15);
		}
	},
	close: function(idPopup) {
		let popupActive;
		clearTimeout(this.timeoutID);
		if(popupActive = document.querySelector(idPopup)) {

			if(popupActive.classList.contains("popup__menu")) {
				let menulistItems = popupActive.querySelectorAll(".popup__menu__menuList li");
				menulistItems.forEach((item) => {
					item.removeAttribute("style");
				})
			}
			popupActive.classList.remove("popup_show");
			this.timeoutID = setTimeout(function() {				
				popupActive.classList.remove("popup_show");
				popupActive.classList.remove("popup_active");
				document.body.classList.remove("popup-menu-active");
			},1000);
		}	
	}
}
function textPreLoader() {
	let textPreloaderContainer = document.querySelector(".textPreloader-container");
	if(!textPreloaderContainer) return;

	let isAllowedShowTextLoader = false;

	if(!getCookie("textPreLoader")) {
		setCookie("textPreLoader","1",1);
		isAllowedShowTextLoader = true;
	}

	if(!isAllowedShowTextLoader) return;

	let targets = gsap.utils.toArray(textPreloaderContainer.querySelectorAll(".motto")),
		dur = 0.65,
		hold = 0.5,
		headerToTopInVH = 15,
		distansHeaderToTop,		
		headerMain = document.querySelector(".headerMain");
		headerMainH = headerMain.clientHeight;

	let resetScroll = (h) => {
		let i = h || 0;
		if (window.scrollY) {
			setTimeout(() => {
				window.scrollTo({top:0,left:0,behavior: "instant"});
				resetScroll(0);
			}, 10);
		}
		else {			
			action();
		}
	}					
	resetScroll();

	function action() {
		document.body.classList.add("textPreloader-active");
		// 15vh in px
		// 15vh = distans header from top viewport			
		distansHeaderToTop = parseInt(window.innerHeight * (headerToTopInVH / 100),10);

		gsap.set(headerMain, {
			"paddingTop": headerToTopInVH + "vh"
		});

		targets.forEach((obj, i) => {
			let tl = gsap.timeline({
				delay: dur * i + hold * i,
				repeat: 0,
				repeatDelay: (targets.length - 1) * (dur + hold) - dur,
				defaults: {
					ease: "none",
					duration: dur
				},
				onComplete: () => {
					if(i >= targets.length-1) {
						textLoaderWorkoff();
					}
				}
			});
			gsap.set(obj, {
				"top": "50vh", 
				scale:0.7, 
				opacity:0,
				onComplete: () => {
					gsap.set(textPreloaderContainer.querySelectorAll(".textPreloader"), {opacity:1});
				}
			});			

			tl.to(obj, {scale:1, opacity: 1}, "+=" + hold);
			tl.to(obj, {
				"top": () => {
					return (distansHeaderToTop + ((headerMainH - obj.clientHeight) / 2))
				}
			}, "+=" + hold);
			tl.to(obj, {scale: 1.15, opacity: 0}, "+=" + hold);	  
		});

		function textLoaderWorkoff() {
			let tl = gsap.timeline({
				repeat: 0,
				defaults: {
					ease: "power1.out",
					duration: .5
				}			
			});
			tl.to(headerMain, {
				"padding-top": "0px",
			})
			tl.to(textPreloaderContainer, {
				"height": "0px",
				onComplete: () => {
					document.body.classList.remove("textPreloader-active");
					textPreloaderContainer.parentNode.removeChild(textPreloaderContainer);
					headerMain.removeAttribute("style");
					launchAllAnimations();
				}
			},"<")
		}
	}
}

function initCardBlogSlickWrapper(hBlocg) {
	const first = gsap.timeline({});
	first.set(".cardBlog-slickWrapper .cards-slick", {
		height:hBlocg,
		onComplete: cardBlog
	});

	function cardBlog() {
		var cardBlogSlickWrapper = document.querySelector(".cardBlog-slickWrapper");
		cardBlogSlickWrapper.style.height = hBlocg + "px";
		cardBlogSlickWrapper.classList.add("waitToAnimate");

		gsap.to(".cardBlog-slickWrapper", {
			scrollTrigger: {
			    trigger: ".cardBlog-slickWrapper",
			    start: "top 80%",
			    end: "bottom 0",
			    markers: false,
			    onEnter: ({progerss, direction, isActive}) => {
			    	cardBlogSlickWrapper.classList.remove("waitToAnimate");
			    	setTimeout(function() {
			    		cardBlogSlickWrapper.classList.remove("waitToAnimate");
			    		cardBlogSlickWrapper.classList.add("animationDone");
			    	}, 1000);
			    },
			    onEnterBack: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardBlog-slickWrapperForAnimate").classList.remove("waitToAnimate");
			    },
			    onLeave: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardBlog-slickWrapperForAnimate").classList.add("waitToAnimate");
			    },
			    onLeaveBack: ({progerss, direction, isActive}) => {
			    	// cardBlogSlickWrapper.classList.add("waitToAnimate");
			    	// cardBlogSlickWrapper.classList.remove("animationDone");
			    }
			}
		})
	};
}

function initCardCalendarSlickWrapper(hCalendar) {
	const first = gsap.timeline({});

	first.set(".cardCalendar-slickWrapper .cards-slick", {
		height:hCalendar,
		onComplete: cardCalendar
	});

	function cardCalendar() {
		var calendarBlogSlickWrapper = document.querySelector(".cardCalendar-slickWrapper");
		calendarBlogSlickWrapper.style.height = hCalendar + "px";
		calendarBlogSlickWrapper.classList.add("waitToAnimate");

		gsap.to(".cardCalendar-slickWrapper", {
			scrollTrigger: {
			    trigger: ".cardCalendar-slickWrapper",
			    start: "top 80%",
			    end: "bottom 0",
			    markers: false,
			    onEnter: ({progerss, direction, isActive}) => {
			    	calendarBlogSlickWrapper.classList.remove("waitToAnimate");
			    	setTimeout(function() {
			    		calendarBlogSlickWrapper.classList.remove("waitToAnimate");
			    		calendarBlogSlickWrapper.classList.add("animationDone");
			    	}, 1000);
			    },
			    onEnterBack: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardCalendar-slickWrapperForAnimate").classList.remove("waitToAnimate");
			    },
			    onLeave: ({progerss, direction, isActive}) => {
			    	// document.querySelector(".cardCalendar-slickWrapperForAnimate").classList.add("waitToAnimate");
			    },
			    onLeaveBack: ({progerss, direction, isActive}) => {
			    	// calendarBlogSlickWrapper.classList.add("waitToAnimate");
			    	// calendarBlogSlickWrapper.classList.remove("animationDone");
			    }
			}
		})
	}
}

function logosRunningLines() {
	var logosWrapper;
	if(logosWrapper = document.querySelector(".logos")) {
		var lines = logosWrapper.querySelectorAll(".logos__line");
		if(lines.length) {
			lines.forEach((line) => {
				line.style.width = Math.ceil(line.parentNode.clientWidth / 220) * 220 + 20 + "px";
				initGsap(line, line.getAttribute("data-direction"), line.querySelectorAll(".logos__line__item").length, line.getAttribute("data-speed"));
			});
		}
	}

	function initGsap(line, direction, itemsQ, speed) {
		var lineClsStr = "." + line.classList[1],
			itemsClsStr = lineClsStr + " .logos__line__item",
			sign = direction == 1 ? '+' : '-',
			lineSize = (itemsQ * 205) + (itemsQ * 15);

		gsap.set(itemsClsStr, {
		  x: (i) => i * (220 * direction)
		});

		const gsapTween = gsap.timeline({
			scrollTrigger: {
				trigger: ".logos",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {
			    	document.querySelector(".logos").classList.add("active");			    	
			    },
			    onLeave: () => {
			    	gsapTween.pause();
			    },
			    onEnterBack: () => {
			    	gsapTween.resume();
			    },
			    onLeaveBack: () => {
			    	gsapTween.pause();
			    }
			}
		})
		.to(itemsClsStr, {
			duration: 0,
			ease: "linear",
			x: sign+"="+lineSize+"px",
			modifiers: {
				x: gsap.utils.unitize(x => (parseFloat(x) % lineSize))
			}
		})
		.to(itemsClsStr, {
			duration: speed,
			ease: "linear",
			x: sign+"="+lineSize+"px",
			modifiers: {
				x: gsap.utils.unitize(x => (parseFloat(x) % lineSize))
			},
			repeat: -1
		}, "<3");
		/*const gsapTween = gsap.to(itemsClsStr, {
			duration: speed,
			ease: "linear",
			x: sign+"="+lineSize+"px",
			scrollTrigger: {
				trigger: ".logos",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {
			    	document.querySelector(".logos").classList.add("active");			    	
			    },
			    onLeave: () => {
			    	gsapTween.pause();
			    },
			    onEnterBack: () => {
			    	gsapTween.resume();
			    },
			    onLeaveBack: () => {
			    	gsapTween.pause();
			    }
			},
			modifiers: {
				x: gsap.utils.unitize(x => (parseFloat(x) % lineSize))
			},
			repeat: -1
		});		*/

		document.querySelector(lineClsStr).addEventListener("mouseenter", function () {
		  gsap.to(gsapTween, { timeScale: 0.1});
		});

		document.querySelector(lineClsStr).addEventListener("mouseleave", function () {
		  gsap.to(gsapTween, { timeScale: 1});
		});
	}
}

function orbitaPills() {	
	var planetoidWrapper;

	if(planetoidWrapper = document.querySelector(".planetoid")) {
		var orbites = planetoidWrapper.querySelectorAll(".planetoid__orbita");
		if(orbites.length) {
			orbites.forEach((orbita) => {
				initOrbita(orbita, orbita.querySelectorAll(".planetoid__pill").length);
			});
		}
	}

	function initOrbita(orbita, pillsQ) {
		var orbitTime = 20,
			orbitPills = pillsQ,
			orbitTiming = orbitTime / pillsQ,
			pillsLive = planetoidWrapper.getElementsByClassName("planetoid__pill"),
			pills = orbita.querySelectorAll(".planetoid__pill"),
			isFirstInit = true,
			orbita_num = pills[0].getAttribute("data-orbita"),
			isFirstTimeAddEvent = true,
			isAllowedAddEvent = false,
			gsapPillsArray = [],
			antiLooping = 600; // антизацикливание при проверке пилсов на координаты

	    	var intervalId = 0;

		const orbitaTween = gsap.to(orbita, {			
			duration: orbitTime,
			ease: "linear",
			scrollTrigger: {
				trigger: ".planetoid",
			    start: "top 80%",
			    end: "bottom 50px",
			    markers: false,
			    onEnter: () => {

			    	// проверка, чтобы все пилсы получили координаты
			    	// и затем привызываю события 
			    	if(!isAllowedAddEvent) {			    		
				    	intervalId = setTimeout(checkPillsForShowUp, 200);			    	
			    	}
			    	
			    	if(isFirstInit) {
			    		isFirstInit = false;

			    		pills.forEach((pill, i) => {
							var orbitStartTime,
								orbita_num = pill.getAttribute("data-orbita");							

							orbitStartTime = orbitTiming * i;

							gsapPillsArray[i] = gsap.to(pill, {
								duration: orbitTime, 
								repeat: -1,
								ease: "linear",
								motionPath:{
									path: "#orbita_"+orbita_num,
									align: "#orbita_"+orbita_num,
									autoRotate: false,
									alignOrigin: [0.5, 0.5],
								}
							},orbitStartTime);

						}); // /forEach
			    	}
			    },
			    onLeave: () => {
			    	// orbitaTween.pause();
			    	if(isAllowedAddEvent) {			    		
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.pause();
						});
			    	}
			    },
			    onEnterBack: () => {
			    	// orbitaTween.resume();
			    	if(isAllowedAddEvent) {			    		
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.resume();
						});
			    	}
			    },
			    onLeaveBack: () => {
			    	// orbitaTween.pause();
			    	if(isAllowedAddEvent) {
				    	gsapPillsArray.forEach((pillTween) => {
							pillTween.resume();
						});
			    	}
			    }
			}
		});

    	function checkPillsForShowUp() {
			for(let j = 0; j <= pillsLive.length-1; j++) {
	    		(function(jj) {
	    			if(!pillsLive[jj].getAttribute("style")) {
	    				antiLooping--;
	    				clearTimeout(intervalId);
	    				if(antiLooping > 0) {				    					
		    				intervalId = setTimeout(checkPillsForShowUp, 200);				    				
	    				}
	    			}
	    			else {
	    				pillsLive[jj].classList.add("showup");
	    				if(jj >= pillsLive.length-1) {				    					
		    				clearTimeout(intervalId);
		    				isAllowedAddEvent = true;
		    				addEvents();
	    				}
	    			}
	    		})(j);
	    	}
		}			    		    	

		function addEvents() {			
			if(isFirstTimeAddEvent && isAllowedAddEvent) {
				isFirstTimeAddEvent = false;

				document.querySelector(".planetoid").addEventListener("mouseenter", function () {
					planetoidWrapper.querySelector("#orbita_1").style.stroke = "#fe05f2";
					planetoidWrapper.querySelector("#orbita_2").style.stroke = "#fe05f2";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 0.1})
					});
				});

				document.querySelector(".planetoid").addEventListener("mouseleave", function () {
					planetoidWrapper.querySelector("#orbita_1").style.stroke = "#fff";
					planetoidWrapper.querySelector("#orbita_2").style.stroke = "#fff";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 1})
					});
				});

				/*
				document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseenter", function () {
					event.target.querySelector("#orbita_"+orbita_num).style.stroke = "#fe05f2";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 0.1})
					});
				});

				document.querySelector(".planetoid__orbita-"+orbita_num).addEventListener("mouseleave", function () {
					event.target.querySelector("#orbita_"+orbita_num).style.stroke = "#fff";
					gsapPillsArray.forEach((pillTween) => {
						gsap.to(pillTween, { timeScale: 1})
					});
				});
				*/
			}
		}		
	}
}

function teamOnMain() {
	var teamWrapper;
	if(teamWrapper = document.querySelector(".team__onMain")) {
		var persons = teamWrapper.querySelectorAll(".team__person:not(.team__person_bigSize)");

		if(persons.length) {

			var personsQ = 34,
				isFirstShow = true,
				isPersonHovered = false,
				rotateIntervalId = 0,
				checkTimeIntervalId = 0,
				activePositionsArr = [],
				activePersonsArr = [],
				antiLooping = 0;


			ScrollTrigger.create({
				trigger: teamWrapper,
				start: "top 90%",
				end: "bottom 50px",
				onToggle: self => {
					if(self.isActive) {						
						antiLooping = 0;
						teamRotation();
						checkTimePersons();
					}
					else {
						antiLooping = 31;
						clearInterval(checkTimeIntervalId);
						clearTimeout(rotateIntervalId);
					}
				},
			});


			const tl = gsap.timeline({
			  scrollTrigger: {
			    trigger: ".team__onMain",
			    start: "top top",
			    end: "bottom 100%",
			    scrub: 2
			  }
			});

			gsap.utils.toArray(".team__person").forEach(layer => {
			  const depth = layer.dataset.depth;
			  const movement = -(layer.offsetHeight * depth)
			  tl.to(layer, {y: movement, ease: "none"}, 0)
			});
		}
	}

	function teamRotation(delay) {
		var _delay = delay ? delay : 500;

		if(antiLooping > 30) return;

		clearInterval(rotateIntervalId);
		activePositionsArr.length = 0;
		activePersonsArr.length = 0;
		if(!isPersonHovered) {
			collectActivePersonsStata();
			IMGrndPersonNumber = getRand(3,personsQ);
			POSrndPersonNumber = getRand(3,11);

			antiLooping++;

			if(
				(!activePositionsArr.includes("p"+POSrndPersonNumber))
				&&
				(!activePersonsArr.includes(IMGrndPersonNumber+""))
				) {

				if(true || !activePersonsArr.includes(IMGrndPersonNumber+"")) {

					var personAboutToShow;
					const start = Date.now();

					rotateIntervalId = setTimeout(function() {
						antiLooping = 0;
						personAboutToShow = teamWrapper.querySelector(".team__person[data-person='p"+POSrndPersonNumber+"']");
						if(personAboutToShow) {

							clearPerson(personAboutToShow);

							var imgTpl = '<img data-img="${NUM}" src="i/team/numbering/person_${NUM}.png" srcset="i/team/numbering/person_${NUM}.png 1x, i/team/numbering/person_${NUM}@2x.png 1.5x" />';
							var imgNew = imgTpl.replace(/\$\{NUM\}/g, IMGrndPersonNumber);

							personAboutToShow.querySelector(".team__person__imgWrap").innerHTML = "";
							personAboutToShow.querySelector(".team__person__imgWrap").insertAdjacentHTML("afterBegin", imgNew);
							personAboutToShow.setAttribute("data-start", start);

							activePositionsArr.length = 0;
							activePersonsArr.length = 0;
							gsap.to(personAboutToShow, {duration:0.5})
							.then(() => {
								personAboutToShow.classList.remove("hovered");
								personAboutToShow.classList.add("active");
								personAboutToShow.setAttribute("data-depth", 0.6);
								personAboutToShow.classList.remove("blured");
							});
							cleanOldTimePersons();
							// teamRotation();
						}
					}, _delay);
				}
				else {
					// activePositionsArr.length = 0;
					// activePersonsArr.length = 0;
					// clearInterval(rotateIntervalId);
					// teamRotation();	
				}
			}
			else {
				activePositionsArr.length = 0;
				activePersonsArr.length = 0;
				clearInterval(rotateIntervalId);
				// teamRotation();
			}
		}

	};

	function collectActivePersonsStata() {
		var activePersons = teamWrapper.querySelectorAll(".team__person.active");
		activePersons.forEach((person) => {
			activePositionsArr.push(person.getAttribute("data-person"));
			activePersonsArr.push(person.getElementsByTagName("img")[0].getAttribute("data-img"));
		});
	};
	function hoverPerson(person) {
		isPersonHovered = true;
		clearInterval(checkTimeIntervalId);
		clearTimeout(rotateIntervalId);
		rndImgNumber = getRand(3,personsQ);
		blurAll(person);
		person.classList.add("hovered");
	};
	function unHoverPerson(person) {
		isPersonHovered = false;
		antiLooping = 0;
		person.classList.remove("hovered");
		teamRotation(250);
		checkTimePersons();
	};
	function blurAll(personHovered) {
		var personsForBlur = teamWrapper.querySelectorAll(".team__person:not(.team__person_bigSize):not([data-person='" + personHovered.getAttribute("data-person") + "'])");

		personsForBlur.forEach((person) => {
			person.classList.remove("active");
			person.classList.add("blured");
			person.classList.remove("hovered");
			person.setAttribute("data-depth", 0.3);		
		});
	};
	function checkTimePersons() {		
		checkTimeIntervalId = setInterval(function() {
			cleanOldTimePersons();		
		}, 700);
	}
	function cleanOldTimePersons() {
		antiLooping = 0;
		var persons = teamWrapper.querySelectorAll(".team__person.active"),
			elapsed = 0;
		persons.forEach((person) => {
			var start = parseInt(person.getAttribute("data-start"));

			if(start) {				
				elapsed = (Date.now() - start) / 1000;
				if(elapsed > 8) {
					person.classList.add("blured");
					person.classList.remove("hovered");
					person.classList.remove("active");
					person.setAttribute("data-start", 0);
					person.setAttribute("data-depth", 0.3);
				}
			}
		});
		if(elapsed) {
			teamRotation();
		}
	};
	function clearPerson(p) {
		p.setAttribute("data-start", 0);
		p.setAttribute("data-depth", 0.3);
		p.classList.remove("blured");
		p.classList.remove("hovered");
	}
	function getRand(min,max){
      return parseInt(Math.random() * (max - min) + min,10);
    };
    (function() {
    	if(teamWrapper) {    		
	    	persons.forEach((person) => {
				person.addEventListener("mouseenter", () => {
					hoverPerson(person);
				});
				person.addEventListener("mouseleave", () => {
					unHoverPerson(person);
				});
			});
    	}
    })();
}

function plusSpin() {
	var plus;
	if(plus = document.querySelectorAll(".plus")) {
		gsap.timeline({
			scrollTrigger: {
			    scrub:0.2,
			    start: 'top 90%',
			}
		})
		.to((plus), {
			rotation: 360 * (document.body.clientHeight/200),
		})
	}
};

function sectionParalax() {
	if(document.querySelector(".section__paralax")) {
		var sections = document.querySelectorAll(".section__paralax");

		let mtCommonPage = getComputedStyle(document.querySelector(".commonPage__wrapper")).marginTop;
		let headerMainH = document.querySelector(".headerMain").clientHeight;
		let vacancyFooter = document.querySelector(".vacancy__section__footer");
		let headerMainInner = document.querySelector(".headerMain-inner");

		headerMainInner.classList.add("fixed");
		headerMainInner.classList.add("shown");

		gsap.utils.toArray(sections).forEach((section, i) => {

			section.inner = section.querySelector(".vacancy__section__inner"); 
			section.style.height = (window.innerHeight - (parseInt(mtCommonPage, 10) * 2 + 55)) + "px";

			gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top " + ((parseInt(mtCommonPage, 10) + headerMainH) + "px"), 
					scrub: 0.2,
					pin:true,
					pinSpacing: false,
					invalidateOnRefresh: true,
					toggleClass: "active",
					onUpdate: (self) => {
						if(self.direction == -1) {
							if(i >= sections.length-1) {
								vacancyFooter.classList.add("active");
								// headerMainInner.classList.remove("fixed");
								// headerMainInner.classList.remove("shown");
							}
							else {
								vacancyFooter.classList.remove("active");
								// headerMainInner.classList.add("fixed");
								// headerMainInner.classList.add("shown");
							}
						}
					},
				}
			})
			.to(sections[i+1 <= sections.length-1 ? i+1 : 0], {
				boxShadow: "0 0px 0px 0px rgb(0,0,0,.2)",
			})
			.to(sections[i+1 <= sections.length-1 ? i+1 : 0], {
				boxShadow: "0 -17px 15px -13px rgb(0,0,0,.2)",
			}, "<")
			.to(section, {
				ease: "none",
				scale: .95,
				boxShadow: "none"
			}, "<")
			.to(section, {
				scale:.85,
				opacity: 0,
				onStart: () => {
					headerMainInner.classList.add("fixed");
					headerMainInner.classList.add("shown");
					if(i >= sections.length-1) {
						vacancyFooter.classList.add("active");
						// headerMainInner.classList.remove("fixed");
						// headerMainInner.classList.remove("shown");
					}
				},
				onComplete: () => {
					if(i >= sections.length-1) {
						vacancyFooter.classList.remove("active");
					}
				}
			})
		});
	}
}
