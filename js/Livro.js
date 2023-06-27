class Livro{
    _id;
    _titulo;
    _autor;
    _preco;
    _paginas;
    _status;
    _data;

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get titulo() {
        return this._titulo;
    }
    set titulo(value) {
        this._titulo = value;
    }

    get autor() {
        return this._autor;
    }
    set autor(value) {
        this._autor = value;
    }

    get preco() {
        return this._preco;
    }
    set preco(value){
        this._preco = value;
    }

    get paginas() {
        return this._paginas;
    }
    set paginas(value){
        this._paginas = value;
    }

    get status() {
        return this._status;
    }
    set status(value){
        this._status = value;
    }

    get data() {
        return this._data;
    }
    set data(value){
        this._data = value;
    }

    constructor() {

    }
}