"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(make, model, year, id) {
        var _this = this;
        if (id != null) {
            _this = _super.call(this, make, id) || this;
            _this.model = model;
            _this.year = year;
        }
        else {
            _this = _super.call(this, make) || this;
            _this.model = model;
            _this.year = year;
        }
        return _this;
    }
    Object.defineProperty(Auto.prototype, "GetModel", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Auto.prototype, "GetYear", {
        get: function () {
            return this.year;
        },
        enumerable: false,
        configurable: true
    });
    Auto.prototype.AgregarAuto = function () {
        var tCuerpo = Funciones.$("tCuerpo");
        var tr = document.createElement("tr");
        if (this.GetId > 0) {
            tr.setAttribute("idAuto", this.GetId.toString());
            idUlimo++;
        }
        else {
            idUlimo++;
            this.SetId = idUlimo;
        }
        var tdId = document.createElement("td");
        tdId.style.display = "none";
        tdId.setAttribute("idAuto", this.GetId.toString());
        tr.appendChild(tdId);
        var nodoId = document.createTextNode(this.GetId.toString());
        tdId.appendChild(nodoId);
        var tdMarca = document.createElement("td");
        tr.appendChild(tdMarca);
        var nodoMarca = document.createTextNode(this.GetMake);
        tdMarca.appendChild(nodoMarca);
        var tdModelo = document.createElement("td");
        tr.appendChild(tdModelo);
        var nodoModelo = document.createTextNode(this.GetModel);
        tdModelo.appendChild(nodoModelo);
        var selecAño = document.createElement("select");
        tr.appendChild(selecAño);
        selecAño.addEventListener("change", this.modificar);
        if (this.GetYear < 2000) {
            var opcionAño = document.createElement("option");
            var nodoAño = document.createTextNode(this.GetYear.toString());
            nodoAño.textContent = this.GetYear.toString();
            opcionAño.appendChild(nodoAño);
            selecAño.appendChild(opcionAño);
            selecAño.selectedIndex = this.GetYear;
            Auto.obtenerAños(selecAño);
        }
        else {
            tr.id = this.GetYear.toString();
            selecAño.selectedIndex = this.GetYear;
            Auto.obtenerAños(selecAño);
            selecAño.selectedIndex = this.devolverIndex(this.GetYear);
        }
        tCuerpo.appendChild(tr);
    };
    Auto.prototype.modificar = function (eve) {
        var op = eve.target;
        var elementos = op.parentNode;
        var valor = op.value;
        var idElementos = elementos.getAttribute("idAuto");
        var peticion = new Peticiones();
        var jsonElemntos = JSON.stringify({ id: idElementos, year: valor });
        peticion.EjecutarModificacion("http://localhost:3000/editarYear", JSON.parse(jsonElemntos));
    };
    Auto.prototype.devolverIndex = function (year) {
        var contador = 0;
        for (var i = 2000; i <= 2020; i++) {
            if (i == year) {
                return contador;
            }
            contador++;
        }
        return year;
    };
    Auto.obtenerAños = function (select) {
        for (var i = 2000; i <= 2020; i++) {
            var opcionAño = document.createElement("option");
            var nodoAño = document.createTextNode(i.toString());
            nodoAño.textContent = i.toString();
            opcionAño.appendChild(nodoAño);
            select.appendChild(opcionAño);
        }
    };
    Auto.CargarLista = function (response, id) {
        var listaJson = JSON.parse(response);
        var idMax = id;
        if (listaJson != null) {
            var idIndex = listaJson.length;
            for (var i = 0; i < idIndex; i++) {
                if (i == 0) {
                    idMax = listaJson[i].id;
                }
                else if (listaJson[i].id > idMax) {
                    idMax = listaJson[i].id;
                }
                var aux = new Auto(listaJson[i].make, listaJson[i].model, listaJson[i].year, listaJson[i].id);
                aux.AgregarAuto();
            }
            id = idMax;
        }
    };
    Auto.prototype.GuardarAuto = function () {
        if (this.GetMake != null && this.GetModel != null && this.GetYear != null) {
            var peticion = new Peticiones();
            peticion.EjecutarPost("http://localhost:3000/nuevoAuto", JSON.stringify({ "make": this.GetMake, "model": this.GetModel, "year": this.GetYear }));
        }
    };
    return Auto;
}(Vehiculo));
