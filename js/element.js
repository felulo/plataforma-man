define(function() {
	
	var Element = (function() {

		var Element = function(params) {

			if (!params)
				params = {};

			this.id = params.id || '';
			this.tipo = params.tipo || 'Element';

		};

		Element.prototype.toString = function() {
			var string = '';

			string = 'Variáveis\n--------------';

			for (name in this) {
				if (typeof this[name] != 'function')
					string += '\n' + name + ' => Valor: ' + this[name];
			}

			string += '\n\nMétodos\n--------------';

			for (name in this) {
				if (typeof this[name] == 'function')
					string += '\n' + name + '()';
			}

			return string;
		};

		return Element;

	})();

	return Element;

});