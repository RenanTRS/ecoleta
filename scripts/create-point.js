
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    fetch(url).then((res)=>{return res.json()}).then((states)=>{
        for(const state of states){
            ufSelect.insertAdjacentHTML('beforeend', `<option value="${state.id}">${state.nome}</option>`);
        }
    })
}
populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    
    const ufValue = event.target.value;

    const indexOfSelecteState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelecteState].text; //Para pegar o value e passar na url com o nome do estado.

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    fetch(url).then((res)=>{return res.json()}).then((cities)=>{
        for(city of cities){
            citySelect.insertAdjacentHTML('beforeend', `<option value="${city.id}">${city.nome}</option>`);
        }

        citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);