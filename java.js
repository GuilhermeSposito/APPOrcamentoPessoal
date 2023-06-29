class Despesas{

    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }



}

class Bd{

    constructor(){
        if(localStorage.getItem('id') === null){
            localStorage.setItem('id' , 0)
        }
    }
 
    getproximoId(){
      let id = localStorage.getItem('id') // vai ser igual a 0
      return parseInt(id) + 1  
    }

    insereObjetoStorage(d){
        let id = this.getproximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id) // agora vai ser = 1
    }

    pegaObjetoDoStorage(){
        let despesa = Array()
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id ; i++){
          
            let despesas = JSON.parse(localStorage.getItem(i))
            if(localStorage.getItem(i) === null){
                continue
            }

            despesas.id = i
            despesa.push(despesas)
        } 

        return despesa
    }

    pesquisa(obj){
        let despesasFiltradas = Array()
        despesasFiltradas = this.pegaObjetoDoStorage()

        if(obj.ano != ''){
        despesasFiltradas = despesasFiltradas.filter(d=>d.ano == obj.ano)
        }

        if(obj.mes != ''){
        despesasFiltradas = despesasFiltradas.filter(d=>d.mes == obj.mes)
        }    
        if(obj.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.dia == obj.dia)
        }

        if(obj.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.tipo == obj.tipo)
        }

        if(obj.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.descricao == obj.descricao)
        }

        if(obj.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.valor == obj.valor)
        }
        
        return despesasFiltradas
        

    }


}

let bd = new Bd()


function adicionadespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesas = new Despesas(ano,mes, dia, tipo , descricao, valor)


   

    if(ano != '' && mes != '' && dia != '' && tipo != '' && descricao != '' && valor != ''){
    $('#modalRegistraDespesa').modal('show')
    document.getElementById('exampleModalLabel').innerHTML = 'Sucesso Ao inserir Despesa'
    document.getElementById('exampleModalLabel').className = 'text-success'
    let divModalBody =  document.querySelector(".modal-body") 
    divModalBody.innerHTML = 'Todas as Despesas foram Inseridas com sucesso!'
    document.getElementById('button').innerHTML = 'OK'
    document.getElementById('button').className = 'btn btn-success'
    document.getElementById('ano').value =''
    document.getElementById('mes').value =''
    document.getElementById('dia').value = ''
    document.getElementById('tipo').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''
    bd.insereObjetoStorage(despesas)

}else{
    $('#modalRegistraDespesa').modal('show') 
   document.getElementById('exampleModalLabel').innerHTML = 'Erro ao inserir Despesa'
   document.getElementById('exampleModalLabel').className = 'text-danger'
   let divModalBody =  document.querySelector(".modal-body") 
    divModalBody.innerHTML =   'Existem Campos Obrigatórios que não foram Preenchidos'
 
   document.getElementById('button').innerHTML = 'Voltar E Preencher'
   document.getElementById('button').className = 'btn btn-danger'
   
}


}



function insereDespesas(despesas = Array(), filter = false){

    if(despesas.length == 0 && filter == false ){
     despesas = bd.pegaObjetoDoStorage()}




    //inserir dentro de tbody 
    let listaDeDespesa = document.getElementById('tbody')
    listaDeDespesa.innerHTML = ''



    despesas.forEach(function(d){

    switch(d.tipo){
        case '1':
            d.tipo = 'Alimentação'
            break
        case '2':
            d.tipo = 'Educação'
            break          
        case '3':
            d.tipo = 'Lazer'
            break
        case '4':
            d.tipo = 'Saúde'
            break
        case '5':
            d.tipo = 'Transporte'
            break
    }


    let linha = listaDeDespesa.insertRow()
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
    linha.insertCell(1).innerHTML =  d.tipo
    linha.insertCell(2).innerHTML =  d.descricao
    linha.insertCell(3).innerHTML =  `R$ ${d.valor},00`

    let bnt = document.createElement('button')
    bnt.innerHTML = '<i class="fas fa-times"></i>'
    bnt.className = 'btn btn-danger'
    bnt.onclick = function(){
       let id = bnt.id = d.id
        localStorage.removeItem(id)

        $('#modalRegistraDespesa').modal('show')
        document.getElementById('exampleModalLabel').innerHTML = 'Sucesso Ao remover Despesa'
        document.getElementById('exampleModalLabel').className = 'text-success'
        let divModalBody =  document.querySelector(".modal-body") 
        divModalBody.innerHTML = 'Todas as Despesas Selecionadas foram Removidas com sucesso!'
        document.getElementById('button').innerHTML = 'OK'
        document.getElementById('button').className = 'btn btn-success'
        document.getElementById('button').onclick = function(){
            window.location.reload()
        }

    }

    
    linha.insertCell(4).append(bnt)
    
})





}

function pesquisarDespesaClick(){
let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesas = new Despesas(ano,mes, dia, tipo , descricao, valor)
    
    let despesa = Array()
    despesa = bd.pesquisa(despesas)
 
    if(ano != '' || mes != '' || dia != '' || tipo != '' || descricao != '' || valor != ''){
        insereDespesas(despesa , true)
    }else{
        $('#modalRegistraDespesa').modal('show')
        document.getElementById('exampleModalLabel').innerHTML = 'Erro ao filtrar Despesa'
        document.getElementById('exampleModalLabel').className = 'text-danger'
        let divModalBody =  document.querySelector(".modal-body") 
        divModalBody.innerHTML =   'Preencha Pelo menos um Campo para filtrar despesas'
        document.getElementById('button').innerHTML = 'Voltar E Preencher'
        document.getElementById('button').className = 'btn btn-danger'
    }
   

}


function pesquisarDespesabalaco(){

    //faz também o filtro e pega o valor total

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesas = new Despesas(ano,mes, dia, tipo , descricao, valor)
    
    let despesa = Array()
    despesa = bd.pesquisa(despesas)

    insereDespesas(despesa , true)

    let listaDeDespesa1 = document.getElementById('tbody')
    let linha1 = listaDeDespesa1.insertRow()
    linha1.insertCell(0).innerHTML = ''
    linha1.insertCell(1).innerHTML = ''
    linha1.insertCell(2).innerHTML = '<b>Valor Total: </b>'
    

   console.log(despesas)
   let soma = 0

   despesa.forEach(function(d){
    
    soma += parseInt(d.valor)

   })
   
   

   linha1.insertCell(3).innerHTML = `R$ ${soma},00`

}