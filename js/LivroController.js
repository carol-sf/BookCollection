class LivroController {
    _livros = [];

    inicializaElementos() {
        this.inpCodigo = document.querySelector('#inpCodigo');
        this.inpTitulo = document.querySelector('#inpTitulo');
        this.inpAutor = document.querySelector('#inpAutor');
        this.inpPreco = document.querySelector('#inpPreco');
        this.inpPaginas = document.querySelector('#inpPaginas');
        this.inpStatus = document.querySelector('#inpStatus');
        this.inpData = document.querySelector('#inpData');
        this.btnSalvar = document.querySelector('#btnSalvar');
        this.bodyLivro = document.querySelector('#bodyLivro');
        this.divTotal = document.querySelector('#divTotal');
    }

    inicializaEventos() {
        this.btnSalvar.addEventListener('click', e => {
            this.salvar(this.inpCodigo.value,this.inpTitulo.value, this.inpAutor.value, this.inpPreco.value, this.inpPaginas.value, this.inpStatus.value, this.inpData.value);
            this.exibir();
            this.limpar();
            this.inpTitulo.focus();
        })
    }

    salvar(pId, pTitulo, pAutor, pPreco, pPaginas, pStatus, pData) { 
        let l;

        if(pId == 0) {
            l = new Livro();
        } else {
            l = this._livros.filter(l => l.id == pId)[0];
            if(!l) {
                l = new Livro();
            }
        }

        l.titulo = pTitulo;
        l.autor = pAutor;
        l.preco = pPreco;
        l.paginas = pPaginas;
        l.status = pStatus;
        l.data = pData;
        if(pId == 0) {
            l.id = this._livros.length + 1;
            this._livros.push(l);
        }
    }

    exibir() {
        let linhas = '';
        this._livros.forEach(l => {
            linhas += 
            `<tr>
                <td>${l.id}</td>
                <td>${l.titulo}</td>
                <td>${l.autor}</td>
                <td>${l.preco}</td>
                <td>${l.paginas}</td>
                <td>${l.status}</td>
                <td>${l.data}</td>
                <td>
                    <button id="btnAlterar${l.id}" class="btn btn-primary btn-db" data-id="${l.id}">Alterar</button>
                    <button id="btnExcluir${l.id}" class="btn btn-danger btn-db" data-id="${l.id}">Excluir</button>
                </td>
            </tr>`;
        });

        this.bodyLivro.innerHTML = linhas;
        this.eventosDB();
        this.calculaTotal();
    }

    limpar() {
        this.inpTitulo.value = '';
        this.inpAutor.value = '';
        this.inpPreco.value = '';
        this.inpPaginas.value = '';
        this.inpStatus.value = '';
        this.inpData.value = '';
    }

    eventosDB() {
        let self = this; 
        this.bodyLivro.querySelectorAll('.btn-db').forEach(btn => {
            let id = btn.id.toUpperCase();
            
            console.log('entrei2');

            if(id.indexOf('BTNEXCLUIR') != -1) { 
                btn.addEventListener('click', e => {
                    self.excluir(btn.dataset.id);
                })
            }

            if(id.indexOf('BTNALTERAR') != -1) { 
                btn.addEventListener('click', e => {
                    self.alterar(btn.dataset.id);
                })
            }
        });
    }

    alterar(pId) {
        if(pId) {
            let l = this._livros.filter(l => l.id == pId)[0];

            if(l) {
                this.inpCodigo.value = l.id;
                this.inpTitulo.value = l.titulo;
                this.inpAutor.value = l.autor;
                this.inpPreco.value = l.preco;
                this.inpPaginas.value = l.paginas;
                this.inpStatus.value = l.status; 
                this.inpData.value = l.data; 
            }
        }
    }

    excluir(pId) {
        if(pId) {
            if(confirm('Deseja excluir?')) {
                this._livros = this._livros.filter(l => l.id != pId);
            }
            this.exibir();
        }
    }

    calculaTotal() {
        let total = this._livros.reduce((toArray, l) => {
            return toArray + parseFloat(l.preco);
        }
        , 0);
        this.divTotal.innerHTML = `R$ ${total}`;
    }

    constructor() {
        this.inicializaElementos();
        this.inicializaEventos();
    }
}