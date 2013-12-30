'use strict';

/* Controllers */

angular.module('samspage')

.controller('MainController', function ($scope, $location, status) {
	$scope.name = "sam";

	$scope.$location = $location;
    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };
})

.controller('FirstProjectController', function ($scope, status, $firebase) {
	status.warn("Remember this? This was my first angular project that I did. " +
				"Looking back at it, I realized how poorly written it was lol. So I cleaned it up a bit. " +
				"Hopefully I can make a django backend to store the data soon.");
	$scope.userName = 'Sam';
	$scope.year = 2013;
	//$scope.items = [];
	$scope.addClicked = false;

	var ref = new Firebase("https://samhykim.firebaseio.com/list");
  	$scope.items = $firebase(ref);

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

	$scope.months = months;
	var d = new Date();
	$scope.today = months[d.getMonth()].month + " " + d.getDate() + ", " + $scope.year;

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
		var day_found = months[monthinyear].calendar[week][dayinweek];

		return day_found;
	};

	var createCalendar = function(year) {
		for (var k = 0; k < months.length; k++) {
			var month = months[k].month;
			var firstday = new Date(month + " 1, " + year);	
			var start_day = firstday.getDay();
			var monthinyear = firstday.getMonth();
			var monthlength = daysInMonth(year, monthinyear);
			months[monthinyear].calendar = [];
			months[monthinyear].calendar[0] = [];
			var numday = 1;
			var week = 0; 
			var count;
			for (var i = 0;i < start_day; i++){
	        	var emptyDay = {
	        		text: '', 
	        		color: white, 
	        		task: "No task",
	        	};   
				months[monthinyear].calendar[week].push(emptyDay);
	  		}
	  			for (var i = start_day;i < 7; i++){   //create first week
	        	var day = {
	        		text: numday, 
	        		color: white, 
	        		task: ""};
	        	months[monthinyear].calendar[week].push(day);
	        	numday++;
	  		}
	  		
	  		while (numday <= monthlength) {       //create the rest of the weeks
	  			week++;
	  			count = 1;
	  			months[monthinyear].calendar[week] = [];
		     	for (count; count <= 7 && numday <= monthlength; count++) {
		         	var day = {
		         		text: numday, 
		         		color: white, 
		         		task: ""
		         	};
		         	months[monthinyear].calendar[week].push(day);
		         	numday++;
		     	}
	  		}
	  		while (count <= 7) {
	  			var emptyDay = {
	        		text: '', 
	        		color: white, 
	        		task: "No task",
	        	};   
	  			months[monthinyear].calendar[week].push(emptyDay);
	  			count++;
	  		}
	    }
		  //indicate the current day in calendar
		  var curr_date = new Date();
		  var curr_day = curr_date.getDate();
		  var curr_month = months[curr_date.getMonth()].month;
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
		var month = months[month_num-1].month;
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
			findtheDay(day, month, year).color = green;
		}
		else {
			findtheDay(day, month, year).color = red;
		}
	};

	$scope.display = function(day) {
		alert(day.task);
	};

	
})

.controller("AndroidAppsController", function ($scope, androidApps, status) {
	status.warn("Over the summer, I wanted to do something productive outside of work so I decided to learn how to develop apps. " +
				"It was pretty awesome having your own app on you own device. And thanks for giving me the Nexus " +
				"to develop on."); 
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



;