export class Carrossel{
    constructor(anterior, proximo, listaProdutos, navegacao){
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.navegacao = document.querySelector(navegacao);

        this.slides = this.getListaSlides();
        this.indicadores = this.getListaIndicadores();
        this.tamanhoSlide = this.getTamanhoSlides();

        this.indiceDoSlideAtual = 0

        this.proximo.addEventListener('click', this.proximoSlide.bind(this))
        this.anterior.addEventListener('click', this.anteriorSlide.bind(this))

        this.navegacao.addEventListener('click', this.pularParaSlide.bind(this))


        this.preparaSlides()


    
    }

    getListaSlides() {
        return Array.from(this.listaProdutos.children)
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children)
    }

    getTamanhoSlides() {
        return this.slides[0].getBoundingClientRect().width
    }

    getSlideAtual () {
        return this.slides[this.indiceDoSlideAtual]
    }

    getIndiceAtual () {
        return this.indicadores[this.indiceDoSlideAtual]
    }


    proximoSlide (){
        let proximaPosicao = this.indiceDoSlideAtual + 1
        if(proximaPosicao > this.slides.length -1){
            proximaPosicao = 0
        }

        this.vaParaSlide(proximaPosicao)
    }

    anteriorSlide (){
        let anteriorSlide = this.indiceDoSlideAtual - 1
        if(anteriorSlide < 0){
            anteriorSlide = this.slides.length -1
        }

        this.vaParaSlide(anteriorSlide)
    }

    vaParaSlide (posicao){

        const indicadorAtual = this.getIndiceAtual()

        this.indiceDoSlideAtual = posicao

        const indicadorSelecionado = this.getIndiceAtual()

        this.scrollParaSlide(this.getSlideAtual())
 
        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado)
 
    }

    scrollParaSlide (slideSelecionado){
        this.listaProdutos.style.transform = 'translateX(-' + slideSelecionado.style.left + ')'
    }


    atualizaIndicadores(indidacorAtual, indicadorSelecionado){
        indidacorAtual.classList.remove('carrossel__indicador--ativo')

        indicadorSelecionado.classList.add('carrossel__indicador--ativo')
    }


    pularParaSlide(evento){
        if(evento.target === evento.target.currentTarget) return

        const indicadorSelecionado = evento.target.getAttribute('data-indicador')

        this.vaParaSlide(parseInt(indicadorSelecionado))
    }

    preparaSlides() {
        this.slides.forEach((slides, i)=>{
            slides.style.left = this.tamanhoSlide * i + 'px'
        })
    }

}