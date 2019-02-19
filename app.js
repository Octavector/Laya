(function () {
    const BLOCK_LIST = {
        // each entry in the list represnets a block, each contains a unique ID, reference name and the raw element itself.
        list:[], 
        max_id:0,
        add(id, block, block_ref, raw){
            this.list.push({
                id,
                block_ref,
                block,
                raw
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
    const BTN_EXPORT = document.querySelector('.exportBtn');
    BTN_EXPORT.addEventListener('click', exportProject);
    window.addEventListener('mousemove',mouseManagement);

    function cardsClick(e) {
        if (e.target.className === 'card-actor') {
            console.log('actor click');
        }

        switch (e.target.dataset.prefab) {
            case 'prefab1':
                createRow('prefab1');
                break;
            case 'prefab2':
                createRow('prefab2');
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
                BLOCK_LIST.add(id, parentEl, e, parentEl.outerHTML); //outerHTML grabs HTML string from what we've just created, not anything scraped from the page
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

    const SAVE_DATA = (function () {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
                blob = new Blob([data], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    function mouseManagement(event){
        BLOCK_LIST.list.forEach((e)=>{
            let box = e.block.getBoundingClientRect()
            let deleteBtnEl = hasChild(e.block, 'deleteBtn');
            if(event.x > box.left && event.x < box.right && event.y > box.top && event.y < box.bottom){
                if(!deleteBtnEl){
                    hoverDelete(e);
                }
            }
            else{
                if(deleteBtnEl){deleteBtnEl.parentElement.removeChild(deleteBtnEl);}
            }
        });
    }


    function hoverDelete(e){
        //delete button appears
        createEl({ tag:'button', parent:e.block, classname:'deleteBtn',content:'Delete' });
    }

    //e => parent element to search the children, classname => the classname of the child we are looking for
    function hasChild(e,classname){
        for(let i=0, j=e.childNodes.length; i < j; i++){
            if(e.childNodes[i].className === classname){
                return e.childNodes[i];
            }
        }
        return null;
    }


    function exportProject(){
        //GRAB CSS
        //varify correct CSS file?
        //css only needs to be done once, so move out of export function and do on load?
        let cssRuleList = Array.from(document.styleSheets[1].cssRules);
        let cssRuleString = '';
        cssRuleList.forEach((e)=>{
            cssRuleString += e.cssText;
        });
        console.log(cssRuleString);

        //GRAB HTML
        let html_data ='';
        BLOCK_LIST.list.forEach((e)=>{
            html_data += e.raw;
        })
       // console.log(html_data);
        let data = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Title of the document</title>
<style>
${cssRuleString}
</style>
</head>
        
<body>
${html_data}
</body>
        
</html> 
`
        SAVE_DATA(data, 'laya-project.html');
    }

    // PREFABS
    // contains the instructional data for building the DOM elements the right way
    const PREFABS = {
        prefab1: {
            html: {
                parent: 'row',
                blocks: ['pf1_el1', 'pf1_el2', 'pf1_el3', 'pf1_el4']
            }
        },
        prefab2: {
            html: {
                parent: 'row',
                blocks: ['pf2_el1', 'pf2_el2', 'pf2_el3', 'pf2_el4', 'pf2_el5', 'pf2_el6']
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