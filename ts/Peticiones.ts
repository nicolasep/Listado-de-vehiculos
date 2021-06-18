class Peticiones
{
    
    public EjecutarGet(url:string, listerCallback:ResponseGet)
    {
        let xlm = new XMLHttpRequest();

        xlm.onreadystatechange = ()=> 
        {
            if (xlm.readyState === 4 && xlm.status == 200) 
            {
               listerCallback.Response(xlm.status,xlm.responseText);    
            }
        }
        xlm.open("GET",url, true)
        xlm.send();
        
    }

    public EjecutarPost(url:string,datos:string):boolean
    {
        let xlm = new XMLHttpRequest();
            xlm.onreadystatechange = function () 
            {

                if (xlm.readyState == 4 && xlm.status == 200) 
                {

                }
                 
            }
            
            xlm.open("POST", url, true)
            xlm.setRequestHeader("Content-Type", "application/Json");
            xlm.send(datos);

        return true;
    }
    public EjecutarModificacion(url:string,datos:JSON):boolean
    {
        let xlm = new XMLHttpRequest();
        let retorno = false;

        xlm.open("POST", url, true)
        xlm.setRequestHeader("Content-Type", "application/Json");
        xlm.send(JSON.stringify(datos));
        xlm.onreadystatechange = function () 
        {
            
            if (xlm.readyState == 4 && xlm.status == 200) 
            {
                return  true;
            }
                
        }
        
        return retorno;
    }

}