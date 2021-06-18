class Auto extends Vehiculo
{
    private model:string;
    private year:number;

    public constructor(make:string,model:string,year:number,id?:number)
    { 
        if(id != null)
        {
            super(make,id);
            this.model = model;
            this.year = year;
        }
        else
        {
            super(make);
            this.model = model;
            this.year = year;
        }   
    }
    public get GetModel():string
    {
        return this.model;
    }
    public get GetYear():number
    {
        return this.year;
    }
    

    public AgregarAuto():void 
    {  
        var tCuerpo = Funciones.$("tCuerpo");

        var tr = document.createElement("tr");
        if(this.GetId > 0)
        {
            tr.setAttribute("idAuto", this.GetId.toString());
            idUlimo ++;
        }
        else
        {
            idUlimo++;
            this.SetId = idUlimo;
        }
        
        var tdId = document.createElement("td");
        tdId.style.display = "none";
        tdId.setAttribute("idAuto",this.GetId.toString());
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
        selecAño.addEventListener("change",this.modificar);

        if(this.GetYear <2000)
        {
            var opcionAño = document.createElement("option");
           
            var nodoAño = document.createTextNode(this.GetYear.toString());
            
            nodoAño.textContent=this.GetYear.toString();
            opcionAño.appendChild(nodoAño);

            selecAño.appendChild(opcionAño);

            selecAño.selectedIndex = this.GetYear;
            Auto.obtenerAños(selecAño);
        }
        else
        {
            tr.id = this.GetYear.toString();

            selecAño.selectedIndex = this.GetYear;

            Auto.obtenerAños(selecAño);
            selecAño.selectedIndex = this.devolverIndex(this.GetYear);
        }

        tCuerpo.appendChild(tr);

    }

    private modificar(eve:Event):void
    {
        let op =<HTMLOptionElement> eve.target;
        
        let elementos =<Element> op.parentNode;
        let valor = op.value;
        let idElementos:string =<string>elementos.getAttribute("idAuto");
        
        let peticion = new Peticiones();
        let jsonElemntos =JSON.stringify({id : idElementos ,year :valor});
        peticion.EjecutarModificacion("http://localhost:3000/editarYear",JSON.parse(jsonElemntos)); 
    }
    private devolverIndex(year:number):number
    {
        var contador = 0;
        for(var i=2000;i<=2020;i++)
        {
            if(i ==  year)
            {
                return contador;
            }
            contador++;
        }
        
        return year;
    }

    public static obtenerAños(select:HTMLElement):void
    {
        for(let i=2000 ; i<=2020;i++)
        {
            var opcionAño = document.createElement("option");
           
            var nodoAño = document.createTextNode(i.toString());
            
            nodoAño.textContent=i.toString();
            opcionAño.appendChild(nodoAño);

            select.appendChild(opcionAño);
        }
        
    }
    public static CargarLista(response:string,id:number):void
    {
        let listaJson = JSON.parse(response);
        
        let idMax:number = id;
        if(listaJson != null)
        {
            let idIndex = listaJson.length;
            
            for (var i = 0; i < idIndex; i++) 
            {
                if(i==0)
                {
                    idMax = listaJson[i].id;
                }
                else if(listaJson[i].id>idMax)
                {
                    idMax = listaJson[i].id;
                }
                let aux:Auto = new Auto(listaJson[i].make,listaJson[i].model,listaJson[i].year,listaJson[i].id);
    
                aux.AgregarAuto();
                
            }
            id = idMax;
        }
        
    }
    
    public GuardarAuto():void
    {
        if(this.GetMake != null && this.GetModel != null && this.GetYear != null)
        {
            let peticion:Peticiones = new Peticiones();
            peticion.EjecutarPost("http://localhost:3000/nuevoAuto",JSON.stringify({"make":this.GetMake,"model":this.GetModel,"year":this.GetYear}));

        }
    }
    

}