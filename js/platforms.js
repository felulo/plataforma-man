define(['platform'], function(Platform) {

	var Platforms = {

		items: [{
			index: 1,
			name: 'Platform1',
			value: (function() {

				var Platform1 = function(params) {

					if (!params)
						params = {};

					this.setSprite('images/mario.png');

					this.animacoes = {
						idle: {
							sx: 0,
							sy: 3,
							width: 16,
							height: 16,
							frameInicial: 0,
							frameFinal: 0,
							repetir: false,
							tempo: 0
						}
					};

					this.setAnimacao('idle');

				};

				Platform1.prototype = new Platform();
				Platform1.prototype.constructor = Platform1;

				return Platform1;

			})()
		}],

		createPlatformByName: function(name) {
			for (var i = 0; i < this.items.length; i++)
				if (this.items[i].name == name)
					return new this.items[i].value();

			return undefined;
		},

		createPlatformByIndex: function(index) {
			for (var i = 0; i < this.items.length; i++)
				if (this.items[i].index == index)
					return new this.items[i].value();

			return undefined;
		}

	};

	return Platforms;

});