(function () {
    const CARD_LIST = [];
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
                PREFABS[e].html.blocks.forEach((e) => {
                    createEl({ tag: 'div', block: e, parent: parentEl, classname:'el' })
                })
                STAGE.appendChild(parentEl);
            }
        }
    }

    function createEl({ tag, block, parent, classname } = {}) {
        let e = document.createElement(tag);
        if (classname) { e.setAttribute('class', classname); }
        if (block) { e.dataset.block = block; }
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