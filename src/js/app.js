import locations from "./store/locations";
import "../css/style.css";
import "./plugins";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";



document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;
  //Events
  form.addEventListener("submit", (e) =>{
   e.preventDefault();
   onFormSubmit()
  })

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit(){
   const origin = locations.getCityCodeByKey(formUI.originValue);
   const destination = locations.getCityCodeByKey(formUI.destinationValue);
   const depart_date = formUI.departDateValue;
   const return_date = formUI.returnDateValue;
   const currency = currencyUI.currencyValue;

  await locations.fetchTickets({
    origin,
    destination,
    depart_date,
    return_date,
    currency,
   });

  ticketsUI.renderTickets(locations.lastSearch);
  }
});


