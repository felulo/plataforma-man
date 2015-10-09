define(['displayObject'], function(DisplayObject) {

	var Platform = (function() {

		var Platform = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Platform';

			this.dano = params.dano || 0;
			this.items = params.items || [];

			this.estado = params.estado || 0;

			this.animacoes = {
				idle: {
					sx: 0,
					sy: 0,
					width: 16,
					height: 16,
					frameInicial: 0,
					frameFinal: 0,
					repetir: false,
					tempo: 0
				}
			};

		};

		Platform.prototype = new DisplayObject();
		Platform.prototype.constructor = Platform;

		return Platform;

	})();

	return Platform;

});