const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models=require('./models');

const app=express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;
let itemcompra=models.ItemCompra;
let compra=models.Compra;
let produto=models.Produto;

app.get('/', function(req,res){
    res.send('Olá, mundo!')
});

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto adicionado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/clientes', async(req,res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente cadastrado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/compras', async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra cadastrada com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.post('/itempedidos', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        })
    });
});

app.post('/itemcompras', async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar"
        })
    });
});

app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        // raw: true
        order: [['nome','ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/listaprodutos', async(req,res)=>{
    await produto.findAll({
        order: [['nome','ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});

app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req,res)=>{
    await servico.findByPk(req.params.id).then(serv=>{
        return res.json({
            error: false,
            serv
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: código não encontrado!"
        });
    });
});

app.get('/produto/:id', async(req,res)=>{
    await produto.findByPk(req.params.id).then(prod=>{
        return res.json({
            error: false,
            prod
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: código não encontrado!"
        });
    });
});

app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        order: [['nascimento','ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listapedidos', async(req, res)=>{
    await pedido.findAll({
        order: [['ClienteId','DESC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
        order: [['ClienteId','DESC']]
    }).then(function(compras){
        res.json({compras})
    });
});

app.get('/qntdclientes', async(req,res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

app.get('/qntdpedidos', async(req,res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

app.get('/qntdcompras', async(req,res)=>{
    await compra.count('id').then(function(compras){
        res.json({compras});
    });
});

app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço"
        });
    });
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.get('/compras/:id', async(req, res)=>{
    await compra.findByPk(req.params.id,{include:[{all: true}]})
    .then(comp=>{
        return res.json({comp});
    });
});

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item={
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };  

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: "O serviço não foi encontrado."
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},{PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: "O pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar"
        });
    });
});

app.get('/clientes/:id', async(req, res)=>{
    await cliente.findByPk(req.params.id,{include:[{all: true}]})
    .then(clie=>{
        return res.json({clie});
    });
});

app.put('/clientes/:id/editarcliente', async(req, res)=>{
    const clie={
        nome: req.body.nome,
        endereço: req.body.endereço,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento,
        clienteDesde: req.body.clienteDesde
    };

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não foi encontrado."
        });
    };  

    await cliente.update(clie, {
        where: {id: req.params.id}
    }).then(function(clien){
        return res.json({
            error: false,
            message: "Os dados do cliente foram alterados com sucesso!",
            clien
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar"
        });
    });
});

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "O cliente foi excluido com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente"
        });
    });
});

app.put('/pedidos/:id/editarpedido', async(req, res)=>{
    const ped={
        data: req.body.data,
        ClienteId: req.body.ClienteId
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Pedido não foi encontrado."
        });
    };  

    await pedido.update(ped, {
        where: {id: req.params.id}
    }).then(function(itens){
        return res.json({
            error: false,
            message: "O pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Não foi possível alterar"
        });
    });
});


let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})