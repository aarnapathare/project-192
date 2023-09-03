AFRAME.registerComponent("cursor-listener", {
    schema:{
        selectedItemId:{default:'', type:"string"}
    },
    init:function(){
        this.handleClickEvents();
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
    },

    handleClickEvents:function(){
        this.el.addEventListener("click", evt=>{
            const informationContainer = document.querySelector("#information-container")
            const {state} = informationContainer.getAttribute("info")
            
            if(state==="information-list"){
                const id=this.el.getAttribute("id")
                const infoId = ["infants", "adolescents", "adults", "elder-adults"]
                if(infoId.includes(id)){
                       { informationContainer.setAttribute("info", {
                            state:"view",
                            selectorCard:id
                        })}
                   
                }
                if(state==="view"){
                    this.handleViewState()
                }

            }
            if(state==="change-view"){
                this.handleViewState
            }
           
        })
    },

    handleViewState:function(){
        const el = this.el
        const id = el.getAttribute("id")
        const informationContainer = document.querySelector("information-container")
        const {selectedItemId} = informationContainer.getAttribute("cursor-listener")
        const sideViewInfoId = ["info-1", "info-2", "info-3", "info-4"]
        if(sideViewInfoId.includes(id)){
            informationContainer.setAttribute("info", {
                state:"change-view"
            })
            const skyEl = document.querySelector("main-container")
            skyEl.setAttribute("material", {
                src:`./assets/agegroup/${selectedItemId}/{id}.jpg`, 
                color:"#fff"
            })
        }
    }, 

    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter", ()=>{
            const informationContainer = document.querySelector("#information-container")
            const {state} = informationContainer.getAttribute("info")
            if(state==="info-list"){
                this.handleInfoState()
            }
        })
    },
    handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave", ()=>{
            const informationContainer = document.querySelector("#information-container")
            const {state} = informationContainer.getAttribute("info")
            if(state==="information-list"){
                const{selectedItemId} = this.data;
                if(selectedItemId){
                    const el = document.querySelector(`${selectedItemId}`);
                    const id = el.getAttribute("id")
                    if(id===selectedItemId){
                        el.setAttribute("material", {
                            color:"#0077CC",
                            opacity:1
                        })
                    }
                }
            }
        })
    }, 
    handleInfoState: function(){
        const id=this.el.getAttribute("id");
        const infoId = ["infants", "adolescents", "adults", "elder-adults"]
        if (infoId.includes(id)){
            const informationContainer = document.querySelector("#information-container")
            informationContainer.setAttribute("cursor-listener", {
                selectedItemId:id
            })
            this.el.setAttribute("material", {
                color:"#D76B30", 
                opacity:1
            })
        }
    }
})
