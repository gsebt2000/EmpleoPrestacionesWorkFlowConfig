import { analyzeAndValidateNgModules } from "@angular/compiler";

export function getColumnasSaltos(saltos): string[] {
    let titulos: string[];
    titulos = [];
    for (let i = 0; i < saltos.length; i++) {
      titulos.push(saltos[i].Lista);
    }
    return titulos;
  }

  /*
  funcion getTitulos:
  OBJETIVO: determinar titulos y columnas a mostrar de una grillas de tipo "objeto"

  PARAMETROS:
    - objeto: objeto JSON con  el formtao
              {"prop1":"valor1","prop2":"valor2"...."propN":"valorN"}
              donde valorN puede ser un dato de tipo primitivo o un array de objetos JSON
    -titulos:  array de objetos JSON con el formato
              [{"NombreDeColumna1":"tituloColumna1"} ..... {"NombreDeColumnaN":"tituloColumnaN"}]
              donde NombreDeColumna1X esta asociado a un valor "propY" del array objeto
    -titulosSaltos:

  RESULTADO: devuelve un objeto JSON con dos propiedades
    titulos: contiene la lista de titulos de las columnas a mostrar
    campos: contine la lista de los campos a mostrar
    */
 export function getTitulos( objeto: any, titulos: string[], titulosSaltos: any): any {
   if (!objeto) {return false; }
    const titulosMostrar = []; // array con titulos a mostrar
    const camposMostrar = []; // array con campos a mostrar
    // cada elemento tendra el formato
    // {"nombreX":"TituloMostrarX, "detalle": "tituloSalto[]"}

    //  descompongo el array de objetos titulos en  arrayTitulos con formato
    // [[NombreDeColumna1,tituloColumna1]... [NombreDeColumnaN,tituloColumnaN]]
    const arrayTitulos = Object.entries(titulos);
    //  descompongo el array de objetos titulos en  arrayCampos con formato
    // [[prop1,valor1].. [propN,valorN] ]
    const arrayCampos = Object.entries(objeto);
    let indiceCampo: number;
    let porpsObjeto = [];

    // propsObjeto array de String con los nombres de las propiedades de objeto
    // ['prop1'....'propN]
    if (!Array.isArray(objeto)){
      porpsObjeto = Object.keys(objeto);
    } else {
      porpsObjeto = Object.keys(objeto[0]);

    }

    // lleno el array de titulos con aquellas columnas donde valorX no es de tipo array
    for (let i = 0; i < arrayTitulos.length; i++) {
      indiceCampo = porpsObjeto.indexOf(arrayTitulos[i][1]);
        if ( indiceCampo >= 0 )  {
          titulosMostrar.push(arrayTitulos[i][1]);
          if (! Array.isArray(arrayCampos[indiceCampo][1])){
            camposMostrar.push({'nombre': porpsObjeto[indiceCampo], 'detalle': []});
          }
       /*   else{
            camposMostrar.push({'nombre': porpsObjeto[indiceCampo], 'detalle': arrayCampos[indiceCampo][1]});
          }*/
        }
      }
    return  {'titulos': titulosMostrar, 'campos': camposMostrar};
  }
  export function seteoValoresDefaults( objeto: any): any {
    const aDefaults = objeto.getConfig().datos.map(x => x.Seccion).map(z => z.Campos)[0].filter(x => x.Default !== undefined);
    aDefaults.map(x => objeto[x.CampoNombre] = x.Default);
    return objeto;
  }
  

  export function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }



 export function filtraColumnas( datos: any, titulos: string[]): any {
  let dato = {};
  let resultado = []; // array con campos a mostrar
  if (!datos) {return false; }

  if (titulos.length > 0){
    resultado = datos.map( dat => {
      dato = {};
      titulos.forEach(tit => { dato[tit] = dat[tit]; });
      return dato;
    });
  } else{
    resultado = datos;
  }



   return  resultado;
 }
