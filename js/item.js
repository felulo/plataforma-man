define(['displayObject'], function(DisplayObject) {

	var Item = (function() {

		var Item = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Item';

		};

		Item.prototype = new DisplayObject();
		Item.prototype.constructor = Item;

		Item.prototype.usar = function() { };

		return Item;

	})();

	return Item;

});