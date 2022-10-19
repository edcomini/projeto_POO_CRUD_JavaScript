class Motocicleta{

    constructor(){
        this.sku = 1;
        this.arrayMotocicletas = [];
        this.editSku = null;
    }

    salvar(){
       let produto = this.lerDados();
       
       if(this.validaCampos(produto)){

            if(this.editSku == null){
                this.adicionar(produto);
            } else {
                this.atualizar(this.editSku, produto);
            }
            
       }

       this.listaTabela();
       this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayMotocicletas.length; i++){
            let tr = tbody.insertRow();

            let td_sku = tr.insertCell();
            let td_marca = tr.insertCell();
            let td_modelo = tr.insertCell();
            let td_anoDeFabricacao = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_sku.innerText = this.arrayMotocicletas[i].sku;
            td_marca.innerText = this.arrayMotocicletas[i].marcaDaMoto;
            td_modelo.innerText = this.arrayMotocicletas[i].modeloDaMoto;
            td_anoDeFabricacao.innerText = this.arrayMotocicletas[i].anoDeFabricacaoDaMoto;
            td_valor.innerText = this.arrayMotocicletas[i].valorDaMoto;

            td_sku.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick", "motocicleta.preparaEdicao("+ JSON.stringify(this.arrayMotocicletas[i]) +")");


            let imgDelete = document.createElement('img');
            imgDelete.src='img/botao-apagar.png';
            imgDelete.setAttribute("onclick", "motocicleta.deletar("+ this.arrayMotocicletas[i].sku +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            console.log(this.arrayMotocicletas);

        }
    }

    adicionar(produto){

        produto.valorDaMoto = parseFloat(produto.valorDaMoto);
        this.arrayMotocicletas.push(produto);
        this.sku++;
    }

    atualizar(sku, produto){
       for (let i = 0; i < this.arrayMotocicletas.length; i++) {
            if(this.arrayMotocicletas[i].sku == sku){
                this.arrayMotocicletas[i].marcaDaMoto = produto.marcaDaMoto;
                this.arrayMotocicletas[i].modeloDaMoto = produto.modeloDaMoto;
                this.arrayMotocicletas[i].anoDeFabricacaoDaMoto = produto.anoDeFabricacaoDaMoto;
                this.arrayMotocicletas[i].valorDaMoto = produto.valorDaMoto;
                
            }
       }    
    }

    preparaEdicao(dados){

        this.editSku = dados.sku;

       document.getElementById('marca').value = dados.marcaDaMoto;
       document.getElementById('modelo').value = dados.modeloDaMoto;
       document.getElementById('anoDeFabricacao').value = dados.anoDeFabricacaoDaMoto;
       document.getElementById('valor').value = dados.valorDaMoto;

       document.getElementById('btn1').innerText = 'Atualizar';
    }
    
    
    lerDados(){
       let produto = {};

       produto.sku = this.sku;
       produto.marcaDaMoto = document.getElementById('marca').value;
       produto.modeloDaMoto = document.getElementById('modelo').value;
       produto.anoDeFabricacaoDaMoto = document.getElementById('anoDeFabricacao').value;
       produto.valorDaMoto = document.getElementById('valor').value;

       return produto;
    }

    validaCampos(produto){
        let msg = '';

        if(produto.marcaDaMoto == ''){
            msg += '-Informe a marca da motocicleta \n';
        }
        if(produto.modeloDaMoto == ''){
            msg += '-Informe o modelo da motocicleta \n';
        }
        if(produto.anoDeFabricacaoDaMoto == ''){
            msg += '-Informe o ano de fabricação da motocicleta \n';
        }
        if(produto.valorDaMoto == ''){
            msg += '-Informe o valor da motocicleta \n';
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true;
    }
    cancelar(){
       document.getElementById('marca').value = '';
       document.getElementById('modelo').value = '';
       document.getElementById('anoDeFabricacao').value = '';
       document.getElementById('valor').value = '';

       document.getElementById('btn1').innerText = 'Salvar';
       this.editSku = null;
    }

    deletar(sku){

        if(confirm('Deseja realmente deletar o item ' + sku)){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayMotocicletas.length; i++){
                if(this.arrayMotocicletas[i].sku == sku){
                    this.arrayMotocicletas.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
            console.log(this.arrayMotocicletas);
        } 
    }
}


var motocicleta = new Motocicleta();