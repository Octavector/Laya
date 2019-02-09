(function () {
    const BLOCK_LIST = {
        // each entry in the list represnets a block, each contains a unique ID, reference name and the element itself.
        list:[], 
        max_id:0,
        add(id, block, block_ref){
            this.list.push({
                id,
                block_ref,
                block
            });
        },
        build(){
            this.list.forEach((e)=>{
               STAGE.appendChild(e.block);
            })
        }
    };
    const STAGE = document.querySelector('.stage');
    const CARDS = document.querySelector('.cards');
    CARDS.addEventListener('click', cardsClick);

    function cardsClick(e) {
        if (e.target.className === 'card-actor') {
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

    function createRow(e) {
        console.log('building row ' + e);
        //1. find the matching prefab name in the PREFABS object
        //2. within the HTML property find the parent and create the obejct
        //3. Find the children and iterate through then creating their elements
        //4. add to the parent and add to the DOM.

        for (var prop in PREFABS) {
            if (prop === e) {
                //create the parent
                let parentEl = createEl({ tag: 'div', classname: PREFABS[e].html.parent + ' ' + e });
                PREFABS[e].html.blocks.forEach((e,i) => {
                    createEl({ tag: 'div', block: e, parent: parentEl, classname:'el', content: i+1})
                })
                let id = BLOCK_LIST.max_id++;
                BLOCK_LIST.add(id, parentEl, e);
                BLOCK_LIST.build();
            }
        }
    }

    function createEl({ tag, block, parent, classname,content } = {}) {
        let e = document.createElement(tag);
        if (block) { e.dataset.block = block; }
        if (classname) { e.setAttribute('class', classname); }
        if (content){
            let txt = document.createTextNode(content);
            e.appendChild(txt);
        }
        if (parent) { parent.appendChild(e); }
        return e;
    }

    // PREFABS
    // contains the instructional data for building the DOM elements the right way
    const PREFABS = {
        prefab1: {
            html: {
                parent: 'row',
                blocks: ['pf1_el1', 'pf1_el2', 'pf1_el3', 'pf1_el4']
            }


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