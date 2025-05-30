//callApi
export const BASEURL = "http://13.60.183.226:8080/foodie/";
export function callApi(reqmethod, url, data, responseHandler)
{
    let option = "";
    if(reqmethod === "GET" || reqmethod === "DELETE")
        option = {method: reqmethod, headers:{'Content-Type':'application/json'}};
    else    
        option = {method: reqmethod, headers:{'Content-Type':'application/json'}, body: data};
    fetch(url, option)
        .then(response => {
            if(!response.ok)
                throw new Error(response.status + ": " + response.statusText);
            return response.text();
        })
        .then(responsedata => responseHandler(responsedata))
        .catch(error => alert(error));
}
export function setSession(sesname, sesvalue, expday)
{
    let D = new Date();
    D.setTime(D.getTime() + expday * 86400000);
    document.cookie = `${sesname}=${sesvalue};expires=${D.toUTCString()};path=/`;
}

export function getSession(sesname)
{
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieData = decodedCookie.split(';');
    for(let x in cookieData)
        if(cookieData[x].includes(sesname))
            return cookieData[x].substring(cookieData[x].indexOf(sesname) + sesname.length + 1);
    return "";  
}
