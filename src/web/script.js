/* 
TO DO:
* Add product selector opening
* Fix open properties bug in product settings
* Add Admin\B2B checker
* Add Cansel Policy function
* Add option functions usage
*/

let products = [];
let names = [];

$(document).ready(function () {
    document.getElementById("copytext").value = "";
    console.log("Loaded!");
        chrome.storage.local.get(['dataX'], function (result) {
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                result[key].forEach(e => {
                    products.push(e);
                }); 
            }
        }
    });
    chrome.storage.local.get(['name'], function (result) {
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                result[key].forEach(e => {
                    names.push(e);
                });
            }
        }
        if (products.length && names.length)
            createList(products, names);
    });

    let copytext = document.getElementById("copytext");
    chrome.storage.local.get(['policyID'], function (result) {
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                copytext.value = result[key];
                console.log(result[key])
            }
        }
    });

    let copy = document.getElementById("copy");
    copy.onclick = function () {
        let policyID = document.getElementById("copytext").value;
        navigator.clipboard.writeText(policyID);
    }

    let open = document.getElementById("open");
    open.onclick = function () {
        let IDtoOpen = (function () {
            let id = [];
            $('input.custom-control-input[type=checkbox]').each(function () {
                if (this.checked) {
                    id.push(this.id);
                }  
            });
            return id;
        })();
        chrome.storage.local.set({
            toOpen: IDtoOpen,
        });
    }
    
})

function addCheckBox(id, name, label) {
    let element = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="' + id + '" name="' + name + '">' + '<label class="custom-control-label" for="' + id + '">' + label + '</label></div>';
    $("#checkBoxes").append(element);
}

function createList(a1, a2) {
    for (let index = 0; index < a1.length; index++) {
        addCheckBox(a1[index], a1[index], a2[index])
    }
}

$('#collapse').on('hidden.bs.collapse', function () {
    $('#open1').removeClass("disabled");
})

$('#collapse').on('show.bs.collapse', function () {
    $('#open1').addClass("disabled");
})