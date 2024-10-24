async  function FetchData(){
    function clearInfo(){
    document.getElementById("imageSpace").innerHTML="Images"; 
    document.getElementById("abilities").innerHTML="Abilities";
    document.getElementById("forms").innerHTML="Forms";
    document.getElementById("height").innerHTML="Height";
    document.getElementById("species").innerHTML="Species";
    document.getElementById("stats").innerHTML="Attacks Stats";
    document.getElementById("types").innerHTML="Pokemon Type";
    document.getElementById("weight").innerHTML="Weight";
       }
    clearInfo()
    const searchPokemon = document.getElementById("pokemonSearch").value.toLowerCase();
    try{
       const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`);
       if (!response.ok){
           document.getElementById("Error").innerHTML=" File cannot be found maybe there was an error in typo 🤔"
           throw Error(" File cannot be found maybe there was an error in typo 🤔")
        }
        const data = await response.json()
        console.log(data);
        let construct = data.abilities
        for(let i=0; i< construct.length; i++){
            
            console.log(construct[i].ability.name)
            const li = document.createElement("li");
            li.innerHTML = construct[i].ability.name;
            console.log(li);
            document.getElementById("abilities").appendChild(li);
        }

       
        for(let i=0; i<  data.forms.length; i++){
            
            console.log( data.forms[i].name)
            const li = document.createElement("li");
            li.innerHTML =  data.forms[i].name;
            console.log(li);
            document.getElementById("forms").appendChild(li);
        }
       const li = document.createElement("li");
       li.innerHTML= data.height
       document.getElementById("height").appendChild(li);

       construct =data.stats
       for(let i=0; i<  construct.length; i++){
        console.log( construct[i].base_stat)
        const li = document.createElement("li");
        li.innerHTML =`${construct[i].stat.name} : base ${construct[i].base_stat}`;
        console.log(li);
        document.getElementById("stats").appendChild(li);
          }


    const li2 = document.createElement("li");
       li2.innerHTML= data.species.name
       document.getElementById("species").appendChild(li2);
  
       const li3 = document.createElement("li");
       li3.innerHTML= data.weight
       document.getElementById("weight").appendChild(li3);

       construct =data.types
       for(let i=0; i<  construct.length; i++){
        const li = document.createElement("li");
        li.innerHTML =`${construct[i].type.name} `;
        console.log(li);
        document.getElementById("types").appendChild(li);
        }
        


        
        function ImageRender(construct){
            for(let key in construct){
                if (typeof construct[key] ==='object' && construct[key]!== null){
                    ImageRender(construct[key]);
                }else if ( typeof construct[key] === 'string' && construct[key].includes('http')){
                    const img=  document.createElement("img");
                    img.src=construct[key]
                    img.alt=key
                    document.getElementById('imageSpace').appendChild(img);
                    console.log(img)
                }
                
            }
        }
        ImageRender(data.sprites.other)
       

    }catch(error){
        console.error(error);
    }
}
  