class ManagedTimeouts {
	constructor() {
		this.timeouts = {};
		this.timeoutId = 0;
		this.enabled = true;
	}

	setTimeout(f,d) {
		if(!this.enabled) return null;

		if(typeof d !== "number") d = 0;
		d = parseInt(d);

		((self, id) => {
		    self.timeouts[id] = setTimeout(function() {
				delete self.timeouts[id];
				f.apply(this,[]);
		    }, d);
		})(this, this.timeoutId++);

		return this.timeoutId;
	}

	clearTimeout(id) {
		clearTimeout(this.timeouts[id]);
		delete this.timeouts[id];
	}

	clearAll() {
		for(let id of Object.keys(this.timeouts)) {
			try {
				clearTimeout(this.timeouts[id]);
				delete this.timeouts[id];
			} catch(e) {
				/* Oh whale. */
			}
		}
	}

	destroy() {
		this.enabled = false;
		this.clearAll();
	}
}

module.exports = ManagedTimeouts;