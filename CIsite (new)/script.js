var lnStickyNavigation;

$(document).ready(function()
{	
	applyHeader();
	applyNavigation(); 
	applyMailTo();
	applyResize();
	checkHash();
	checkBrowser();
	plusToggle();
});

/* HEADER FUNCTIONS */

function applyHeader()
{
	$('.jumbotron').css({ height: ($(window).height()) +'px' });
	
	lazyLoad($('.jumbotron'));
}	

function lazyLoad(poContainer)
{
	/*var lstrSource   = poContainer.attr('data-src');
	var lstrPosition = poContainer.attr('data-position');

	$('<img>').attr('src', lstrSource).load(function()
	{
		poContainer.css('background-image', 'url("'+ lstrSource +'")');
		poContainer.css('background-position', lstrPosition);
		poContainer.css('-ms-filter', '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\')"');
		poContainer.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\'');
	});*/
}

/* NAVIGATION FUNCTIONS */

function applyNavigation()
{
	applyClickEvent();
	applyNavigationFixForPhone();
	applyScrollSpy();
	applyStickyNavigation();
}

function applyClickEvent()
{
	$('a[href*=#]').on('click', function(e)
	{
		e.preventDefault();
		
		if( $( $.attr(this, 'href') ).length > 0 )
		{
			$('html, body').animate(
			{
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 400);
		}
		return false;
	});
}

function applyNavigationFixForPhone()
{
	$('.navbar li a').click(function(event) 
	{
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}

function applyScrollSpy()
{
	$('#navbar-example').on('activate.bs.scrollspy', function() 
	{
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}

function applyStickyNavigation()
{
	lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
	$(window).on('scroll', function() 
	{  
		stickyNavigation();  
	});  
	
	stickyNavigation();
}

function stickyNavigation()
{         
	if($(window).scrollTop() > lnStickyNavigation) 
	{   
		$('body').addClass('fixed');  
	} 
	else 
	{  
		$('body').removeClass('fixed');   
	}  
}

/* MAILTO FUNCTION */

function applyMailTo()
{
	$('a[href*=mailto]').on('click', function(e)
	{
		var lstrEmail = $(this).attr('href').replace('mailto:', '');
		
		lstrEmail = lstrEmail.split('').reverse().join('')
		
		$(this).attr('href', 'mailto:' + lstrEmail);
	});
}

/* RESIZE FUNCTION */

function applyResize()
{
	$(window).on('resize', function() 
	{  
		lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
		$('.jumbotron').css({ height: ($(window).height()) +'px' });
	}); 
}

/* HASH FUNCTION */

function checkHash()
{
	lstrHash = window.location.hash.replace('#/', '#');
	
	if($('a[href='+ lstrHash +']').length > 0)
	{
		$('a[href='+ lstrHash +']').trigger('click');
	}
}

/* IE7- FALLBACK FUNCTIONS */

function checkBrowser()
{
	var loBrowserVersion = getBrowserAndVersion();
	
	if(loBrowserVersion.browser == 'Explorer' && loBrowserVersion.version < 8)
	{ 
		$('#upgrade-dialog').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
}

function getBrowserAndVersion() 
{
	var laBrowserData = [{
		string: 		navigator.userAgent,
		subString: 		'MSIE',
		identity: 		'Explorer',
		versionSearch: 	'MSIE'
	}];
	
	return {
		browser: searchString(laBrowserData) || 'Modern Browser',
		version: searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || '0.0'
	};
}

function searchString(paData) 
{
	for(var i = 0; i < paData.length; i++)	
	{
		var lstrDataString 	= paData[i].string;
		var lstrDataProp 	= paData[i].prop;
		
		this.versionSearchString = paData[i].versionSearch || paData[i].identity;
		
		if(lstrDataString) 
		{
			if(lstrDataString.indexOf(paData[i].subString) != -1)
			{
				return paData[i].identity;
			}
		}
		else if(lstrDataProp)
		{
			return paData[i].identity;
		}
	}
}
	
function searchVersion(pstrDataString) 
{
	var lnIndex = pstrDataString.indexOf(this.versionSearchString);
	
	if(lnIndex == -1) 
	{
		return;
	}
	
	return parseFloat(pstrDataString.substring(lnIndex + this.versionSearchString.length + 1));
}


function plusToggle(){
	$('.fa').click(function () {
        $(this).toggleClass("fa-plus-circle").toggleClass("fa-minus-circle");
    });
}

function ExpandGroup() 
{
	var x = document.getElementById('group');
    if (x.style.display && x.style.display !== 'none') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
}	


(function($) {
	$.StartScreen = function(){
		var plugin = this;
		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		
		var setTilesAreaSize = function(){
			var groups = $(".tile-group");
			var tileAreaWidth = 80;
			$.each(groups, function(i, t){
				if (width <= 640) {
					tileAreaWidth = width;
				} else {
					tileAreaWidth += $(t).outerWidth() + 80;
				}
			});
			$(".tile-area").css({
				width: tileAreaWidth
			});
		};


		plugin.init();
	}
})(jQuery);

$(function(){
	$.StartScreen();

	var tiles = $(".tile, .tile-small, .tile-sqaure, .tile-wide, .tile-large, .tile-big, .tile-super");

	$.each(tiles, function(){
		var tile = $(this);
		setTimeout(function(){
			tile.css({
				opacity: 1,
				"-webkit-transform": "scale(1)",
				"transform": "scale(1)",
				"-webkit-transition": ".3s",
				"transition": ".3s"
			});
		}, Math.floor(Math.random()*500));
	});

	$(".tile-group").animate({
		left: 0
	});
});

function showCharms(id){
	var  charm = $(id).data("charm");
	if (charm.element.data("opened") === true) {
		charm.close();
	} else {
		charm.open();
	}
}

function setSearchPlace(el){
	var a = $(el);
	var text = a.text();
	var toggle = a.parents('label').children('.dropdown-toggle');

	toggle.text(text);
}

$(function(){
	var current_tile_area_scheme = localStorage.getItem('tile-area-scheme') || "tile-area-scheme-dark";
	$(".tile-area").removeClass (function (index, css) {
		return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
	}).addClass(current_tile_area_scheme);

	$(".schemeButtons .button").hover(
			function(){
				var b = $(this);
				var scheme = "tile-area-scheme-" +  b.data('scheme');
				$(".tile-area").removeClass (function (index, css) {
					return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
				}).addClass(scheme);
			},
			function(){
				$(".tile-area").removeClass (function (index, css) {
					return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
				}).addClass(current_tile_area_scheme);
			}
	);

	$(".schemeButtons .button").on("click", function(){
		var b = $(this);
		var scheme = "tile-area-scheme-" +  b.data('scheme');

		$(".tile-area").removeClass (function (index, css) {
			return (css.match (/(^|\s)tile-area-scheme-\S+/g) || []).join(' ');
		}).addClass(scheme);

		current_tile_area_scheme = scheme;
		localStorage.setItem('tile-area-scheme', scheme);

		showSettings();
	});
});

var weather_icons = {
	'clear-day': 'mif-sun',
	'clear-night': 'mif-moon2',
	'rain': 'mif-rainy',
	'snow': 'mif-snowy3',
	'sleet': 'mif-weather4',
	'wind': 'mif-wind',
	'fog': 'mif-cloudy2',
	'cloudy': 'mif-cloudy',
	'partly-cloudy-day': 'mif-cloudy3',
	'partly-cloudy-night': 'mif-cloud5'
};

var api_key = 'AIzaSyDPfgE0qhVmCcy-FNRLBjO27NbVrFM2abg';

$(function(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude, lon = position.coords.longitude;
			var pos = lat+','+lon;
			var latlng = new google.maps.LatLng(lat, lon);
			var geocoder = new google.maps.Geocoder();
			$.ajax({
				url: '//api.forecast.io/forecast/219588ba41dedc2f1019684e8ac393ad/'+pos+'?units=si',
				dataType: 'jsonp',
				success: function(data){
					//do whatever you want with the data here
					geocoder.geocode({latLng: latlng}, function(result, status){
						console.log(result[3]);
						$("#city_name").html(result[3].formatted_address);
					});
					var current = data.currently;
					//$('#city_name').html(response.city+", "+response.country);
					$("#city_temp").html(Math.round(current.temperature)+" &deg;C");
					$("#city_weather").html(current.summary);
					$("#city_weather_daily").html(data.daily.summary);
					$("#weather_icon").addClass(weather_icons[current.icon]);
					$("#pressure").html(current.pressure);
					$("#ozone").html(current.ozone);
					$("#wind_bearing").html(current.windBearing);
					$("#wind_speed").html(current.windSpeed);
					$("#weather_bg").css({
						'background-image': 'url(../images/'+current.icon+'.jpg'+')'
					});
				}
			});
		});
	}
});