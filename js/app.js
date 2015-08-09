var app = angular.module('artistApp', [
	'ngFitText',
	'angular-svg-round-progress',
	'slick',
	'ngFlowGrid'
]);

app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://www.youtube.com/**'
		]);
});
/* ============== */
/* == SERVICES == */
/* ============== */

app.factory('ArtistService', function() {
	return {
		getArtist: function() {
			return {
				name: 'Jody Calcara',
				tagLine: 'Songwriter, musician, composer', 
				image: 'http://www.charlestonscoutdoors.com/wp-content/uploads/2012/02/IMG_0478.jpg',
				bio: 'Joshua Redman is one of the most acclaimed and charismatic jazz artists to have emerged in the decade of the 1990s. Born in Berkeley, California, he is the son of legendary saxophonist Dewey Redman and dancer Renee Shedroff.',
				logo: 'img/jody-logo.svg',
				socialMediaLinks: [
					{
						service: 'spotify',
						url: 'http://spotify.com'
					},
					{
						service: 'soundcloud',
						url: 'http://soundcloud.com'
					},
					{
						service: 'facebook',
						url: 'http://facebook.com'
					},
					{
						service: 'youtube',
						url: 'http://youtube.com'
					}
				],
				albums: [
					{
						image: 'https://c2.staticflickr.com/4/3888/15032735565_c411a287c9_b.jpg',
						title: 'Found My Place',
						artists: [
							'Jody Calcara'
						],
						year: 2015,
						buyLink: '',
						tracks: [
							'Found My Place',
							'The Wells',
							'Close To Me',
							'Volcanoes',
							'Waiting For You',
							'Leaving Footprints',
							'See You Down the Road'
						]
					}
				]
			};
		}
	};
});

app.factory('PhotoService', function() {
	var photos = [
		{
			name: 'Chick Susan',
			source: 'img/chick-susan.jpg'
		},
		{
			name: 'Drummer in D',
			source: 'img/drummer-in-d.jpg'
		},
		{
			name: 'Dundee with a Guitar',
			source: 'img/dundee-thumb.jpg'
		},
		{
			name: 'Dundee and Friend',
			source: 'img/dundee02-thumb.jpg'
		},
		{
			name: 'Girl on Sax',
			source: 'img/girl-sax.jpg'
		},
		{
			name: 'High School Reunion',
			source: 'img/hs-reunion.jpg'
		},
		{
			name: 'Jody White Wall',
			source: 'img/jody00-thumb.jpg'
		},
		{
			name: 'Jody on a Boat',
			source: 'img/jody01-thumb.jpg'
		},
		{
			name: 'Jody Brick Wall',
			source: 'img/jody1.jpg'
		},
		{
			name: 'Jody on Stage',
			source: 'img/jody02-thumb.jpg'
		},
		{
			name: 'Jody Abstract',
			source: 'img/jody03-thumb.jpg'
		},
		{
			name: 'Joel on Acoustic Guitar',
			source: 'img/joel-acoustic.jpg'
		},
		{
			name: 'Maya Filtered',
			source: 'img/maya-filter.jpg'
		},
		{
			name: 'Headshot of Maya',
			source: 'img/maya-headshot.jpg'
		},
		{
			name: 'Maya and Jack',
			source: 'img/maya-jack.jpg'
		},
		{
			name: 'Nathan on Drums',
			source: 'img/nathan-drums.jpg'
		},
		{
			name: 'Pelican Beach',
			source: 'img/pelican-beach.jpg'
		},
		{
			name: 'Prarie and All',
			source: 'img/pp-and-all.jpg'
		},
		{
			name: 'Prarie and all again',
			source: 'img/pp-rh-jc-cvs.jpg'
		},
		{
			name: 'Tattered Moon',
			source: 'img/tattered-moon.jpg'
		}
	];

	return {
		getPhotos: function() {
			return photos;
		}
	}
});

/* ================ */
/* == DIRECTIVES == */
/* ================ */

