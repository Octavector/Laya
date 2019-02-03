(function(){
    const CARD_LIST = [];

    const cards = document.querySelector('.cards');
    cards.addEventListener('click',cardsClick);

    function cardsClick(e){
        if(e.target.className === 'card-actor'){
            console.log('actor click');
        }

        switch (e.target.dataset.prefab) {
            case 'prefab1':
              createRow('prefab1');
              break;

            default:
              console.log('no prefab detected');
          }



    }

    function createRow(e){
        console.log('building row ' + e);
    }

    function createEl(e){

    }

    // PREFABS
    // contains the instructional data for building the DOM elements the right way
    const PREFABS = {
        prefab1:{
            html:{
                parent:'.row',
                children:['.el .el1','.el .el2','.el .el3','.el .el4']
            },
            css:''

        }
    }

}())


/*
prefab1:
<div class="row">
  <div class="el el1">1</div>
  <div class="el el2">2</div>
  <div class="el el3">3</div>
  <div class="el el4">4</div>
</div>
*/