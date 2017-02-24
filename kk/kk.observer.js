
/**
 * 事件
 */
(function(kk){
	
	var KeyObserver = function(){};

	KeyObserver.alloc = function() {
		var v = new KeyObserver();
		return v.init.apply(v,arguments);
	};

	KeyObserver.prototype = new kk.Object();

	KeyObserver.prototype.init = function() {
		kk.Object.prototype.init.apply(this,arguments);
		this._fns = [];
		this._observers = {};
		return this;
	};

	KeyObserver.prototype.keyObserver = function(key) {
		var v = this._observers[key];
		if(v === undefined) {
			v = KeyObserver.alloc();
			this._observers[key] = v; 
		}
		return v;
	};

	KeyObserver.prototype.on = function(keys,i,fn) {
		if(i < keys.length) {
			var key = keys[i];
			var v = this.keyObserver(key);
			v.on(keys,i + 1, fn);
		}
		else {
			this._fns.push(fn);
		}
	};

	KeyObserver.prototype.off = function(keys,i,fn) {
		if(i < keys.length) {
			var key = keys[i];
			var v = this._observers[key];
			if(v !== undefined) {
				v.off(keys,i + 1,fn);
			}
		}
		else if(fn === undefined) {
			this._fns = [];
		}
		else {
			var fns = [];
			for(var n=0;n<this._fns.length;n++) {
				var f = this._fns[n];
				if(f != fn) {
					fns.push(f);
				}
			}
			this._fns = fns;
		}
	};

	KeyObserver.prototype.change = function(keys,i) {

		if(keys === undefined) {
			var fns = this._fns.slice();
			for(var n=0;n<fns.length;n++) {
				var fn = fns[n];
				fn(keys);
			}
			for(var key in this._observers) {
				var v = this._observers[key];
				v.change.apply(v,arguments);
			}
		}
		else if(i < keys.length) {
			var key = keys[i];
			var fns = [];
			for(var n=0;n<this._fns.length;n++) {
				var fn = this._fns[n];
				if(fn.bubble) {
					fns.push(fn);
				}
			}
			for(var n=0;n<fns.length;n++) {
				var fn = fns[n];
				fn(keys);
			}
			var v = this._observers[key];
			if(v !== undefined) {
				v.change.apply(v,[keys,i + 1]);
			}
		}
		else {
			var fns = this._fns.slice();
			for(var n=0;n<fns.length;n++) {
				var fn = fns[n];
				fn(keys);
			}
			for(var key in this._observers) {
				var v = this._observers[key];
				v.change.apply(v,arguments);
			}
		}

	};

	kk.Observer = function(){};
	
	kk.Observer.alloc = function() {
		var v = new kk.Observer();
		return v.init.apply(v,arguments);
	};

	kk.Observer.prototype = new kk.Object();
	
	kk.Observer.prototype.init = function(object) {
		kk.Object.prototype.init.apply(this,arguments);
		this.key = KeyObserver.alloc();
		this.object = object;
		return this;
	};
	
	kk.Observer.prototype.get = function(keys) {
		if(keys === undefined) {
			return this.object;
		}
		return kk.get(this.object,keys);
	};

	kk.Observer.prototype.set = function(keys,value) {
		if(keys === undefined || keys == '_') {
			this.object = value;
		}
		else {
			if(typeof this.object != "object"){
				this.object = {};
			}
			kk.set(this.object,keys,value);
		}
		this.change(keys);
	};

	kk.Observer.prototype.change = function(keys) {
		if(keys === undefined || keys == '_') {
			this.key.change();
		}
		else if(keys instanceof Array) {
			this.key.change(keys,0,this);
		}
		else if(typeof keys == 'string') {
			this.key.change(keys.split('.'),0,this);
		}
	};

	kk.Observer.prototype.on = function(keys,fn,bubble) {
		if(bubble) {
			fn.bubble = true;
		}
		if(keys === undefined || keys == '_') {
			this.key.on([],0,fn);
		}
		else if(keys instanceof Array) {
			this.key.on(keys,0,fn);
		}
		else if(typeof keys == 'string') {
			this.key.on(keys.split('.'),0,fn);
		}
	};

	kk.Observer.prototype.off = function(keys,fn) {
		if(keys === undefined || keys == '_') {
			this.key.off([],0,fn);
		}
		else if(keys instanceof Array) {
			this.key.off(keys,0,fn);
		}
		else if(typeof keys == 'string') {
			this.key.off(keys.split('.'),0,fn);
		}
	};
	
})(kk);
