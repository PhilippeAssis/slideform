## SlideForm

Para ver os exemplos contidos na biblioteca, é necessário o download dos components listados no bower, para isso, na raiz da biblioteca, use:

`bower install`

* * *

#### Uso

Para instanciar e iniciar a biblioteca, use:

```javascript
var myForm = $('#myForm').slideform()
```

Para executar callback's nos eventos de transição dos quadros use:

```javascript
//to next myForm.beforeNext = function(){ //... } 
//to preview myForm.beforePrev = function(){ //... }
```

#### Eventos

Esses são os eventos personalizados

*   **init** - Inicia executando chamando o primeiro quadro (o mesmo que nextSection).
*   **nextSection** - Chama o próximo quadro.
*   **prevSection** - Chama o quadro anterior.
*   **review** - Modeo de revisão, exibe todos os quadros.

#### Classes

As classes determinam o tipo de ação ou estrutura de cada item

*   **title** - Area de título do quadro.
*   **body** - Area de conteúdo do quadro.
*   **footer** - Area de rodapé do quadro, não exibido em review.
*   **no-review** - Ao atribuir essa classe, o elemente não será exibido no modo de revisão.
*   **next** - Ao clicar vai para o próximo quadro.
*   **prev** - Ao clicar vai para o quadro anterior.
*   **selections** - Cria uma lista dinamica para seleção de item.

#### Quadros

Os quadros são elementos form e section. Esses elementos devem está dentro do elemento no qual o slideform foi atribuido.
Os quadros que contém campos de formulário, mesmo ocultos devem aderir a tag **form** e não *section*.
 É aconselhavél o uso de **section** para quadros sem campos de formulário.  

##### Exemplo
```html
<section>
    <div class="title">
        <h3>Bem-vindo ao formulário</h3>
    </div>
    <div class="body">
        <p>Isso é um fomulário, clique no botão <em>Próximo</em> para continuar</p>
    </div>
    <div class=footer>
        <a class="next">Próximo</a>
    </div>
</section>

<form>
    <div class="title">
        <h3>Isso é um título</h3>
    </div>
    <div class="body">
        <input type="text" name="name" placeholder="Escreva um nome">
    </div>
    <div class=footer>
        <a class="prev">Voltar</a>
        <a class="next">Próximo</a>
    </div>
</form>
```
##### .selections
Para gerar uma lista de seleção de itens, é necessário a classe *.selection*, siga o exemplo abaixo:
```html
<form>
    <div class="title">
        <h3>Isso é um título</h3>
    </div>
    <div class="body">
        <input type="hidden" name="item">
        <ul class="selections">
                            <li>
                                <a data-value="1">Item 1</a>
                            </li>
                            <li>
                                <a data-value="2">Item 2</a>
                            </li>
                            <li>
                                <a data-value="3">Item 3</a>
                            </li>
                            <li>
                                <a data-value="4">Item 4</a>
                            </li>
                            <li>
                                <a data-value="5">Item 5</a>
                            </li>
                            <li>
                                <a data-value="6">Item 6</a>
                            </li>
                        </ul>
    </div>
    <div class=footer>
        <a class="prev">Voltar</a>
        <a class="next">Próximo</a>
    </div>
</form>
```

#### slideform.styl
Por padrão adotamos o [Stylus](http://stylus-lang.com) para gerar a folha de estilo, para perfeito funcionamento desse aquivo é necessário a biblioteca [stylus-essential](http://github.com/PhilippeAssis/stylus-essential).

No arquivo *slideform.styl* você encontra as seguintes variáveis para customização.

*   **$sections-a-color-hover-active** - Cor de texto dos links em estado hover ou active
*   **$sections-a-background-hover-active** - Cor do background dos links em estado hover ou active
*   **$status-sm-background** - Background da barra de status em modo mobile
*   **$status-sm-color** - Cor de texto da barra de status em modo mobile
