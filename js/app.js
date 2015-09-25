var app = angular.module('artistApp', [
	'ngFitText',
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
				tagLine: 'Singer, Songwriter', 
				image: 'img/photo_do.png',
				logo: 'img/jody-logo.svg',
				socialMediaLinks: [
					{
						service: 'facebook',
						url: 'https://www.facebook.com/jodycalcaramusic'
					},
					{
						service: 'youtube',
						url: 'https://www.youtube.com/watch?v=_FhJMhDOo24'
					}
				],
				albums: [
					{
						image: 'img/found-my-place-album-cover.jpg',
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
			name: 'Dundee, Co-Producer',
			source: 'img/dundee-thumb.jpg'
		},
		{
			name: 'Chick Peetersen',
			source: 'img/chick-peetersen.jpg'
		},
		{
			name: 'Does he have to play those high notes?',
			source: 'img/does-he-have-to-play-those-high-notes.jpg'
		},
		{
			name: 'Dundee on backup vocals',
			source: 'img/dundee-on-backup-vocals.jpg'
		},
		{
			name: '',
			source: 'img/jc-00.jpg'
		},
		{
			name: '',
			source: 'img/jc-01.jpg'
		},
		{
			name: 'A young Ele Howell with the great drummer Elvin Jones',
			source: 'img/a-young-ele-howell-with-the-great-drummer-elvin-jones.jpg'

		},
		{
			name: 'Jack Kertzman (Engineer), Dundee (Assistant)',
			source: 'img/jack-kertzman-engineer-dundee-musician.jpg'
		},
		{
			name: 'Chick and Joel',
			source: 'img/chick-and-joel.jpg'

		},
		{
			name: 'Ele and Richard Howell',
			source: 'img/ele-and-richard-howell.jpg'

		},
		{
			name: 'Ele Howell',
			source: 'img/ele-howell.jpg'

		},
		{
			name: '',
			source: 'img/jc-0.jpg'

		},
		{
			name: 'Jerry Pellizzer',
			source: 'img/jerry-pellizzer.jpg'

		},
		{
			name: 'Robert editing footage',
			source: 'img/robert-editing-footage.jpg'

		},
		{
			name: 'Jody & Dundee',
			source: 'img/landing-background.jpg'
		},
		{
			name: 'Susan Copperman',
			source: 'img/susan-copperman.jpg'
		},
		{
			name: 'Tom Pellizzer',
			source: 'img/tom-pellizzer.jpg'
		},
		{
			name: '',
			source: 'img/jc-02.jpg'
		},
		{
			name: '',
			source: 'img/jc-03.jpg'
		},
		{
			name: 'Joel Lindheimer',
			source: 'img/joel-lindheimer.jpg'
		},
		{
			name: 'Prairie Prince',
			source: 'img/Prairie-prince.jpg'
		},
		{
			name: 'Robert Ogden & Bryna Hubbs',
			source: 'img/robert-ogden-bryna-hubbs.jpg'
		},
		{
			name: 'Susan Copperman',
			source: 'img/girl-sax.jpg'
		},
		{
			name: '',
			source: 'img/jody00-thumb.jpg'
		},
		{
			name: 'Richard Howell, Prairie Prince, JC, Chris Von Sneidern',
			source: 'img/pp-rh-jc-cvs.jpg'
		},
		{
			name: '',
			source: 'img/jody1.jpg'
		},
		{
			name: '',
			source: 'img/jody03-thumb.jpg'
		},
		{
			name: 'Joel Lindheimer',
			source: 'img/joel-acoustic.jpg'
		},
		{
			name: 'Maya Daniels',
			source: 'img/maya-filter.jpg'
		},
		{
			name: 'Maya Daniels',
			source: 'img/maya-headshot.jpg'
		},
		{
			name: 'Nathan Winter',
			source: 'img/nathan-drums.jpg'
		},
		{
			name: 'Richard Howell, Prairie Prince, JC, Chris Von Sneidern',
			source: 'img/pp-and-all.jpg'
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

app.directive('openContent', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var children = element[0].children;
			var $dropdown = $(children[0]);

			function openContent() {
				for (var i = 0; i < children.length; i++) {
					var child = children[1].children[i];
					console.log(child);
					if (child.classList.contains('dropdown-content')) {
						if (child.classList.contains('open')) {
							child.classList.remove('open');
							element[0].style.overflow = 'hidden';
							$dropdown.css({
								'top': '400px',
								'right': '15px'
							});
						}
						else {
							child.classList.add('open');
							element[0].style.overflow = 'auto';
							$dropdown.css('top', '7px');
						}
					}
				}
			}
			
			$dropdown.bind('click', function() {
				openContent();
			});
		}
	}
});

/* ============= */
/* == FILTERS == */
/* ============= */
app.filter('arrayToString', function() {
	return function(input) {
		return input.join(', ');
	}
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

app.controller('MusicSectionController', function($scope, $window, $sce) {
	
	var playerType;
	var playerUrl;
	
	if ($window.innerWidth > 768) {
		playerType = 'full';
	}
	else {
		playerType = 'album';
	}
	
	playerUrl = 'http://widget.cdbaby.com/cf949146-4936-43f2-9b76-9f11c51f95ee/' + playerType + '/light/opaque';
	
	$scope.playerType = $sce.trustAsResourceUrl(playerUrl);
});

/* ============================== */
/* == ALBUM CREDITS CONTROLLER == */
/* ============================== */
app.controller('AlbumCreditsController', function($scope) {
	
	var tracks = [
		{
			title: 'Found My Place',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass']
				},
				{
					name: 'Richard Howell',
					instruments: ['Saxophone']
				},
				{
					name: 'Susan Copperman',
					instruments: ['Saxophone']
				},
				{
					name: 'Joel Lindheimer',
					instruments: ['Guitar']
				},
				{
					name: 'Chick Petersen',
					instruments: ['Guitar']
				},
				{
					name: 'Mike Gay',
					instruments: ['Drums']
				},
				{
					name: 'Ele Howell',
					instruments: ['Djembe']
				}
			]
		},
		{
			title: 'The Wells',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass']
				},
				{
					name: 'Chris Von Sneidern',
					instruments: ['Guitar']
				},
				{
					name: 'Prairie Prince',
					instruments: ['Drums']
				}
			]
		},
		{
			title: 'Close to Me',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass']
				},
				{
					name: 'Chris Von Sneidern',
					instruments: ['Guitar']
				},
				{
					name: 'Richard Howell',
					instruments: ['Saxophone']
				},
				{
					name: 'Prairie Prince',
					instruments: ['Drums']
				}
			]
		},
		{
			title: 'Volcanoes',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass']
				},
				{
					name: 'Maya Daniels',
					instruments: ['Vocals']
				},
				{
					name: 'Tom Pellizzer',
					instruments: ['Guitar']
				},
				{
					name: 'Jerry Pellizzer',
					instruments: ['Drums']
				}
			]
		},
		{
			title: 'Waiting for You',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', '12 String Guitar', 'Bass']
				},
				{
					name: 'Nathan Winter',
					instruments: ['Drums']
				}
			]
		},
		{
			title: 'Leaving Footprints',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass', 'Percussion']
				},
				{
					name: 'Maya Daniels',
					instruments: ['Vocals']
				},
				{
					name: 'Jack Kertzman',
					instruments: ['Percussion']
				}
			]
		},
		{
			title: 'See You Down the Road',
			players: [
				{
					name: 'Jody Calcara',
					instruments: ['Vocals', 'Guitar', 'Bass', 'Percussion']
				},
				{
					name: 'Maya Daniels',
					instruments: ['Vocals']
				}
			]
		},
		{
			title: 'Notes',
			players: [
				{
					name: 'Producer',
					instruments: ['Jody Calcara']
				},
				{
					name: 'Recording Engineer',
					instruments: ['Jack Kertzman']
				},
				{
					name: 'Mastering',
					instruments: ['Rainer Gambalczyk of Sienna Digital']
				},
				{
					name: 'All songs written by',
					instruments: ['Jody Calcara']
				}
			]
		}
	];
	
	$scope.albumCredits = tracks;
	
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
		$scope.modalName = $scope.photos[currentPhoto].name;
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
		$scope.modalName = $scope.photos[currentPhoto].name;
	}

	$scope.dismissModal = function() {
		modal.classList.remove('modal-open');
	}
	
});

app.controller('VideoSectionController', function($scope) {

	$scope.videos = [
		{
			src: '_FhJMhDOo24',
			title: 'See You Down the Road',
			credits: [
				'Robert Ogden & Bryna Hubbs of Whataday Productions'
			]
		},
		{
			src: "uzEs-ARenj0",
			title: 'Volcanoes',
			credits: [
				'Camera work by Joe & Maj Maydak',
				'Editing by Robert Ogden'
			]
		}
	];

	$scope.getIframeSrc = function(src) {
		return 'https://www.youtube.com/embed/' + src;
	};

	$scope.featured = $scope.videos[0].src;

});


app.controller('FooterController', function($scope, ArtistService, PhotoService) {
	var artist = ArtistService.getArtist();
	$scope.socialLinks = artist.socialMediaLinks;
	$scope.photo = artist.image;

	
});






























