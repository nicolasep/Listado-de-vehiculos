

window.addEventListener("load",()=>{
    
    let main:Main = new Main();
    let btn = Funciones.$("btnAgregar");
    btn.addEventListener("click",Formulario.abrirGrilla);
    
    var btnCancelar = Funciones.$("btnCancelar");
    btnCancelar.addEventListener("click",Formulario.cerrarGrilla);

    
});
var idUlimo:number;

class Main implements EventListenerObject, ResponseGet
{
    private consultas;
    
    public constructor()
    {
        idUlimo=0;
        this.consultas = new Peticiones();
        this.consultas.EjecutarGet("http://localhost:3000/autos",this);

    }

    public handleEvent(ev:Event)
    {

    }
    public Response(status:number,response:string)
    {
        if(status == 200)
        {
            Auto.CargarLista(response,idUlimo);
        }
    }
     
}

