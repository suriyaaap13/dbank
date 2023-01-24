import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function(){
    const currentAmount = await dbank_backend.checkBalance();
    
    document.getElementById("value").innerText = Math.floor(currentAmount*100)/100;
});


document.querySelector('form').addEventListener('submit', async function(event){
    event.preventDefault();

    const btn = event.target.querySelector('#submit-btn');
    btn.setAttribute('disabled', true);

    // console.log("Hello the submit-btn is pressed!!");
    const inputAmount = parseFloat(document.getElementById('input-amount').value);
    const outputAmount = parseFloat(document.getElementById('withdrawal-amount').value);


    
    if(document.getElementById('input-amount').value.length!=0)
        await dbank_backend.topUp(inputAmount);
    if(document.getElementById('withdrawal-amount').value.length!=0)
        await dbank_backend.withDarw(outputAmount);

    await dbank_backend.compound();

    const currentAmount = await dbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.floor(currentAmount*100)/100;

    document.getElementById('input-amount').value = "";
    document.getElementById('withdrawal-amount').value = "";

    btn.removeAttribute('disabled');

});