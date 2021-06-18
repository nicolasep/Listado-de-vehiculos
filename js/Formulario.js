"use strict";
var Formulario = /** @class */ (function () {
    function Formulario() {
    }
    Formulario.abrirGrilla = function (event) {
        console.log("entro");
        Funciones.$("contGrilla").style.display = "block";
        Funciones.$("marca").value = "";
        Funciones.$("modelo").value = "";
        var btnGuardar = Funciones.$("btnGuardar");
        var inicio = 2000;
        Funciones.$("años").value = inicio.toString();
        Auto.obtenerAños(Funciones.$("años"));
        btnGuardar.onclick = function () {
            var marca = Funciones.$("marca").value;
            var modelo = Funciones.$("modelo").value;
            var año = Funciones.$("años").value;
            if (!Funciones.validarPalabra(marca, "marca") || !Funciones.validarPalabra(modelo, "modelo")) {
                return;
            }
            var peticion = new Peticiones();
            var JsonAuto = { "make": marca, "model": modelo, "year": año };
            peticion.EjecutarPost("http://localhost:3000/nuevoAuto", JSON.stringify(JsonAuto));
            Funciones.$("Cargando").style.display = "flex";
            setTimeout(function () {
                Funciones.$("Cargando").style.display = "none";
                var auxAuto = new Auto(marca, modelo, parseInt(año));
                auxAuto.AgregarAuto();
                Formulario.cerrarGrilla();
            }, 1000);
        };
    };
    Formulario.cerrarGrilla = function () {
        Funciones.$("contGrilla").style.display = "none";
    };
    return Formulario;
}());
