define(['element'], function(Element) {

	var Screen = (function() {

		var Screen = function(params) {

			if (!params)
				params = {};

			this.tipo = params.tipo || 'Screen';
			this.nome = params.nome || ''

			this.items = params.items || [];

			this.game = params.game || undefined;

			this.teclas = params.teclas || [];

		}

		Screen.prototype = new Element();
		Screen.prototype.constructor = Screen;

		Screen.prototype.verificarInput = function(tecla) { };

		Screen.prototype.render = function(ctx) {

			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			this.fase.render(ctx);
			this.atorPrincipal.render.call(this.atorPrincipal, ctx);

		};

		Screen.prototype.logicaPrincipal = function(context) {	};

		return Screen;

	})();

	return Screen;

});