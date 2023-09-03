AFRAME.registerComponent("info-side-view", {
    init:function(){
        this.createInformation();
    },
    tick:function(){
        const informationContainer = document.querySelector("#information-container")
        const {state} = informationContainer.getAttribute("info")

        if (state ==="view" || state ==="change-view"){
            this.el.setAttribute("visible", true)
        } else{
            this.el.setAttribute("visible", false)
        }
    },

    createInformation:function(){
        const sideViewContainer = document.querySelector(
            "#side-view-container"
        );

        let previousXPosition = -150
        let previousYPosition = 30

        for (var i=1; i<=4; i++){
            const position = {
                x:(previousXPosition +=50),
                y:(previousYPosition +=2),
                z:-40
            };
            const entityEl = this.createInfoThumbnail(position, i);
            sideViewContainer.appendChild(entityEl)
        }
    },
   createInfoThumbnail:function(position, id){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true)
    entityEl.setAttribute("id", `info-${id}`)

    entityEl.setAttribute("geometry", {
        primitive:"circle", 
        radius:2.5
    })

    entityEl.setAttribute("material", {
        src:"./assets/magglass.png", 
        opacity:0.9
    })
    entityEl.setAttribute("position", position)
    entityEl.setAttribute("cursor-listener", {})

    return entityEl
   }
})