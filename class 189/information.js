AFRAME.registerComponent("info", {
    schema:{
        state:{type:"string", default:"information-list"},
        selectedCard:{type:"string", deault:"#card1"},
        zoomAspectRation:{type:"number", default:1}
    },
    init:function(){
        this.informationContainer = this.el
        this.cameraEl = document.querySelector("#camera")
        this.createCards()
        
    },
    update: function() {
        window.addEventListener("keydown", e => {
          if (e.key === "ArrowUp") {
            if (
              (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
              (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio += 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
          if (e.key === "ArrowDown") {
            if (
              (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
              (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio -= 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
        });
      },
    tick:function(){
        const{state} = this.el.getAttribute("info");

        if(state==="view"){
            this.hideEl([this.informationContainerContainer])
            this.showView()
        }

    },
    hideEl:function(eList){
        eList.map(el=>{
            el.setAttribute("visible", false)
        })
    },

    showView:function(){
        const{selectedCard} = this.data
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material", {
            src:`./assets/agegroup/${selectedCard}/info-0.jpg`
        })
    },

    createCards:function(){
        const thumbNailsRef=[
            {
                id:"infants", 
                title:"Infants", 
                url:"./assets/agegroup/infantsimg.jpeg"
            }, 
            {
                id:"adolescents", 
                title:"Adolescents", 
                url:"./assets/agegroup/adolescentsimg.jpeg"
            }, 
            {
                id:"adults", 
                title:"Adults", 
                url:"./assets/agegroup/adultsimg.jpeg"
            }, 
            {
                id:"elder-adults", 
                title:"Elder Adults", 
                url:"./assets/agegroup/elderadultsimg.jpeg"
            }
        ]

        let previousPosition=-60;

        for(var item of thumbNailsRef){
            const posX = previousPosition + 25
            const posY = 10
            const posZ = -40
            const position={x:posX, y:posY, z:posZ}
            previousPosition = posX

            const borderEl = this.createBorder(position, item.id);

            const thumbNail = this.createThumbNail(item);
            borderEl.appendChild(thumbNail)
            
            const titleEl = this.createTitleEl(position, item)
            borderEl.appendChild(titleEl)

            this.informationContainer.appendChild(borderEl)
        }
    }, 

    createBorder: function(position, id){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("id", id)
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {
            primitive:"ring", 
            radiusInner:9, 
            radiusOuter:10
        })

        entityEl.setAttribute("position", position)
        entityEl.setAttribute("material", {
            color:"#90EE90", 
            opacity:1
        })
        return entityEl
    },
    createThumbNail: function(item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {
            primitive:'circle',
            radius:8.5
        })

        entityEl.setAttribute("material", {src:item.url})
        return entityEl
    }, 
    createTitleEl:function(position, item){
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("text", {
            font:"exo2bold", 
            align:"center", 
            width:70, 
            color:"#e65100", 
            value:item.value
        })
        const elPosition = position
        elPosition.y=-20
        entityEl.setAttribute("position", elPosition)
        entityEl.setAttribute("visible", true)
        return entityEl
    }
})