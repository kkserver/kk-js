
(function(kk){

	kk.vue = function(vm,data) {
		
		data.on([],function(keys){
			kk.set(vm,keys,data.get(keys));
		},true);

		if(data.object) {
			for(var key in data.object) {
				vm[key] = data.object[key];
			}
		}
	};

})(kk);
