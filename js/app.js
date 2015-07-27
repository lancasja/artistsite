var app = angular.module('artistApp', [
	'ngFitText',
	'angular-svg-round-progress',
	'slick',
	'ngFlowGrid'
]);

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
				socialMediaLinks: [
					{
						service: 'instagram',
						url: 'http://instagram.com'
					},
					{
						service: 'spotify',
						url: 'http://spotify.com'
					},
					{
						service: 'soundcloud',
						url: 'http://soundcloud.com'
					},
					{
						service: 'twitter',
						url: 'http://twitter.com'
					},
					{
						service: 'apple',
						url: 'http://apple.com'
					},
					{
						service: 'youtube',
						url: 'http://youtube.com'
					}
				],
				albums: [
					{
						image: 'http://www.joshuaredman.com/sites/g/files/g2000002901/f/styles/media_gallery_large/public/201304/walking-shadows.jpg',
						title: 'Walking Shadows',
						artists: [
							'Joshua Redman'
						],
						year: 2013,
						buyLink: 'http://www.amazon.com/Walking-Shadows-Joshua-Redman/dp/B00BWDJILG',
						tracks: [
							'The Folks Who Live on the Hill',
							'Lush Life',
							'Stop This Rain',
							'Adagio',
							'Easy Living',
							'Doll Is Mine',
							'Infant Eyes',
							'Let It Be',
							'Final Hour',
							'Last Glimpse of Gotham',
							'Stardust',
							'Let Me Down Easy'
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
			name: 'Pleasure Boy',
			source: 'http://assets3.thefourohfive.com/data/33031/medium_picture/pleasure-boy.jpg'
		},
		{
			name: 'Pleasure Boy',
			source: 'http://assets3.thefourohfive.com/data/33031/medium_picture/pleasure-boy.jpg'
		},
		{
			name: 'Platypus',
			source: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/platypus_662_600x450.jpg'
		},
		{
			name: 'Bilbo',
			source: 'http://gifts.worldwildlife.org/gift-center/Images/large-species-photo/large-Duck-billed-Platypus-photo.jpg'
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
		link: function(scope, element, attrs) {

			var bgPane = element[0].querySelector('.background-pane');
			bgPane.style.opacity = 0;

			$window.onscroll = function() {
				var val = ($window.scrollY/$window.innerHeight) >= 1 ? 1 : $window.scrollY/$window.innerHeight;
				bgPane.style.opacity = val;
			}
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
	$scope.progress = 50;
});





app.controller('MusicSectionController', function($scope, ArtistService) {
	$scope.albums = ArtistService.getArtist().albums;
});




app.controller('PhotoSectionController', function($scope, PhotoService, fgDelegate) {
	$scope.photos = PhotoService.getPhotos();

	
});

























