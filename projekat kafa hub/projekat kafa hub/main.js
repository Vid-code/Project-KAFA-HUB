//          KAFAHUB - Bolje nego sendvici... 


const fetchNearByShop = ({longi, lat}) => {
    console.log(`Lociramo kafic na sledecoj lokaciji (${longi} ${lat})`)
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const response = {
                shopId: "s-123",
            };
            resolve(response.shopId)
        }, 1000);
    })
}

const fetchAvailableKafas = ({shopId}) => {
    console.log(`Dobijanje liste napitaka u kaficu ${shopId}...`);
    return new Promise ((resolve, reject) => {
        setTimeout(function () {
            const response = {
                kafe: [
                    {
                        type: "sa mlekom",
                        name: "domaca",
                        id: "pv-123",
                    },
                    {
                        type: "bez mleka",
                        name: "espresso",
                        id: "pnv-124",
                    },
                ],
            };
            resolve(response);
        }, 1000);
    })
}

let getMyKafa = (result, type, name) => {
    let kafe = result.kafe; 
    console.log("Dobili smo listu kafa", kafe);
    let myKafa = kafe.find((kafa) => {
        return (kafa.type === type && kafa.name === name);
    });
    return new Promise((resolve, reject) => {
        if (myKafa) {
            console.log(`✓ Nasao kafu koja se potrazuje ${myKafa.name}!`);
            resolve(myKafa);
        } else {
            reject(
                new Error(
                    `X Zao mi je, nemamo ${type} ${name} tu kafu. Da li hocete nesto drugo?`
                )
            );
        }
    });
};

const fetchBevereges = ({kafaId}) => {
    console.log(`Uzimamo osvezenje uz kafu ${kafaId}...`);
    return new Promise ((resolve, reject) => {
        setTimeout(function () {
            const response = {
                id: "b-10",
                name: "cola",
            };
            resolve(response)
        },1000)
    })
}


let create = (endpoint, payload) => {
    if (endpoint.includes(`/api/kafahub/order`)) {
        console.log("Postavljanje porudzbenice za kafu...", payload);
        const {type, name, beverage} = payload;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve({
                    success: true,
                    message: `${type} ${name} kafa nalog sa ${beverage} je postavljena uspesno.`
                })
            }, 1000)
})
    }
}


function fetch (endpoint, payload) {
    if (endpoint.includes("/api/kafahub/shop")) {
        return fetchNearByShop(payload)
    } else if (endpoint.includes("/api/kafahub/kafa")) {
        return fetchAvailableKafas(payload)
    } else if (endpoint.includes("/api/kafahub/beverages")) {
        return fetchBevereges(payload)
    }
}

function OrderKafa(type, name) {
    fetch("/api/kafahub/shop", {'longi': 38.8951, 'lat': -77.0364})
    .then((shopId) => fetch("/api/kafahub/kafa", {'shopId': shopId}))
    .then((allKafas) => getMyKafa(allKafas, type, name))
    .then((kafa) => fetch("/api/kafahub/beverages", {'kafaId': kafa.id}))
    .then((beverage) =>
        create("/api/kafahub/order", {
            beverage: beverage.name,
            name: name,
            type: type,
        })
    )
    .then((result) => console.log(result.message))
    .catch(function (error) {
        console.error(`${error.message}`);
    })
}

OrderKafa("sa mlekom", "domaca")

// OrderKafa("sa mlekom", "domaca.")