/* Read checkbox value and write it in localStorage */
var selection;
var radios = document.querySelectorAll('#containerbox input[type=radio]');
radios.forEach(function(el) {
    el.addEventListener('click', function(event) {
        selection = event.target.value;
        return selection;
    });
});

/* Banner showing/not showing if localStorage is not/empty */
var banner = document.getElementById('containerbox');
if (localStorage.getItem('option') === null) {
    banner.setAttribute('style', 'display:block');
} else {
    banner.setAttribute('style', 'display:none');
}

/* Hide-show banner */
function showIt() {
    document.getElementById('containerbox').style.display = 'block';
}

function hideIt() {
    document.getElementById('containerbox').style.opacity = '0';
    localStorage.setItem('option', selection);
}


/* Consent Default */
function consentDefault() {
    gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied'
    });
}

/* Set update command based on previous selection */
var selezione = localStorage.getItem('selezione');
switch (selezione) {
    case 'granted':
        accettaTutto();
        break;
    case 'denied':
        rifiutaTutto();
        break;
    case 'analytics':
        gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'granted'
        });
        break;
    case 'ads':
        gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'denied'
        });
        break;
    default:
        consentDefault();
}
/* Consent update, based on buttons selection */
function accettaTutto() {
    window.dataLayer.push({
        event: 'update_consent_granted'
    });
    localStorage.setItem('selezione', 'granted');
    gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted'
    });
}

function rifiutaTutto() {
    window.dataLayer.push({
        event: 'update_consent_denied'
    });
    localStorage.setItem('selezione', 'denied');
    gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied'
    });
}

var pulsanteSelezione = document.querySelectorAll('.selezionati');
pulsanteSelezione.forEach(function(el) {
    el.addEventListener('click', function(event) {
        localStorage.setItem('selezione', selection);
        if (selection === 'analytics') {
            gtag('consent', 'update', {
                ad_storage: 'denied',
                analytics_storage: 'granted'
            });
        } else if (selection === 'ads') {
            gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'denied'
            });
        } else {
            rifiutaTutto();
        }
    });
});

/* Clear LocalStorage and reload the page */
function clear(){
    localStorage.clear();
    window.location.reload(true);
}
