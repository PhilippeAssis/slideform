## SlideForm

Para ver os exemplos contidos na biblioteca, é necessário o download dos components listados no bower, para isso, na raiz da biblioteca, use:

`bower install`

* * *

#### Uso

Para instanciar e iniciar a biblioteca, use:

`var myForm = $('#myForm').slideform()`

Para executar callback's nos eventos de transição dos quadros use:

`//to next myForm.beforeNext = function(){ //... } 
//to preview myForm.beforePrev = function(){ //... }`