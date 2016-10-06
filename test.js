var getGeocode = require('.');

getGeocode('балашиха, просп. Ленина, 1', function(err, res){
    if(err) console.log(err);
    else console.log(JSON.stringify(res, null, 4));
});

/*
{
    "pos": {
        "type": "Point",
        "coordinates": [
            37.928201,
            55.798318
        ]
    },
    "boundedBy": {
        "type": "MultiPoint",
        "coordinates": [
            [
                37.924096,
                55.796005
            ],
            [
                37.932306,
                55.80063
            ]
        ]
    },
    "kind": "house",
    "precision": "exact",
    "address": "Московская область, Балашиха, проспект Ленина, 1",
    "area": "Московская область",
    "region": "городской округ Балашиха",
    "city": "Балашиха",
    "street": "проспект Ленина",
    "bldNum": "1"
}
*/