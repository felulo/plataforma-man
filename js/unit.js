define(['displayObject'], function(DisplayObject) {

	var Unit = (function() {

		var Unit = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Unit';

			this.vida = this.vida;

			this.defesa = params.defesa || 0;
			this.custo = params.custo || 0;

			this.direcaoAtual = params.direcaoAtual || 1;
			this.pulando = false;

			this.alturaPulo = params.alturaPulo || 100;
			
		};

		Unit.prototype = new DisplayObject();
		Unit.prototype.constructor = Unit;

		Unit.prototype.acao = function() { };

		return Unit;

	})();

	return Unit;

});