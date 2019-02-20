const fs = require('fs')

const { detectarCodificacion } = require('./Utilerias/Codificacion/procesadorCodificacion')
const { leerCarpetaFiltrada } = require('./Utilerias/OperadoresArchivos/readDirOnlyFile')
const { recodificarArchivo }= require('./Utilerias/Codificacion/procesadorCodificacion')
const { oppAbduction } = require('./Utilerias/OperarCadenas/listToArray')
const { extraerContenidoRecodificado } = require('./Utilerias/Codificacion/contenidoRecodificado')
const { decode } = require('./Utilerias/OperadorObjetos/decode')
const { unirCamposConsecutivosComponente } = require('./Utilerias/OperarCadenas/unirConsecutivoPorComponente')
const pcrArchivos = require('./Utilerias/OperadoresArchivos/procesadorArchivos')
const rgx = require('./Utilerias/RegEx/jsonRgx')
const path = require('path')
const dir = 'Testing\\'


leerCarpetaFiltrada(dir, [ '.dlg', '.frm', '.rep', '.tbl', '.vis'])
.then(files => {

    files.forEach(file =>  {

        pcrArchivos.agregarArchivo('Reporte.txt',
            '\n**************************************************************************************************\n'
            + rgx.Borrar.clsRuta(file)
            + '\n**************************************************************************************************\n'
        )
        
        console.log(
            '**************************************************************************************************\n'
            + rgx.Borrar.clsRuta(file)
        )

        let fileContent = extraerContenidoRecodificado(file) + '\n['

        let objFile = decode(
            rgx.Borrar.clsComentariosIntls(unirCamposConsecutivosComponente(fileContent)).replace(/&/g, '') +'\n[',
            // rgx.Borrar.clsComentariosIntls(fileContent).replace(/&/g, ''),
            file
        )
        // console.log(objFile)
        // console.log(unirCamposConsecutivosComponente(fileContent))
        //pcrArchivos.crearArchivo('txt',unirCamposConsecutivosComponente(fileContent) )
        oppAbduction (fileContent, path.extname(file), objFile)
        
    })
})

