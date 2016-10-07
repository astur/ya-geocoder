var needle = require('needle');

module.exports = function(address, options, callback){
    var URL = 'https://geocode-maps.yandex.ru/1.x/?geocode=%s&kind=house&format=json&results=1'.replace('%s', encodeURIComponent(address));
    var httpOpts = {};
    if(options.tail){
        URL = URL + options.tail;
    }
    needle.get(URL, httpOpts, function(err, res){
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

        var _ = res.body.response.GeoObjectCollection.featureMember[0].GeoObject;

        bld.pos = {
            type: 'Point',
            coordinates: _.Point.pos.split(' ').map(v=>+v),
        };

        bld.boundedBy = {
            type: 'MultiPoint',
            coordinates: [
                _.boundedBy.Envelope.lowerCorner.split(' ').map(v=>+v),
                _.boundedBy.Envelope.upperCorner.split(' ').map(v=>+v),
            ],
        }

        _ = _.metaDataProperty.GeocoderMetaData;

        bld.kind = _.kind;
        bld.precision = _.precision;

        _ = _.AddressDetails.Country;

        bld.address = _.AddressLine;

        if(_.hasOwnProperty('AdministrativeArea')){
            _ = _.AdministrativeArea;
            bld.area = _.AdministrativeAreaName;
        }

        if(_.hasOwnProperty('SubAdministrativeArea')){
            _ = _.SubAdministrativeArea;
            bld.region = _.SubAdministrativeAreaName;
        }

        if(_.hasOwnProperty('Locality')){
            _ = _.Locality;
            bld.city = _.LocalityName;
        }

        if(_.hasOwnProperty('Thoroughfare')){
            _ = _.Thoroughfare;
            bld.street = _.ThoroughfareName;
        }

        if(_.hasOwnProperty('Premise')){
            _ = _.Premise;
            bld.bldNum = _.PremiseNumber;
        }

        callback(null, bld);
    });
}