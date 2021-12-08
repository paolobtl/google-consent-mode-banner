var consentAnalytics = 0, consentAds = 0;

function consentUpdate(){
    gtag('consent','update',{
        ad_storage: consentAds === 0 ? 'denied' : 'granted',
        analytics_storage: consentAnalytics === 0 ? 'denied' : 'granted'
    })
}
/*consentUpdate(consentAds, consentAnalytics);*/


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


/* Consent update, based on buttons selection */
function accettaTutto() {
    window.dataLayer.push({
        event: 'update_consent_granted'
    });
    localStorage.setItem('selezione', 'granted');
    consentAnalytics = 1;
    consentAds = 1;
}

function rifiutaTutto() {
    window.dataLayer.push({
        event: 'update_consent_denied'
    });
    localStorage.setItem('selezione', 'denied');
    consentAnalytics = 0;
    consentAds = 0;
}

var pulsanteSelezione = document.querySelectorAll('.selezionati');
pulsanteSelezione.forEach(function(el) {
    el.addEventListener('click', function(event) {
        localStorage.setItem('selezione', selection);
        if (selection === 'analytics') {
            consentAnalytics = 1;
        } else if (selection === 'ads') {
            consentAds = 1;
        } else {
            rifiutaTutto();
        }
    });
});


/* Set update command based on previous selection */
var selezione = localStorage.getItem('selezione');
switch (selezione) {
    case 'granted':
        consentAnalytics = 1,
        consentAds = 1;
        break;
    case 'denied':
        consentAnalytics = 0,
        consentAds = 0;
        break;
    case 'analytics':
            consentAnalytics = 1;
        break;
    case 'ads':
            consentAds = 1;
        break;
    default:
        
}
