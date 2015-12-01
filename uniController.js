 var app = angular.module('app', ['ngRoute', 'infinite-scroll']);

app.config(function($routeProvider) {
        $routeProvider
        	.when('/', {
        		templateUrl : 'partial-results.html',
                controller  : 'uniController'
        	})
        	.when('/:char1/:g1/:p1/:char2/:g2/:p2/:w/:loc/:v', {
                templateUrl : 'partial-results.html',
                controller  : 'uniController'
            })
            
    });

app.controller("uniController", function($rootScope, $scope, $http, $location, $routeParams, $timeout) {
	$scope.load = true;
	$scope.c1 = 'any';
	$scope.c2 = 'any';
	$scope.g1 = '0';
	$scope.g2 = '0';
	$scope.p1 = '';
	$scope.p2 = '';
	$scope.winner = '0';
	$scope.locale = 'any';
	$rootScope.reportup = false;
	$scope.predicate = '-date';
	$scope.infscroll = true;
  $scope.vers = 0;

	$scope.allchar = ['any', 'Akatsuki',
					'Byakuya',
                    'Carmine',
                    'Chaos',
                    'Eltnum',
                    'Gordeau',
                        'Hilda',
                        'Hyde',
                        'Linne',
                        'Merkava',
                        'Nanase',
                        'Orie',
                        'Seth',
                        'Vatista',
                        'Waldstein',
                        'Yuzu',
                        'Phonon'];
    $scope.imgs = ['aka.jpg', 
    				'bya.jpg', 
    				'car.jpg', 
    				'chaos.jpg', 
    				'elt.jpg', 
    				'gor.jpg', 
    				'hild.jpg', 
    				'hyde.jpg', 
    				'lin.jpg', 
    				'merk.jpg', 
    				'nana.jpg', 
    				'ori.jpg', 
    				'seth.jpg', 
    				'vat.jpg', 
    				'wald.jpg', 
    				'yuzu.jpg',
            'phonon.png'];
	$scope.$location = {};
	$rootScope.page = 0;
	$http.post('fetcharcades.php', {}). success(function(data, status, headers, config) {
				$scope.arcades = data;
		}); 
 	$scope.watching = -1;
 	$scope.logWatch = function(mid) {
 	//	console.log(mid);
 		$scope.watching = mid;
 	}
   	$scope.reportMatch = function(matchid) {
   	//	console.log(matchid);
   		$scope.reportup = true;
   		$scope.repMID = matchid;
   	//	console.log($scope.repMID == matchid);
   		$scope.reportresponse = '';
   	}
   	$scope.searchPlayer = function(player) {
   		$scope.resetFilters();
   		$scope.p1 = player;
   	//	console.log($scope.p1);
   		$scope.loadMatches();
   	}
   	$scope.newfunction = function(matchid) {
   	//	console.log(matchid);
   		$scope.reportup = true;
   		$scope.repMID = matchid;
   	//	console.log($scope.repMID == matchid);
   		$scope.reportresponse = '';
   	}
   	$scope.submitReport = function() {
   		$http.post('submitreport.php', {'mid': $scope.repMID, 'reason':$scope.reason}). success(function(data, status, headers, config) {
   			if(data.trim() == 'complete') {
   				$scope.reportresponse = 'Report Submitted, Thank you.';
   				$scope.reason = '';
   				$timeout(function() {
   					$scope.reportup = false;
   				}, 2000);
   			}
   			else {
   				$scope.reportresponse = 'Report submittion failed.';
   			}
   		})
   	} 
	$rootScope.$on('$routeChangeSuccess', function () {
		if($routeParams.char1 == undefined) {
			$scope.loadLatest();
		}
		else { 
            $scope.c1 = $routeParams.char1;
	        $scope.c2 = $routeParams.char2;
	        $scope.g1 = parseFloat($routeParams.g1);
	        $scope.g2 = parseFloat($routeParams.g2);
	        if($routeParams.p1 == 'NONE') {
	        	$scope.p1 = '';
	        }
	        else {
	        	$scope.p1 = $routeParams.p1;
	        }
	        if($routeParams.p2 == 'NONE') {
	        	$scope.p2 = '';
	        }
	        else {
	        	$scope.p2 = $routeParams.p2;
	        }
	        $scope.winner = $routeParams.w;
	        $scope.locale = $routeParams.loc;
          $scope.vers = $routeParams.v;
          $scope.alterBG();
	        $scope.loadMatches();
        }
        
        });
	/*$http.post('latest.php', {}).success(function(data, status, headers, config) {
					console.log(data);
					$scope.dbresults = data;
				 }); */
 
 	$scope.selectImg = function(char) {
 		var pos = $scope.allchar.indexOf(char.trim());
 		return "char/"+$scope.imgs[pos-1];
 	}
 	$scope.loadNext = function() {
 	//	console.log("LOADING NEXT");
   		$rootScope.page = $rootScope.page+1;	
		$http.post('fetchmatches.php', {'char1': $scope.c1, 'char2':$scope.c2, 'page':$rootScope.page, 
			'assist1':$scope.a1, 'assist2':$scope.a2, 'grade1':$scope.g1, 'grade2':$scope.g2,
			'player1':$scope.p1, 'player2':$scope.p2, 'winner':$scope.winner, 'locale':$scope.locale, 'vers':$scope.vers}). success(function(data, status, headers, config) {
			if(data.length == 0 && $rootScope.dbresult == undefined) {
		      	$scope.infscroll = true;
		      }
		     else{
				for (var i = 0; i < data.length; i++) {
			        $rootScope.dbresults.push(data[i]);
			      }
		      }
		});
		
   	}
	$scope.loadMatches = function() {
		$rootScope.page = 0;	
    $scope.alterBG();
	//	console.log($scope.locale);
		$http.post('fetchmatches.php', {'char1': $scope.c1, 'char2':$scope.c2, 'page':$rootScope.page, 
			'assist1':$scope.a1, 'assist2':$scope.a2, 'grade1':$scope.g1, 'grade2':$scope.g2,
			'player1':$scope.p1, 'player2':$scope.p2, 'winner':$scope.winner, 'locale':$scope.locale, 'vers':$scope.vers}). success(function(data, status, headers, config) {	
			$rootScope.dbresults = data;
	//		console.log($rootScope.dbresults);
			$scope.changeURL();
			$scope.infscroll = false;
		});
		
	};
  $scope.alterBG = function() {
    console.log($scope.vers);
    if($scope.vers == 1) {
      document.getElementById("filt").style.backgroundImage = "url('bg.png')";
    }
    if($scope.vers != 1) {
      document.getElementById("filt").style.backgroundImage = "url('stv2.png')";
    }
    
  }
	$scope.changeURL = function() {
	//	console.log("The current path: " + $location.path());
     //   console.log("Changing url...");
     if($scope.p1 == '' && $scope.p2 == '') {
     	$location.path('/'+$scope.c1+'/'+$scope.g1+'/'+'NONE'+'/'+$scope.c2+'/'+$scope.g2+'/'+'NONE'+'/'+$scope.winner+'/'+$scope.locale+'/'+$scope.vers);
     }
     else if($scope.p1 == '') {
     	$location.path('/'+$scope.c1+'/'+$scope.g1+'/'+'NONE'+'/'+$scope.c2+'/'+$scope.g2+'/'+$scope.p2+'/'+$scope.winner+'/'+$scope.locale+'/'+$scope.vers);
     }
     else if($scope.p2 == '') {
     	$location.path('/'+$scope.c1+'/'+$scope.g1+'/'+$scope.p1+'/'+$scope.c2+'/'+$scope.g2+'/'+'NONE'+'/'+$scope.winner+'/'+$scope.locale+'/'+$scope.vers);
     }
     else{
        $location.path('/'+$scope.c1+'/'+$scope.g1+'/'+$scope.p1+'/'+$scope.c2+'/'+$scope.g2+'/'+$scope.p2+'/'+$scope.winner+'/'+$scope.locale+'/'+$scope.vers);
		}
	}
	$scope.loadLatest = function() {
		$http.post('latest.php', {}).success(function(data, status, headers, config) {
			//		console.log(data);
					$rootScope.dbresults = data;
				 });
		$scope.changeURL();
	}
	$scope.resetFilters = function() {
		$scope.c1 = 'any';
		$scope.c2 = 'any';
		$scope.a1 = 'any';
		$scope.a2 = 'any';
		$scope.g1 = '0';
		$scope.g2 = '0';
		$scope.p1 = '';
		$scope.p2 = '';
		$scope.winner = '0';
		$scope.locale = 'any';
	}
});
 app.controller("statsController", function($scope, $http) {
 	$scope.reverse=false;
 	$http.post('fetchstats.php', {}).success(function(data, status, headers, config) {
			//		console.log(data);
					$scope.dbresults = data;
					angular.forEach($scope.dbresults, function (dbresult) {
					    dbresult.wins = parseInt(dbresult.wins);
					    dbresult.losses = parseInt(dbresult.losses);
					    dbresult.total = parseInt(dbresult.total);
  					 });
	});
	$scope.allchar = ['any', 'Akatsuki',
					'Byakuya',
                    'Carmine',
                    'Chaos',
                    'Eltnum',
                    'Gordeau',
                        'Hilda',
                        'Hyde',
                        'Linne',
                        'Merkava',
                        'Nanase',
                        'Orie',
                        'Seth',
                        'Vatista',
                        'Waldstein',
                        'Yuzu'];
    $scope.imgs = ['aka.jpg', 
    				'bya.jpg', 
    				'car.jpg', 
    				'chaos.jpg', 
    				'elt.jpg', 
    				'gor.jpg', 
    				'hild.jpg', 
    				'hyde.jpg', 
    				'lin.jpg', 
    				'merk.jpg', 
    				'nana.jpg', 
    				'ori.jpg', 
    				'seth.jpg', 
    				'vat.jpg', 
    				'wald.jpg', 
    				'yuzu.jpg'];
	
    $scope.selectImg = function(char) {
 		var pos = $scope.allchar.indexOf(char.trim());
 		return "char/"+$scope.imgs[pos-1];
 	}
 });