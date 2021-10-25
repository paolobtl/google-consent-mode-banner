window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

/* Accetta-Rifiuta button clicks */
function accettaTutto() {
    window.dataLayer.push({
        'event': 'update_consent_granted',
    });
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
    });
};

function rifiutaTutto() {
    window.dataLayer.push({
        'event': 'update_consent_denied',
    });
    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });
};

var choice = updateChoice();

function updateChoice() {
    var choice = localStorage.getItem('option')
    if (choice === 'analytics') {
        return {'ad_storage' : 'denied', 'analytics_storage' : 'granted'}
    }
    else if (choice === 'ads') {
        return {'ad_storage' : 'granted', 'analytics_storage' : 'denied'}
    }
    else {
        return {'ad_storage' : 'denied', 'analytics_storage' : 'denied'}
    }
}


function accettaSelezione(){
    window.dataLayer.push({
        'event': 'consent_updated',
    });
    gtag('consent', 'update', {
        choice,
    });
}

/* Read checkbox value*/
var banner = document.getElementById("containerbox");
if (localStorage.getItem('option') === null){
    banner.setAttribute('style', 'display:block')
}
else {
    banner.setAttribute('style', 'display:none')
}
var selection;
var checkboxes = document.querySelectorAll("#containerbox input[type=checkbox]");
checkboxes.forEach(function(el) {
    el.addEventListener('click', function(event) {
        selection = event.target.value;
        return selection;
    })
})


/* Nascondi-mostra banner */
function showIt() {
    document.getElementById("containerbox").style.display = "block";
}

function hideIt() {
    document.getElementById("containerbox").style.opacity = "0";
    localStorage.setItem("option", selection)
}
