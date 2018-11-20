

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
    
   // console.log(NUM_VARS, NUM_CLAU);

    var arrayVar = [];
    var arrayClau = [];

    // Fazendo o array de Variaveis
    for (let i = 1; i <= NUM_VARS; i++){
        let aux = new Variavel(i);
        arrayVar.push(aux);
    }

    //console.log(arrayVar);

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
    
    const arrayDosTestes = get2NCombs(NUM_VARS);

    console.log(arrayDosTestes);
    
    // ERRADO A PARTIR DAQUI

    for (let i = 0; i < arrayDosTestes.length; i++){
        console.log('\n' +'Versao: '+ i);
        console.log(arrayDosTestes);
        console.log('Estou em: ' +i);
        let booleanDaClau = doTest(arrayDosTestes[i], arrayClau);
           
        // procura por um true
            if(booleanDaClau){
                console.log(i+' é solúvel');
                console.log(arrayDosTestes[i]);
            }
        //Se tiver chegado no ultimo e nao tiver achado nenhum true, é porque nao tem solução
            else {//if (i === arrayDosTestes.length-1){
                console.log(i, 'nao satisfaz');
                console.log(arrayDosTestes[i]);
            }
    }

}
//errado
function doTest(arrayBooleano, arrayClau){
    // Aqui tem que testar a combinação de true/false nas clausulas
   for (let i = 0; i < arrayClau.length; i++){
       if (!doClau(arrayBooleano, arrayClau[i])){
             //console.log(i, ' Retornou false');
             return false;
       }
   }
   return true;
}
//errado
function doClau(arrayBooleano, arrayClauI){
    //erro aq
    for (let i = 0; i < arrayClauI.length; i++){
        let auxIndex;

        // Achar a variavel no arrayBool
        // Mudar o valor caso tenha um '-'
        if (arrayClauI[i].charAt(0) === '-'){
            auxIndex = parseInt(arrayClauI[i].charAt(1))-1;
            if (arrayBooleano[auxIndex])
                arrayBooleano[auxIndex] = false;
            else
                arrayBooleano[auxIndex] = true;
        }else{
            auxIndex = parseInt(arrayClauI[i].charAt(0))-1;
        }
        // procurar um Verdadeiro
        if (arrayBooleano[auxIndex] === true){
            return true;
        }
      }
    // se nao achar nenhum TRUE recebe false
    return false;
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

        // Preenchendo o text2Aux
        let diff = n - textAux.length;
        for (let i = 0; i < diff; i++){
            textAux = '0' + textAux;
        }

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

    return arrayCombinations;
}

// 0 - 00
// 1 - 01
// 2 - 10
// 3 - 11
// 4 - 100
// 5 - 101
// 6 - 110
// 7 - 111

//readFormula('/home/CIN/alpvj/Desktop/hole1.cnf');
//readFormula('/home/andrevas/Desktop/if669/hole1.cnf');