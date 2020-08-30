var cityFilter = angular.module('cityFilter',[]);

cityFilter.controller('cityFilterController', function ($scope) {
		$scope.cities=[{name: 'Mumbai',continent: "Asia",population:204000000},
                      {name: 'New York',continent: "North America",population:21295000},
					 {name: 'San Francisco',continent: "North America",population:5780000},
                      {name: 'London',continent: "Europe",population:8580000},
                    {name: 'Rome',continent: "Europe",population:2715000},
                      {name: 'Melbourne',continent: "Australia",population:3900000},
					 {name: 'San Jose',continent: "North America",population:7354555},
                      {name: 'Rostov-on-Don',continent: "Europe",population:1052000}];});
