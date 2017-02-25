
(function(kk){

	kk.angular = function(app,name,data) {

		app.controller(name,['$scope','$q',function($scope,$q){

			var defer = $q.defer();

			defer.promise.then(
				function(){},
				function(){},
				function(data){
					kk.set($scope,data.keys,data.value);
				});

			data.on([],function(keys){
				defer.notify({keys : keys, value:data.get(keys)});
			},true);

			if(data.object) {
				for(var key in data.object) {
					$scope[key] = data.object[key];
				}
			}
		}]);

	};

})(kk);
