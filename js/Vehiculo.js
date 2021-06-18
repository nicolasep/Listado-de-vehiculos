"use strict";
var Vehiculo = /** @class */ (function () {
    function Vehiculo(make, id) {
        if (id != null && make != null) {
            this.id = id;
            this.make = make;
        }
        else {
            this.id = -1;
            this.make = make;
        }
    }
    Object.defineProperty(Vehiculo.prototype, "GetId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "GetMake", {
        get: function () {
            return this.make;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vehiculo.prototype, "SetId", {
        set: function (id) {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    return Vehiculo;
}());
