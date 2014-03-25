'use strict';

/* Controllers */

angular.module('samhykim')

.controller('BodyController', function ($scope, $location) {
	$scope.$location = $location;
	$scope.routeIs = function(routeName) {
        return $location.path() === routeName || $location.path() === 'about';
  };
})

.controller('MenuController', function ($scope) {
	$scope.tabs = [' ', 'About', 'Resume', 'Projects', 'EE20', '2048', 'Sheet Music', 'Choreography', 'Contact'];
})

.controller('MainController', function ($scope, $location, status) {
	$scope.name = "sam";
	$scope.toggle = true;

	$scope.$location = $location;
  $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
  };
  $scope.toggle = function () {
  	 $scope.toggle = !$scope.toggle;
  	 console.log($scope.toggle)
  };
})

.controller('CalendarController', function ($scope, status, $firebase) {
	status.warn("Sam's Yearly Events. Easy way to list important events throughout the semester.");
	$scope.userName = 'Sam';
	
	//$scope.items = [];
	$scope.addClicked = false;

	var ref = new Firebase("https://samhykim.firebaseio.com/list");
  $scope.items = $firebase(ref);
  console.log($scope.items);

	var red = "#ff0000";
	var white = "#eee9e9";
	var green = "#00ff00";
	var blue = "#0000ff";

	var months = [
		{month: "January"},
		{month: "February"},
		{month: "March"},
		{month: "April"},
		{month: "May"},
		{month: "June"},
		{month: "July"},
		{month: "August"},
		{month: "September"},
		{month: "October"},
		{month: "November"},
		{month: "December"},
	];
	/*var refMonths = new Firebase("https://samhykim.firebaseio.com/calendar");
  $scope.months = $firebase(refMonths); 
  console.log($scope.months.length);
  for (var i = 0; i < months.length; i++) {
  	if (!$scope.months[i]) {
  		$scope.months.$add(months[i]);
  		console.log(months[i]);
  	}
  }
  */
  
	$scope.months = months;
	var d = new Date();
	$scope.year = d.getFullYear();
	$scope.today = $scope.months[d.getMonth()].month + " " + d.getDate() + ", " + $scope.year;

	$scope.$watch('newTask.text', function (task) {
		$scope.taskEmpty = false;
		if (task == '' || task == undefined) {
			$scope.taskEmpty = true;
		}
	});

	//$scope.months = $scope.months.splice(5, 1);
	$scope.selection = $scope.months[d.getMonth()];

	var daysInMonth = function (year, month) {
	    var d = new Date(year, month+1, 0);
	    return d.getDate();
	}

	var findtheDay = function(num, month, year) {
		var day = new Date(month + " " + num + ", " + year);
		var firstday = new Date(month + " " + "1" + ", " + year);
		var start_day = firstday.getDay();
		var week = Math.floor((num - 1 + start_day) / 7);
		
		var monthinyear = day.getMonth();
		var dayinweek = (num - 1 + start_day) % 7;
		var day_found = $scope.months[monthinyear].calendar[week][dayinweek];

		return day_found;
	};

	var createCalendar = function(year) {
		for (var k = 0; k < $scope.months.length; k++) {
			var month = $scope.months[k].month;
			var firstday = new Date(month + " 1, " + year);	
			var start_day = firstday.getDay();
			var monthinyear = firstday.getMonth();
			var monthlength = daysInMonth(year, monthinyear);
			$scope.months[monthinyear].calendar = [];
			$scope.months[monthinyear].calendar[0] = [];
			var numday = 1;
			var week = 0; 
			var count;
			for (var i = 0;i < start_day; i++){
	        	var emptyDay = {
	        		text: '', 
	        		color: white, 
	        		task: "No task",
	        	};   
				$scope.months[monthinyear].calendar[week].push(emptyDay);
	  		}
	  			for (var i = start_day;i < 7; i++){   //create first week
	        	var day = {
	        		text: numday, 
	        		color: white, 
	        		task: ""};
	        	$scope.months[monthinyear].calendar[week].push(day);
	        	numday++;
	  		}
	  		
	  		while (numday <= monthlength) {       //create the rest of the weeks
	  			week++;
	  			count = 1;
	  			$scope.months[monthinyear].calendar[week] = [];
		     	for (count; count <= 7 && numday <= monthlength; count++) {
		         	var day = {
		         		text: numday, 
		         		color: white, 
		         		task: ""
		         	};
		         	$scope.months[monthinyear].calendar[week].push(day);
		         	numday++;
		     	}
	  		}
	  		while (count <= 7) {
	  			var emptyDay = {
	        		text: '', 
	        		color: white, 
	        		task: "No task",
	        	};   
	  			$scope.months[monthinyear].calendar[week].push(emptyDay);
	  			count++;
	  		}
	    }
		  //indicate the current day in calendar
		  var curr_date = new Date();
		  var curr_day = curr_date.getDate();
		  var curr_month = $scope.months[curr_date.getMonth()].month;
		  var curr_year = curr_date.getFullYear();
		  var day_obj =  findtheDay(curr_day, curr_month, curr_year);
		  
		  day_obj.color = blue;
		  day_obj.task = "It's Today!";
	};
	createCalendar($scope.year);



	//compute remaining tasks
/*	$scope.remaining = function() {
		return $scope.items.reduce(function(count, item) {
			return item.done ? count : count+1;         //condition ? value-if-true : value-if-false
		}, 0);
	};
	*/

	$scope.add = function(newItem, ItemObj, year) {
		$scope.addClicked = true;
		if (newItem == '' || newItem == undefined) {
			return;
		}
		var item = {
			text: newItem, 
			done: false,
		};
		var month_num = newItem.slice(0,2);
		var day = newItem.slice(3,5);
		var task = newItem.slice(7, newItem.length);
		var month = $scope.months[month_num-1].month;
		$scope.items.$add(item);
		var day_of_task = findtheDay(day, month, year);
		day_of_task.color = red;
		day_of_task.task = newItem;	
		ItemObj.text = '';
		$scope.addClicked = false;
	};



	//change color on calendar to green if done == true
	$scope.complete = function(item, year) {
		var month_num = item.text.slice(0,2);
		var day = item.text.slice(3, 5);
		var month = months[month_num-1].month;
		if (item.done) {
			findtheDay(day, month, year).color = red;
		}
		else {
			findtheDay(day, month, year).color = green;
		}
	};

	$scope.display = function(day) {
		alert(day.task);
	};

	
})

.controller("AndroidAppsController", function ($scope, androidApps, status) {
	status.warn("List of apps I have created so far (only 1)."); 
	$scope.appNames = ['Sudoku Solver', 'Food For U'];
	$scope.appNames.index = 0;
	$scope.$watch('appNames.index', function (index) {
		$scope.apps = androidApps.query(function (apps) {	
			$scope.app = apps[index];
			$scope.mainAppImage = $scope.app.images[0];
		});
	});
	$scope.setImage = function(imageUrl) {
    	$scope.mainAppImage = imageUrl;
  	};
})

.controller("SheetMusicController", function ($scope, $window) {
	//$window.open('/downloads/bohemian_rhapsody_cello.pdf');
})

.controller("ChoreographyController", function ($scope, status) {
	status.warn("In the past year, I have been getting involved in the dance community " + 
		"at UC Berkeley. I was recently inspired to begin choreographing so " + 
		"please enjoy my first ever choreo/dance collab.");
})



;