

function readFormula(fileName){
    let text = [];

    // metodo para receber um arquivo
    let fs = require('fs');
    let file = fs.readFileSync(fileName, 'utf8');

    // Ler o arquivo e armazenar num array sem os comentarios
    for (var i = 0; i < file.length; i = 1 + j){
        let aux = '';

        for (var j = i; j < file.length && file[j] != '\n' ; j++){
            aux += file[j];
        }

        if (aux.charAt(0) !== 'c' && aux.length > 0)
            text.push(aux);
    }

    console.log(text);

    // Pegando o numero de clauses e vars
    var NUM_VARS = 0;
    var NUM_CLAU = 0;

    if (text[0].charAt(0) === 'p'){
        let arrayAux = text[0].split(' ');
        if (arrayAux[1] === 'cnf'){
            NUM_VARS = arrayAux[2];
            NUM_CLAU = arrayAux[3];
        }
    }
    
    console.log(NUM_VARS, NUM_CLAU);

    var arrayVar = [];
    var arrayClau = [];

    // Fazendo o array de Variaveis
    for (let i = 1; i <= NUM_VARS; i++){
        let aux = new Variavel(i);
        arrayVar.push(aux);
    }

    console.log(arrayVar);

    // Fazendo o array de Clausulas
    for (let i = 1; i <= NUM_CLAU; i++){
        let aux = text[i].split(' ');
        let aux2 = [];
        
        for (let j = 0; j < aux.length-1; j++){
            aux2.push(aux[j]);
        }
        arrayClau.push(aux2);
    }

    console.log(arrayClau);
    
    var arrayDosTestes = get2NCombs(NUM_VARS);

    for (let i = 0; i < arrayDosTestes.length; i++){
        let boolean = doTest(arrayDosTestes[i]);

            if(boolean){
                console.log('É solúvel');
                break;
            }else if (i < arrayDosTestes-1){
                console.log('Chegou no ultimo mas nao eh soluvel');
            }
    }

}

function doTest(arrayBooleano){
    // Aqui tem que testar a combinação de true/false nas clausulas


}

function Variavel(id){
    this.id = id;
    this.boolean = false;
}

// in ordert to get all the tests
    // just convert all integer from 0 through 2**n-1 to binary
function get2NCombs(n){
    //(255).toString(2);
    let arrayCombinations = [];

    for (let i = 0; i < 2**n ; i++){
        // criando auxiliares para inserir posteriormente no arrayCombinations
        let textAux = (i).toString(2);
        let arrayAux = [];

        // preenchendo o arrayAux
        for (let j = 0; j < textAux.length; j++){
            if (textAux.charAt(j) == 1)
                arrayAux.push(true);
            else
                arrayAux.push(false);
        }
        
        // inserir a combinacao em forma de array
        arrayCombinations.push(arrayAux); 
    }

    for (let i = 0; i < n; i++){
        // Ver quantos 'false'/'0' falta no array
        let quantoFalta =  n - arrayCombinations[i].length;

            // adicionar os false (se faltar 0, logo, 0 < 0 nem entra)
            for (let j = 0; j < quantoFalta; j++){
                arrayCombinations[i].unshift(false);
            }
    }
        //arrayCombinations[3].unshift(false);
    return arrayCombinations;
}

// 0 - 0
// 1 - 1
// 2 - 10
// 3 - 11
// 4 - 100
// 5 - 101
// 6 - 110
// 7 - 111

//readFormula('/home/andrevas/Desktop/if669/hole1.cnf');