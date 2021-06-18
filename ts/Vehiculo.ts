class Vehiculo
{
    private id:number;
    private make:string;

    public constructor(make:string,id?:number)
    {
        if(id != null && make != null)
        {
            this.id=id;
            this.make = make;
        }
        else
        {
            this.id = -1;
            this.make = make;
        }
        
        
    }

    public get GetId():number
    {
        return this.id;
    }
    public get GetMake():string
    {
        return this.make;
    }
    public set SetId(id:number)
    {
        this.id = id;
    }
}