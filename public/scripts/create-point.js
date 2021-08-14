
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
    
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    citySelect.disabled = true;
    fetch(url).then((res)=>{return res.json()}).then((cities)=>{
        for(city of cities){
            citySelect.insertAdjacentHTML('beforeend', `<option value="${city.nome}">${city.nome}</option>`);
        }

        citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itensToSelect = document.querySelectorAll('.itens-grid li');
for (const item of itensToSelect){
    item.addEventListener('click', handleSelectedItem);
}

const collectedItens = document.querySelector('input[name=itens');

let selectedItens = [];
function handleSelectedItem(event){
    const itemLi = event.target;
    itemLi.classList.toggle('selected');
    const itemId = itemLi.dataset.id;

    //Verificar se tem itens selecionados, se sim
    //Pegar os itens selecionados
    
    const allreadySelected = selectedItens.findIndex((item)=>{
        const itemFound = item == itemId;
        
        return itemFound;
    });
    //Se já estiver selecionado.
    if(allreadySelected >= 0){
        // tirar da seleção
        const filteredItens = selectedItens.filter((item)=>{
            const itemIsDifferent = item != itemId;

            return itemIsDifferent;
        });

        selectedItens = filteredItens;
    } else {
        //Se não estiver selecionado, adicionar à seleção
        selectedItens.push(itemId);
    }
    //Atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens;
}