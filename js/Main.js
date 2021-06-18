"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    var btn = Funciones.$("btnAgregar");
    btn.addEventListener("click", Formulario.abrirGrilla);
    var btnCancelar = Funciones.$("btnCancelar");
    btnCancelar.addEventListener("click", Formulario.cerrarGrilla);
});
var idUlimo;
var Main = /** @class */ (function () {
    function Main() {
        idUlimo = 0;
        this.consultas = new Peticiones();
        this.consultas.EjecutarGet("http://localhost:3000/autos", this);
    }
    Main.prototype.handleEvent = function (ev) {
    };
    Main.prototype.Response = function (status, response) {
        if (status == 200) {
            Auto.CargarLista(response, idUlimo);
        }
    };
    return Main;
}());
