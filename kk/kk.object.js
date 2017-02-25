
/**
 * 基类
 */
(function(kk){
	
	kk.Object = function(){};
	kk.Object.prototype.init = function() { return this; };
	
	kk.get = function(object,key) {
		
		var keys;
		if(key instanceof Array) {
			keys = key;
		}
		else if(key == "" || key == "_") {
			return object;
		}
		else {
			keys = key.split(".");
		}
		
		var v = object;

		for(var i=0;i<keys.length;i++){
			key = keys[i];
			if(typeof v == 'object') {
				v = v[key];
			}
			else {
				return;
			}
		}
		
		return v;
	};
	
	kk.set = function(object,key,value) {
		
		var keys;
		if(key instanceof Array) {
			keys = key;
		}
		else {
			keys = key.split(".");
		}
		
		var v = object;

		for(var i=0;i<keys.length;i++){
			
			key = keys[i];
			
			if(i == keys.length - 1) {
				v[key] = value;
			}
			else {
				var vv = v[key];
				if(typeof vv != 'object') {
					vv = {};
					v[key] = vv;
				}
				v = vv;
			}
			
		}
	};
	
	kk.remove = function(object,key) {
		
		var keys;
		if(key instanceof Array) {
			keys = key;
		}
		else {
			keys = key.split(".");
		}
		
		var v = object;
		
		while(keys.length >0 ){
			
			key = keys.shift();
			
			if(keys.length == 0) {
				delete v[key];
			}
			else {
				var vv = v[key];
				if(typeof vv != 'object') {
					return;
				}
				v = vv;
			}
			
		}
		
	};
	
})(kk);
