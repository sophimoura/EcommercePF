const Produto = require('../ModeloDB/ModeloProdutos');

// Página de administração (lista produtos)
exports.adminDashboard = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.render('admin/dashboard', { produtos });
    } catch (error) {
        res.status(500).send('Erro ao carregar o painel de administração');
    }
};

// Formulário para adicionar um novo produto
exports.addProdutoForm = (req, res) => {
    res.render('admin/addProduto');
};

// Adicionar um novo produto
exports.addProduto = async (req, res) => {
    const { nome, descricao, preco, imagens, categoria, estoque } = req.body;
    try {
        const novoProduto = new Produto({ nome, descricao, preco, imagens, categoria, estoque });
        await novoProduto.save();
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Erro ao adicionar produto');
    }
};

// Formulário para editar um produto
exports.editProdutoForm = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) return res.status(404).send('Produto não encontrado');
        res.render('admin/editProduto', { produto });
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Editar um produto existente
exports.editProduto = async (req, res) => {
    const { nome, descricao, preco, imagens, categoria, estoque } = req.body;
    try {
        await Produto.findByIdAndUpdate(req.params.id, { nome, descricao, preco, imagens, categoria, estoque });
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Erro ao atualizar produto');
    }
};

// Excluir um produto
exports.deleteProduto = async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Erro ao excluir produto');
    }
};
