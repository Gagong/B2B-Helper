$(document).ready(function () {
  chrome.storage.local.remove([
    "toOpen",
    "dataX",
    "name",
    "policyID"
  ]);
  let api = new Api();
  let variables = new Data();
  api.findProductsOnPage(variables.productID, variables.productName);
  api.getPolicyID();
  let toOpen = [];
  let open = false;
  (function Loop(i) {
    setTimeout(function () {
      if (!open) {
        try {
          chrome.storage.local.get(['toOpen'], function (result) {
            for (const key in result) {
              if (result.hasOwnProperty(key)) {
                if (result[key].length != 0) {
                  result[key].forEach(e => {
                    toOpen.push(e);
                  });
                }
                open = true;
              }
            }
          });
        } catch (e) {
          console.log(e)
        }
      } else if (open && toOpen.length != 0) {
        api.openAll(toOpen);
        toOpen = [];
        open = false;
        chrome.storage.local.set({
          toOpen: "",
        });
      }
      if (--i) Loop(i);
    }, 1000)
  })(9999);
})






