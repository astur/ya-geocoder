var needle = require('needle');

module.exports = function(address, callback){
    var URL = 'https://geocode-maps.yandex.ru/1.x/?geocode=%s&kind=house&format=json&results=1'.replace('%s', encodeURIComponent(address));
    needle.get(URL, function(err, res){
        if(err || res.body.error){
            return callback(err || res.body.error.message);
        }
        if(
            !res.body.response ||
            !res.body.response.GeoObjectCollection ||
            !res.body.response.GeoObjectCollection.featureMember ||
            !res.body.response.GeoObjectCollection.featureMember[0] ||
            !res.body.response.GeoObjectCollection.featureMember[0].GeoObject
        ){
            return callback('Bad response');
        }

        var bld = {};

        callback(null, bld);
    });
}