

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

    //console.log(text);

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

    // Fazendo o array de Clausulas
    var arrayClauses = [];
    for (let i = 1; i <= NUM_CLAU; i++){
        let aux = text[i].split(' ');
        let aux2 = [];
        
        // Insere no aux2 em formato de Inteiro
        for (let j = 0; j < aux.length-1; j++){
            aux2.push( parseInt(aux[j]) );
        }

        arrayClauses.push(aux2);
    }

    console.log(arrayClauses);
    
    var arrayDosTestes = get2NCombs(NUM_VARS);

    console.log(arrayDosTestes);

    if(doTest(arrayDosTestes, arrayClauses))
        console.log('isSat');
    else
        console.log('Is not SAT');
}

function doTest(arrayDosTestes, arrayClauses){
    let isSat = false;
    
    for (let indexTeste = 0; indexTeste < arrayDosTestes.length && !isSat; indexTeste++){
        // Manda um teste diferente a cada loop
        for (let indexClau = 0; indexClau < arrayClauses.length; indexClau++){
            // Manda uma clausula diferente com o mesmo teste
            if (!doClause(arrayDosTestes[indexTeste], arrayClauses[indexClau])){
                //se retornar alguma clausula false, o teste nao satisfaz
                break;//quebra e vai pro proximo teste
            }else if (indexClau === (arrayClauses.length - 1)){
                //Se chegou aqui eh porque nao achou nenhum falso
                isSat = true;
            }
        }

    }
    if (isSat) return true;
    return false;
}

function doClause(testeAtual, clauAtual){
    let arrayBool = [...testeAtual];
    console.log('Testando o:\n', arrayBool, '\n na:' + clauAtual + '\n que voltou: ' );

    for (let x = 0; x < clauAtual.length; x++){
        let indexNoBool = (Math.abs(clauAtual[x]) - 1);
        
        // Inverter o valor
        if (clauAtual[x] < 0){
            arrayBool[indexNoBool] = !arrayBool[indexNoBool];
        }

        // Como se trata de UNIAO, basta um true!
        if (arrayBool[indexNoBool]){
            console.log('TRUE');
            return true;
        }
    }
    // Se nao achar nenhum true, eh pq eh tudo false
    console.log('FALSE');
    return false;
}

function get2NCombs(n){
    // in ordert to get all the tests
        // just convert all integer from 0 through 2**n-1 to binary
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

// 0 - 0
// 1 - 1
// 2 - 10
// 3 - 11
// 4 - 100
// 5 - 101
// 6 - 110
// 7 - 111

//readFormula('/home/andrevas/Desktop/if669/hole1.cnf');