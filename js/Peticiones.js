"use strict";
var Peticiones = /** @class */ (function () {
    function Peticiones() {
    }
    Peticiones.prototype.EjecutarGet = function (url, listerCallback) {
        var xlm = new XMLHttpRequest();
        xlm.onreadystatechange = function () {
            if (xlm.readyState === 4 && xlm.status == 200) {
                listerCallback.Response(xlm.status, xlm.responseText);
            }
        };
        xlm.open("GET", url, true);
        xlm.send();
    };
    Peticiones.prototype.EjecutarPost = function (url, datos) {
        var xlm = new XMLHttpRequest();
        xlm.onreadystatechange = function () {
            if (xlm.readyState == 4 && xlm.status == 200) {
            }
        };
        xlm.open("POST", url, true);
        xlm.setRequestHeader("Content-Type", "application/Json");
        xlm.send(datos);
        return true;
    };
    Peticiones.prototype.EjecutarModificacion = function (url, datos) {
        var xlm = new XMLHttpRequest();
        var retorno = false;
        xlm.open("POST", url, true);
        xlm.setRequestHeader("Content-Type", "application/Json");
        xlm.send(JSON.stringify(datos));
        xlm.onreadystatechange = function () {
            if (xlm.readyState == 4 && xlm.status == 200) {
                return true;
            }
        };
        return retorno;
    };
    return Peticiones;
}());
