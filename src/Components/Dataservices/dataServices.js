const baseURL = "https://localhost:7096/";


export const dataServices = {

    ClientLogin,
    VerifyPAN,
    GetLedger,
    GetAllStocks,
    GetBrand, 
    BranchandStockDetails,
    
    CancelTicket,
    UpdateSeatStatus ,
    AddBusDetails,
    DeleteBusDetails,
    UpdateBusDetails
}

let token = localStorage.getItem('token')

function ClientLogin(reqbody) {
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(baseURL + `api/ClientDetails/ClientLogin`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function VerifyPAN(pan) {
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
             "Authorization": `Bearer  ${token}` 
        }
    };
    return fetch(baseURL + `api/ClientDetails/VerifyPAN?PAN_Number=${pan}`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}


function GetLedger() {
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "Authorization": `Bearer  ${token}` 
        },
      
    };
    return fetch(baseURL + `api/Ledger/GetLedger`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function GetAllStocks () {
 
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "Authorization": `Bearer  ${token}` 
        }
    };
    return fetch(baseURL + `GetAllStocks`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}


function GetBrand() {
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "Authorization": `Bearer  ${token}` 
        },
     
    };
    return fetch(baseURL + `api/Ledger/GetBrand`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function BranchandStockDetails(brandcode) {

    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "Authorization": `Bearer  ${token}` 
        },
       
    };
    return fetch(baseURL + `api/Ledger/BranchandStockDetails?BranchCode=${brandcode}`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function CancelTicket(reqbody) {
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(baseURL + `/api/BusBooking/CancelTicket`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function UpdateSeatStatus (reqbody) {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(baseURL + `/api/BusBooking/UpdateSeatStatus`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

function AddBusDetails(reqbody) {
   
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(baseURL + `/api/Admin/AddBusDetails`, requestOptions).
        then(res => res.json()).then(result => { debugger; return result; });
}

function DeleteBusDetails(bus) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
       
    };
    return fetch(baseURL + `api/Admin/DeleteBusDetails?BusName=${bus}`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}



function UpdateBusDetails(reqbody) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        body: JSON.stringify(reqbody)
    };
    return fetch(baseURL + `/api/Admin/UpdateBusDetails`, requestOptions).
        then(res => res.json()).then(result => { return result; });
}

