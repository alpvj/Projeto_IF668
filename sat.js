// Trabalho feito por André Luís Peixoto e Vasconcelos Júnior (alpvj)
//                e   Marcos Vinicius Prysthon Nascimento (mvpn)

function readFormula(fileName){
    let text = [];

    // metodo para receber um arquivo
    let fs = require('fs');
    let file = fs.readFileSync(fileName, 'utf8');

    // Ler o arquivo e armazenar num array sem os comentarios
    text = file.split(/[\r\n]+/);
    const txtL = text.length;
    //console.log(text);

    for (let i = 0; i < txtL; i++){
        // tirar um c por vez
        for (let j = 0; j < text.length; j++){
            if (text[j].charAt(0) === 'c' || text[j].length < 1){
                text.splice(j, 1);
                break;
            }
        }

    }

    //console.log(text);

    // Juntar as linhas de clausula que nao tem 0 no final
    for (let i = 0; i < text.length; i++){
        let auxLastIndStr = text[i].length-1;
        if (text[i].charAt(auxLastIndStr) != '0' && text[i].charAt(0) != 'p'){
            text[i] += ' ' + text[i+1];
            text.splice((i+1), 1);
        }
    }

    //console.log(text);

    // Pegando o numero de clauses e vars
    var NUM_VARS = 0;
    var NUM_CLAU = 0;
    var hasProblemLine = true;
    // serve pra definir o array de Clauses
    var usarNoFor = 1;
    var retirarNoFor = 0;

    if (text[0].charAt(0) === 'p'){
        let arrayAux = text[0].split(' ');
        if (arrayAux[1] === 'cnf'){
            NUM_VARS = arrayAux[2];
            NUM_CLAU = arrayAux[3];
        }
    } else{
        // Caso nao tenha a linha 'p cnf x y'
        NUM_CLAU = text.length;
        usarNoFor = 0;
        retirarNoFor = 1;
        hasProblemLine = false;
    }

    // Testar pra ver se o problem expecification esta certo
        //comeca em 1 pra pular o p cnf 5 6
        for (let i = 1, counter = 0; i < text.length && hasProblemLine; i++){
            let auxTam;
            auxTam = text[i].length;

            if (text[i].charAt(auxTam-1) == 0)
                counter++;
            
            if (i == text.length-1 && counter != NUM_CLAU){
                console.log('There is a error on the problem expecifications!\nThe number of Clauses is problably wrong.');
                return;
            }
        }
    
    //console.log(NUM_VARS, NUM_CLAU);
    //console.log(text);
    // Fazendo o array de Clausulas
    var arrayClauses = [];
    for (let i = usarNoFor; i <= (NUM_CLAU - retirarNoFor); i++){
        let aux = text[i].split(' ');
        let aux2 = [];
        
        // Insere no aux2 em formato de Inteiro
        for (let j = 0; j < aux.length-1; j++){
            aux2.push( parseInt(aux[j]) );
        }

        arrayClauses.push(aux2);
    }

    //console.log(arrayClauses);
    
    // caso nao tenha o NUM_VARS ainda...
    if (NUM_VARS === 0){
        for (let i = 0; i < arrayClauses.length; i++){
            for (let j = 0; j < arrayClauses[i].length; j++){
                if (arrayClauses[i][j] > NUM_VARS){
                    NUM_VARS = arrayClauses[i][j];
                }
            }
        }
    }


    var arrayDosTestes = get2NCombs(NUM_VARS);

    //console.log(arrayDosTestes);
    const resposta = doTest(arrayDosTestes, arrayClauses);

    if (resposta.boolean){
        console.log('isSat\nSastifying assigment:', resposta.teste);
    }
    else
        console.log('Is not SAT!!!');
}

function doTest(arrayDosTestes, arrayClauses){
    
    for (let indexTeste = 0; indexTeste < arrayDosTestes.length; indexTeste++){
        // Manda um teste diferente a cada loop
        for (let indexClau = 0; indexClau < arrayClauses.length; indexClau++){
            // Manda uma clausula diferente com o mesmo teste
            if (!doClause(arrayDosTestes[indexTeste], arrayClauses[indexClau])){
                //se retornar alguma clausula false, o teste nao satisfaz
                break;//quebra e vai pro proximo teste
            }else if (indexClau === (arrayClauses.length - 1)){
                //Se chegou aqui eh porque nao achou nenhum falso
                return {boolean: true, teste: arrayDosTestes[indexTeste]};
            }
        }
    }

    return {boolean: false, teste: null}
}

function doClause(testeAtual, clauAtual){
    let arrayBool = [...testeAtual];
   // console.log('Testando o:\n', arrayBool, '\n na:' + clauAtual + '\n que voltou: ' );

    for (let x = 0; x < clauAtual.length; x++){
        let indexNoBool = (Math.abs(clauAtual[x]) - 1);
        
        // Inverter o valor
        if (clauAtual[x] < 0){
            arrayBool[indexNoBool] = !arrayBool[indexNoBool];
        }

        // Como se trata de UNIAO, basta um true!
        if (arrayBool[indexNoBool]){
            //console.log('TRUE');
            return true;
        }
    }
    // Se nao achar nenhum true, eh pq eh tudo false
    //console.log('FALSE');
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

        // Preenchendo o textAux
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