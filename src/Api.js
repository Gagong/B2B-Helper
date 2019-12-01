class Api {
    constructor() {
        this.productsOnPage = [];
        this.productsOnPageNames = [];
    }

    eventFire(el, etype) {
        if (el == null) return;
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        }
        else {
            let evObj = document.createEvent('MouseEvents');
            evObj.initEvent(etype, true, false);
        }
    };

    findFirstDescendant(parent, tagname) {
        parent = document.getElementById(parent);
        if (parent == null) return;
        let descendants = parent.getElementsByTagName(tagname);
        if (descendants == null) return;
        if (descendants.length)
            return descendants[0];
        return null;
    }

    getPolicyID() {
        let x = window.location.href;
        if (x.includes("b2b.zettains.ru")) {
            x = x.split("PolicyID=")[1];
            x = x.split("&")[0];
            console.log(x)
            chrome.storage.local.set({
                policyID: x,
            });
        }
    }

    openAll(array) {
        array.forEach(function (item, i, arr) {
            try {
                this.eventFire(this.findFirstDescendant(item, "span"), 'click')
            } catch (e) {
                console.log(e);
            }
        });
    }

    findProductsOnPage(a1, a2) {
        for (let index = 0; index < a1.length; index++) {
            if (this.findFirstDescendant(a1[index], "span") != null) {
                this.productsOnPage.push(a1[index]);
                this.productsOnPageNames.push(a2[index]);
            }
        }
        chrome.storage.local.set({
            dataX: this.productsOnPage,
            name: this.productsOnPageNames
        });
    }
}