app.directive('scrollFade', function($window) {
	return {
		restrict: 'A',
		link: function(scope, element) {

			var bgPane = element[0].querySelector('.background-pane');
			bgPane.style.opacity = 0;

			$window.onscroll = function() {
				var val = ($window.scrollY/$window.innerHeight) >= 1 ? 1 : $window.scrollY/$window.innerHeight;
				bgPane.style.opacity = val;
			}
		}
	}
});

app.directive('animateToAnchor', function($window) {
	return {
		restrict: 'A',
		link: function(scope, $elem, attrs) {
			
			var $target;
			var scrollTo;
			var sideDrawer = document.querySelector('side-drawer');

			if (attrs.href) {
				$target = $(attrs.href);
			} else {
				console.error('Need a target');
			}

			$elem.on('click', function(e) {
				e.preventDefault();

				$('html, body').animate({
					scrollTop: $target.offset().top - 90
				}, 'slow');

				if (sideDrawer.classList.contains('open')) {
					sideDrawer.classList.remove('open');
				}
			});
		}
	}
});

app.directive('sideDrawer', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

		}
	};
});

app.directive('sideDrawerToggle', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var sideDrawer = document.querySelector('side-drawer');
			var button = element[0];

			button.addEventListener('click', function() {
				if (!sideDrawer.classList.contains('open')) {
					sideDrawer.classList.add('open');
				}

				else {
					sideDrawer.classList.remove('open');
				}
			});
		}
	};
});

/* ================= */
/* == CONTROLLERS == */
/* ================= */

app.controller('HeaderController', function($scope, ArtistService) {
	$scope.title = ArtistService.getArtist().name;
	$scope.logo = ArtistService.getArtist().logo;
});





app.controller('ArtistController', function($scope, ArtistService) {

	// Run when controller is initialized, fade the title in
	$scope.fadeInTitle = function() {
		var title = document.querySelector('.artist-name');
		var topNext = document.querySelector('.to-next');
		title.classList.add('fadeIn');

		title.addEventListener('webkitAnimationEnd', function() {
			topNext.classList.add('fadeIn');
		}, false);
	};

	$scope.artist = ArtistService.getArtist();
});





app.controller('MiniPlayerController', function($scope) {
	$scope.playing = false;

	$scope.playPause = function() {
		$scope.playing = !$scope.playing;
	};

	$scope.max = 100;
	$scope.progress = 25;
});





app.controller('MusicSectionController', function($scope, ArtistService) {
	$scope.albums = ArtistService.getArtist().albums;
});




app.controller('PhotoSectionController', function($scope, PhotoService, fgDelegate) {
	
	$scope.photos = PhotoService.getPhotos();

	var modal = document.querySelector('.fg-modal');
	var currentPhoto;
	
	$scope.showModal = function(index) {
		modal.classList.add('modal-open');

		currentPhoto = index;

		$scope.modalImg = $scope.photos[index].source;
		$scope.modalName = $scope.photos[index].name;
	}


	$scope.nextPhoto = function() {

		if (currentPhoto >= $scope.photos.length - 1) {
			currentPhoto = 0;
			console.log('Beginning.');
		}
		else {
			currentPhoto += 1;
			console.log('Next');
		}

		$scope.modalImg = $scope.photos[currentPhoto].source;
	}

	$scope.prevPhoto = function() {

		if (currentPhoto <= 0) {
			currentPhoto = $scope.photos.length - 1;
			console.log('End.');
		}
		else {
			currentPhoto -= 1;
			console.log('Prev');
		}

		$scope.modalImg = $scope.photos[currentPhoto].source;
	}

	$scope.dismissModal = function() {
		modal.classList.remove('modal-open');
	}
	
});

app.controller('VideoSectionController', function($scope) {

	$scope.videos = [
		{
			src: "2_t0ffY3JvE",
		},
		{
			src: "Y7d42LJfkqQ"
		}
	];

	$scope.getIframeSrc = function(src) {
		return 'https://www.youtube.com/embed/' + src;
	};

	$scope.featured = $scope.videos[0].src;

});
























