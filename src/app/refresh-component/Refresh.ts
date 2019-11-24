export class sqlScripts {
    sqlScriptName:string='';
    directory:string='';    
    credentials:Credentials[]=[new Credentials()];
     
}

export class Credentials{

    credentialId:string;
    order:any;
}
export class Sql
{
	
	shellScriptName='runSql.sh';
	Order=1;
	sqlScripts:sqlScripts[]=[];
	
}