/**
 * Created by josephthomaschaske on 4/11/16.
 */
/**
 * Created by josephthomaschaske on 4/11/16.
 */
var appId = '19963f1ec0dfddaf853ee60c1a2836fc';
var baseUrl = 'https://api.worldoftanks.com/wot/';

function getPlayers(search){
    var request = baseUrl;
    request += 'account/list/?application_id=' + appId;
    request += '&search=' + search;
    return httpCallout(request);
}

function getPlayerPersonalData(accountId){
    var request = baseUrl;
    request += 'account/info/?application_id=' + appId;
    request += '&account_id=' + accountId;
    return httpCallout(request);
}

function getPlayerVehicles(accountId){
    var request = baseUrl;
    request += 'account/tanks/?application_id=' + appId;
    request += '&account_id=' + accountId;
    return httpCallout(request);
}

function getPlayerAchievements(accountId){
    var request = baseUrl;
    request += 'account/achievements/?application_id=' + appId;
    request += '&account_id=' + accountId;
    return httpCallout(request);
}

function getPlayerRatings(type, accountId){
    var request = baseUrl;
    request += 'ratings/accounts/?application_id=' + appId;
    request += '&account_id=' + accountId;
    request += '&type=' + type;
    return httpCallout(request);
}

function getVehicleStatistics(accountId, tankId){
    var request = baseUrl;
    request += 'tanks/stats/?application_id=' + appId;
    request += '&account_id=' + accountId;
    if(tankId && tankId.length > 0){
        request += '&tank_id=' + tankId;
    }
    return httpCallout(request);
}

function getVehicleAchievements(accountId, tankId){
    var request = baseUrl;
    request += 'tanks/achievements/?application_id=' + appId;
    request += '&account_id=' + accountId;
    if(tankId && tankId.length > 0){
        request += '&tank_id=' + tankId;
    }
    return httpCallout(request);
}

function httpCallout(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}