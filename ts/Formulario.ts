
class Formulario
{
    
    public static abrirGrilla(event:Event):void
    {
        console.log("entro");
        Funciones.$("contGrilla").style.display = "block";
        
        (<HTMLInputElement>Funciones.$("marca")).value= "";
        (<HTMLInputElement>Funciones.$("modelo")).value = "";
        
        let btnGuardar = Funciones.$("btnGuardar");
        let inicio:number = 2000;
        (<HTMLInputElement>Funciones.$("años")).value =inicio.toString();
        Auto.obtenerAños(Funciones.$("años"));
        btnGuardar.onclick = function () 
        {

            var marca = (<HTMLInputElement>Funciones.$("marca")).value;
            var modelo = (<HTMLInputElement>Funciones.$("modelo")).value;

            var año = (<HTMLInputElement>Funciones.$("años")).value;

        
            if (!Funciones.validarPalabra(marca,"marca") || !Funciones.validarPalabra(modelo,"modelo")) 
            {
                
                return;
            }
            let peticion = new Peticiones();
            
            var JsonAuto = { "make": marca, "model": modelo, "year": año};

            peticion.EjecutarPost("http://localhost:3000/nuevoAuto",JSON.stringify(JsonAuto));
            
            Funciones.$("Cargando").style.display = "flex";

            setTimeout( () => {
                Funciones.$("Cargando").style.display = "none";
                let auxAuto = new Auto(marca,modelo,parseInt(año));
                auxAuto.AgregarAuto();
                Formulario.cerrarGrilla();
                }, 1000 );
        }
    
    }
    
    public static cerrarGrilla() {

        Funciones.$("contGrilla").style.display = "none"

    }
}