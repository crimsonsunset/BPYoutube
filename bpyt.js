//$.getScript("jquery.ddslick.min.js", function () {
//
//    console.log("Script loaded and executed.");
//
//    bpyt.init();
//
//
//    // Here you can use anything you defined in the loaded script
//});
var lastInput = "";
var First1 = "";
var Display1 = "";
var currField = "";
var inputObj = {}

var defaultImgPath = "img/bpicon.png"
var bpyt = (function () {
    var bpyt = {}
    bpyt.HW = {
        "real": [
            1.15,
            2.22,
            3.20,
            4.11,
            4.95,
            5.72,
            6.43,
            7.09,
            7.70,
            8.26,
            8.78,
            9.26,
            9.70,
            10.11,
            10.48,
            10.83,
            11.15,
            11.45,
            11.72,
            11.97,
            12.20,
            12.42,
            12.62,
            12.80,
            12.97,
            13.13,
            13.27,
            13.40,
            13.53,
            13.64,
            13.74,
            13.84,
            13.93,
            14.01,
            14.09,
            14.16,
            14.22,
            14.28,
            14.34,
            14.39,
            14.44,
            14.48,
            14.52,
            14.56,
            14.59,
            14.62,
            14.65,
            14.68,
            14.70,
            14.73
        ],
        "nominal": [
            0.79,
            1.57,
            2.33,
            3.08,
            3.81,
            4.52,
            5.23,
            5.91,
            6.59,
            7.25,
            7.90,
            8.53,
            9.16,
            9.77,
            10.37,
            10.95,
            11.53,
            12.09,
            12.65,
            13.19,
            13.72,
            14.24,
            14.75,
            15.25,
            15.74,
            16.22,
            16.69,
            17.15,
            17.60,
            18.05,
            18.48,
            18.91,
            19.33,
            19.74,
            20.14,
            20.53,
            20.92,
            21.29,
            21.66,
            22.03,
            22.38,
            22.73,
            23.07,
            23.41,
            23.74,
            24.06,
            24.37,
            24.68,
            24.99,
            25.28
        ]
    };
    bpyt.genreDD = []
    bpyt.genreObj = {
        "drum and bass": 1,
        "hardcore": 2,
        "electronica": 3,
        "house": 5,
        "techno": 6,
        "trance": 7,
        "hard dance": 8,
        "breaks": 9,
        "chill out": 10,
        "tech house": 11,
        "deep house": 12,
        "psy-trance": 13,
        "minimal": 14,
        "progressive house": 15,
        "dj tools": 16,
        "electro-house": 17,
        "dubstep": 18,
        "funk-r and b": 40,
        "glitch hop": 49,
        "indie dance-nu disco": 37,
        "pop-rock": 39,
        "reggae-dub": 41
    }
    bpyt.ddData = [
        {
            text: "Facebook",
            value: 1,
            selected: false,
            imageSrc: "img/bpicon.png"
        },
        {
            text: "Twitter",
            value: 2,
            selected: false,
            description: "Description with Twitter",
            imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"
        },
        {
            text: "LinkedIn",
            value: 3,
            selected: false,
            description: "Description with LinkedIn",
            imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"
        },
        {
            text: "Foursquare",
            value: 4,
            selected: false,
            description: "Description with Foursquare",
            imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
        }
    ];

    function init() {

        var currGen
        for (var i in genreObj) {
            currGen = {
                "text": i,
                selected: false,
                "value": genreObj[i],
                "imageSrc": defaultImgPath,
                description: ""
            }
            bpyt.genreDD.push(currGen)
        }
        console.log(JSON.stringify(bpyt.genreDD))
        $('#genreSelect').ddslick({
            data: bpyt.genreDD,
            width: 300,
            selectText: "Select a Genre",
            imagePosition: "right",
            onSelected: function (item) {
                console.log(item.selectedData)
                //                var currInd = item.selectedData.value
                bpyt.selectedGenre = item.selectedData.text
                bpyt.selectedIndex = item.selectedData.value
                bpyt.getBPPL();
            }
        });


    }

    //    init();
    //    calcInitInputs();

    function calcInitInputs() {

        bpyt.mAssetsWeight = bpyt.mAssets / (bpyt.mAssets + bpyt.gAssets);
        bpyt.gAssetsWeight = 1 - bpyt.mAssetsWeight;
        bpyt.fundingLevel = (bpyt.mAssets + bpyt.gAssets) / bpyt.econLiab

        console.log(bpyt.rateShock + " :: " + bpyt.econLiabDur + " :: " + bpyt.mAssetsWeight)
        bpyt.mAssetsDur = Math.max(5, (bpyt.hedgeRatio / 100 * bpyt.econLiabDur / (bpyt.mAssetsWeight)))
        bpyt.correlations['growth'] = [bpyt.correlations['liab'][2], bpyt.correlations['matching'][2], 1]

        console.log("--------------------calcInitInputs-----------------------")
        bpyt.outputStr += "--------------------calcInitInputs-----------------------" + "\r\n"
        console.log("bpyt.mAssetsWeight: " + bpyt.mAssetsWeight)
        bpyt.outputStr += "bpyt.mAssetsWeight: " + bpyt.mAssetsWeight + "\r\n"
        console.log("bpyt.gAssetsWeight" + bpyt.gAssetsWeight)
        bpyt.outputStr += "bpyt.mAssetsWeight: " + bpyt.mAssetsWeight + "\r\n"
        console.log("bpyt.fundingLevel" + bpyt.fundingLevel)
        bpyt.outputStr += "bpyt.fundingLevel: " + bpyt.fundingLevel + "\r\n"
        console.log("bpyt.mAssetsDur: " + bpyt.mAssetsDur)
        bpyt.outputStr += "bpyt.mAssetsDur: " + bpyt.mAssetsDur + "\r\n"
        console.log("bpyt.correlations: " + JSON.stringify(bpyt.correlations))
        bpyt.outputStr += "bpyt.correlations: " + JSON.stringify(bpyt.correlations) + "\r\n"
        console.log("--------------------END calcInitInputs-----------------------")
        bpyt.outputStr += "--------------------END calcInitInputs-----------------------" + "\r\n"


        //        alert(bpyt.correlations['growth'])

        //        "growth": [bpyt.correlations['liab'][2], bpyt.correlations['matching'][2], 1]
        //        alert('zzz')

    }

    bpyt.init = function () {
        init();
    }
    bpyt.waitForAss = function () {
        init();
        //        alert('ss')
//        bpyt.getAssumptions();

    }

    bpyt.getBPPL = function () {
        $.get("http://api.beatport.com/catalog/most-popular/genre?id=" + bpyt.selectedIndex + "&perPage=10", function (data) {
            $(".result").html(data);
            console.log(JSON.stringify(data));
            bpyt.fullBPList = data.results
            //            bpyt.sanitizeNSearch();
        });

    }
//    bpyt.sanitizeNSearch = function () {
//
//        for (var i = 0; i < bpyt.fullBPList.length; i++) {
//
//
//            $.get("https://gdata.youtube.com/feeds/api/videos?q=cat&orderby=relevance&max-results=10&v=2&alt=json" + bpyt.selectedIndex + "&perPage=10", function (data) {
//                $(".result").html(data);
//                console.log(JSON.stringify(data));
//
//            });
//
//
//        }
//
//
//    }


    var s = {
        "metadata": {
            "host": "api.beatport.com",
            "path": "/catalog/most-popular/genre",
            "query": "id=6&perPage=100",
            "page": 1,
            "perPage": 100,
            "count": 100,
            "totalPages": 1,
            "perPageOptions": [
                {
                    "value": 50,
                    "applyQuery": "id=6&perPage=50"
                },
                {
                    "value": 100,
                    "applyQuery": "id=6&perPage=100"
                },
                {
                    "value": 150,
                    "applyQuery": "id=6&perPage=150"
                }
            ],
            "facets": {
                "fields": [

                ]
            },
            "spellcheck": {
                "suggestions": [

                ]
            },
            "date": "2013-11-15"
        },
        "results": [
            {
                "id": 4751418,
                "selected": false,
                "type": "track",
                "name": "Chocolate",
                "mixName": "Original Mix",
                "title": "Chocolate (Original Mix)",
                "slug": "chocolate-original-mix",
                "isrc": "GBUR61200105",
                "releaseDate": "2013-10-14",
                "publishDate": "2013-10-14",
                "sampleUrl": "http://geo-samples.beatport.com/lofi/4751418.LOFI.mp3",
                "rtmpStreamUrl": "rtmp://geo-rtmp-samples.beatport.com/beatport/_definst_/mp3:lofi_samples/items/volumes/volume7/items/4000000/700000/50000/1000/400/10/4751418.LOFI",
                "exclusive": false,
                "price": {
                    "usd": 199,
                    "eur": 156,
                    "gbp": 130
                },
                "audioFormatFee": {
                    "wav": {
                        "usd": 75,
                        "eur": 75,
                        "gbp": 75
                    },
                    "aiff": {
                        "usd": 75,
                        "gbp": 75,
                        "eur": 75
                    }
                },
                "currentStatus": "New Release",
                "length": "6:53",
                "bpm": 126,
                "key": {
                    "standard": {
                        "letter": "A",
                        "sharp": false,
                        "flat": false,
                        "chord": "minor"
                    }
                },
                "saleType": "purchase",
                "availableWorldwide": true,
                "artists": [
                    {
                        "id": 8637,
                        "name": "Sam Paganini",
                        "slug": "sam-paganini",
                        "type": "artist"
                    }
                ],
                "genres": [
                    {
                        "id": 6,
                        "name": "Techno",
                        "slug": "techno",
                        "type": "genre"
                    }
                ],
                "subGenres": [

                ],
                "charts": [
                    {
                        "id": 222367,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 222584,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 222618,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 220158,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 222718,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 222735,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 222764,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 222795,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 222814,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 222872,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 223105,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 223137,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 223144,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 223257,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 223289,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 223415,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 223673,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 223879,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 228561,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 224007,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 224125,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 224219,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 224268,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 224299,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 224395,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 224603,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 224620,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 224709,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 224729,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 225293,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 225418,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 225486,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 225564,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 225307,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 220559,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 225642,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 225777,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 225835,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 225881,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 225902,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 225937,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226188,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226234,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 226233,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226298,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226418,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 226426,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 226512,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 226517,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 226586,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 226220,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 226693,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 226745,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 226794,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226815,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 226836,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 226976,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 227001,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227043,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 227114,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 227136,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227153,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 227217,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 227288,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227295,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 227342,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 227508,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 227414,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 227431,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 227477,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227555,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 227666,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 227682,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 227788,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 227888,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 227938,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 228097,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 228173,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 228339,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 228576,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 228615,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 228758,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 228989,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 229050,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229079,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229086,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 229122,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 229213,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 229220,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 229312,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229510,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 229540,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 222450,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229635,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 229988,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230084,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 230093,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 230175,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 230290,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230382,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230446,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 230704,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230709,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 230828,
                        "position": 8,
                        "type": "chart"
                    }
                ],
                "release": {
                    "id": 1165428,
                    "name": "Black Leather EP",
                    "slug": "black-leather-ep"
                },
                "label": {
                    "id": 2027,
                    "name": "Drumcode",
                    "slug": "drumcode"
                },
                "images": {
                    "small": {
                        "width": 30,
                        "height": 30,
                        "url": "http://geo-media.beatport.com/image/8206814.jpg",
                        "secureUrl": "https://media.beatport.com/image/8206814.jpg"
                    },
                    "medium": {
                        "width": 60,
                        "height": 60,
                        "url": "http://geo-media.beatport.com/image/8206815.jpg",
                        "secureUrl": "https://media.beatport.com/image/8206815.jpg"
                    },
                    "large": {
                        "width": 500,
                        "height": 500,
                        "url": "http://geo-media.beatport.com/image/8206816.jpg",
                        "secureUrl": "https://media.beatport.com/image/8206816.jpg"
                    },
                    "waveform": {
                        "width": 1500,
                        "height": 250,
                        "url": "http://geo-media.beatport.com/image/8206820.png",
                        "secureUrl": "https://media.beatport.com/image/8206820.png"
                    }
                },
                "position": 1
            },
            {
                "id": 4786362,
                "selected": false,
                "type": "track",
                "name": "Lost",
                "mixName": "Original mix",
                "title": "Lost (Original mix)",
                "slug": "lost-original-mix",
                "isrc": "GBUR61200108",
                "releaseDate": "2013-10-28",
                "publishDate": "2013-10-28",
                "sampleUrl": "http://geo-samples.beatport.com/lofi/4786362.LOFI.mp3",
                "rtmpStreamUrl": "rtmp://geo-rtmp-samples.beatport.com/beatport/_definst_/mp3:lofi_samples/items/volumes/volume7/items/4000000/700000/80000/6000/300/60/4786362.LOFI",
                "exclusive": false,
                "price": {
                    "usd": 199,
                    "eur": 156,
                    "gbp": 130
                },
                "audioFormatFee": {
                    "wav": {
                        "usd": 75,
                        "eur": 75,
                        "gbp": 75
                    },
                    "aiff": {
                        "usd": 75,
                        "gbp": 75,
                        "eur": 75
                    }
                },
                "currentStatus": "New Release",
                "length": "7:51",
                "bpm": 123,
                "key": {
                    "standard": {
                        "letter": "C",
                        "sharp": false,
                        "flat": false,
                        "chord": "minor"
                    }
                },
                "saleType": "purchase",
                "availableWorldwide": true,
                "artists": [
                    {
                        "id": 59266,
                        "name": "Harvey McKay",
                        "slug": "harvey-mckay",
                        "type": "artist"
                    }
                ],
                "genres": [
                    {
                        "id": 6,
                        "name": "Techno",
                        "slug": "techno",
                        "type": "genre"
                    }
                ],
                "subGenres": [

                ],
                "charts": [
                    {
                        "id": 222450,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 226260,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 226436,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226586,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 226745,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 226883,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 226956,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 227114,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 227295,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 227468,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 227481,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227531,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 227602,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 227641,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 227657,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 227788,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 227905,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 227915,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 227918,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 228001,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 228012,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 228173,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 228340,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 228371,
                        "position": 6,
                        "type": "chart"
                    },
                    {
                        "id": 228697,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 228728,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 228879,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 228917,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 228989,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 229005,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 229044,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229122,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 229369,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 229376,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 229462,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 229592,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 229602,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 229635,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 229734,
                        "position": 9,
                        "type": "chart"
                    },
                    {
                        "id": 229773,
                        "position": 3,
                        "type": "chart"
                    },
                    {
                        "id": 229817,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 229979,
                        "position": 4,
                        "type": "chart"
                    },
                    {
                        "id": 230019,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230056,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 230055,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 230134,
                        "position": 1,
                        "type": "chart"
                    },
                    {
                        "id": 230180,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 230196,
                        "position": 10,
                        "type": "chart"
                    },
                    {
                        "id": 230420,
                        "position": 5,
                        "type": "chart"
                    },
                    {
                        "id": 230446,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 230457,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 230509,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 230658,
                        "position": 8,
                        "type": "chart"
                    },
                    {
                        "id": 230715,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 230714,
                        "position": 7,
                        "type": "chart"
                    },
                    {
                        "id": 230933,
                        "position": 2,
                        "type": "chart"
                    },
                    {
                        "id": 230934,
                        "position": 1,
                        "type": "chart"
                    }
                ],
                "release": {
                    "id": 1172156,
                    "name": "Lost",
                    "slug": "lost"
                },
                "label": {
                    "id": 2027,
                    "name": "Drumcode",
                    "slug": "drumcode"
                },
                "images": {
                    "small": {
                        "width": 30,
                        "height": 30,
                        "url": "http://geo-media.beatport.com/image/8283989.jpg",
                        "secureUrl": "https://media.beatport.com/image/8283989.jpg"
                    },
                    "medium": {
                        "width": 60,
                        "height": 60,
                        "url": "http://geo-media.beatport.com/image/8283990.jpg",
                        "secureUrl": "https://media.beatport.com/image/8283990.jpg"
                    },
                    "large": {
                        "width": 500,
                        "height": 500,
                        "url": "http://geo-media.beatport.com/image/8283991.jpg",
                        "secureUrl": "https://media.beatport.com/image/8283991.jpg"
                    },
                    "waveform": {
                        "width": 1500,
                        "height": 250,
                        "url": "http://geo-media.beatport.com/image/8284000.png",
                        "secureUrl": "https://media.beatport.com/image/8284000.png"
                    }
                },
                "position": 2
            },
            {
                "id": 4863572,
                "selected": false,
                "type": "track",
                "name": "If&but",
                "mixName": "Original Mix",
                "title": "If&but (Original Mix)",
                "slug": "if-and-but-original-mix",
                "isrc": "ITC381340001",
                "releaseDate": "2013-11-07",
                "publishDate": "2013-11-07",
                "sampleUrl": "http://geo-samples.beatport.com/lofi/4863572.LOFI.mp3",
                "rtmpStreamUrl": "rtmp://geo-rtmp-samples.beatport.com/beatport/_definst_/mp3:lofi_samples/items/volumes/volume7/items/4000000/800000/60000/3000/500/70/4863572.LOFI",
                "exclusive": false,
                "price": {
                    "usd": 199,
                    "eur": 156,
                    "gbp": 130
                },
                "audioFormatFee": {
                    "wav": {
                        "usd": 75,
                        "eur": 75,
                        "gbp": 75
                    },
                    "aiff": {
                        "usd": 75,
                        "gbp": 75,
                        "eur": 75
                    }
                },
                "currentStatus": "New Release",
                "length": "8:07",
                "bpm": 125,
                "key": {
                    "standard": {
                        "letter": "G",
                        "sharp": false,
                        "flat": false,
                        "chord": "major"
                    }
                },
                "saleType": "purchase",
                "availableWorldwide": true,
                "artists": [
                    {
                        "id": 127759,
                        "name": "Ricky Castelli",
                        "slug": "ricky-castelli",
                        "type": "artist"
                    },
                    {
                        "id": 220605,
                        "name": "Mike Dem",
                        "slug": "mike-dem",
                        "type": "artist"
                    }
                ],
                "genres": [
                    {
                        "id": 6,
                        "name": "Techno",
                        "slug": "techno",
                        "type": "genre"
                    }
                ],
                "subGenres": [

                ],
                "charts": [

                ],
                "release": {
                    "id": 1186641,
                    "name": "If&but",
                    "slug": "if-and-but"
                },
                "label": {
                    "id": 23807,
                    "name": "2SONIC Records",
                    "slug": "2sonic-records"
                },
                "images": {
                    "small": {
                        "width": 30,
                        "height": 30,
                        "url": "http://geo-media.beatport.com/image/8438389.jpg",
                        "secureUrl": "https://media.beatport.com/image/8438389.jpg"
                    },
                    "medium": {
                        "width": 60,
                        "height": 60,
                        "url": "http://geo-media.beatport.com/image/8438390.jpg",
                        "secureUrl": "https://media.beatport.com/image/8438390.jpg"
                    },
                    "large": {
                        "width": 500,
                        "height": 500,
                        "url": "http://geo-media.beatport.com/image/8438391.jpg",
                        "secureUrl": "https://media.beatport.com/image/8438391.jpg"
                    },
                    "waveform": {
                        "width": 1500,
                        "height": 250,
                        "url": "http://geo-media.beatport.com/image/8438475.png",
                        "secureUrl": "https://media.beatport.com/image/8438475.png"
                    }
                },
                "position": 3
            }
        ]
    }

    return bpyt;
}());

//bpyt.waitForAss()

function addDec(nStr) {
    return nStr / 100;
    //return nStr
}


//1 = drum and bass
////2 = Hardcore/Hard Techno
//3 = Electronica
//4 = NA
//5 = House
//6 = Techno
//7 = Trance
//8 = Hard-Dance
//9 = Breaks
//10 = Chill Out
//11 = Tech House
//12 = Deep House
//13 = Psy-Trance
//14 = Minimal
//15 = Progressive House
//16 = DJ Tools
//17 = Electro-House
//18 = Dubstep
//19 = NA
//20 = NA
//21 =
//22 =
//23 =
//24 =
//25 =

var genreObj = {
    "drum and bass": 1,
    "hardcore": 2,
    "electronica": 3,
    "house": 5,
    "techno": 6,
    "trance": 7,
    "hard dance": 8,
    "breaks": 9,
    "chill out": 10,
    "tech house": 11,
    "deep house": 12,
    "psy-trance": 13,
    "minimal": 14,
    "progressive house": 15,
    "dj tools": 16,
    "electro-house": 17,
    "dubstep": 18,
    "funk-r and b": 40,
    "glitch hop": 49,
    "indie dance-nu disco": 37,
    "pop-rock": 39,
    "reggae-dub": 41
}


//Dropdown plugin data
var ddData = [
    {
        text: "Facebook",
        value: 1,
        selected: false,
        imageSrc: "img/bpicon.png"
    },
    {
        text: "Twitter",
        value: 2,
        selected: false,
        description: "Description with Twitter",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"
    },
    {
        text: "LinkedIn",
        value: 3,
        selected: false,
        description: "Description with LinkedIn",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"
    },
    {
        text: "Foursquare",
        value: 4,
        selected: false,
        description: "Description with Foursquare",
        imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
    }
];

//http://api.beatport.com/catalog/most-popular/genre?id=38&perPage=10
//https://gdata.youtube.com/feeds/api/videos?q=football+-soccer&orderby=published&start-index=11&max-results=10&v=2&alt=json
//http://gdata.youtube.com/feeds/api/playlists/PLqMj4U_qBrWr7Oo9q5rKqcVg8Sf1S7QgU

var d = {
    "version": "1.0",
    "encoding": "UTF-8",
    "feed": {
        "xmlns": "http://www.w3.org/2005/Atom",
        "xmlns$media": "http://search.yahoo.com/mrss/",
        "xmlns$openSearch": "http://a9.com/-/spec/opensearch/1.1/",
        "xmlns$gd": "http://schemas.google.com/g/2005",
        "xmlns$gml": "http://www.opengis.net/gml",
        "xmlns$yt": "http://gdata.youtube.com/schemas/2007",
        "xmlns$georss": "http://www.georss.org/georss",
        "gd$etag": "W/\"Dk8DRHc5eyp7I2A9Wh5XEUU.\"",
        "id": {
            "$t": "tag:youtube.com,2008:videos"
        },
        "updated": {
            "$t": "2013-11-11T15:47:55.923Z"
        },
        "category": [
            {
                "scheme": "http://schemas.google.com/g/2005#kind",
                "term": "http://gdata.youtube.com/schemas/2007#video"
            }
        ],
        "title": {
            "$t": "Videos matching: cat"
        },
        "logo": {
            "$t": "http://www.gstatic.com/youtube/img/logo.png"
        },
        "link": [
            {
                "rel": "alternate",
                "type": "text/html",
                "href": "https://www.youtube.com"
            },
            {
                "rel": "http://schemas.google.com/g/2005#feed",
                "type": "application/atom+xml",
                "href": "https://gdata.youtube.com/feeds/api/videos?v=2"
            },
            {
                "rel": "http://schemas.google.com/g/2005#batch",
                "type": "application/atom+xml",
                "href": "https://gdata.youtube.com/feeds/api/videos/batch?v=2"
            },
            {
                "rel": "self",
                "type": "application/atom+xml",
                "href": "https://gdata.youtube.com/feeds/api/videos?alt=json&q=cat&start-index=1&max-results=10&orderby=relevance&v=2"
            },
            {
                "rel": "service",
                "type": "application/atomsvc+xml",
                "href": "https://gdata.youtube.com/feeds/api/videos?alt=atom-service&v=2"
            },
            {
                "rel": "next",
                "type": "application/atom+xml",
                "href": "https://gdata.youtube.com/feeds/api/videos?alt=json&q=cat&start-index=11&max-results=10&orderby=relevance&v=2"
            }
        ],
        "author": [
            {
                "name": {
                    "$t": "YouTube"
                },
                "uri": {
                    "$t": "http://www.youtube.com/"
                }
            }
        ],
        "generator": {
            "$t": "YouTube data API",
            "version": "2.1",
            "uri": "http://gdata.youtube.com"
        },
        "openSearch$totalResults": {
            "$t": 1000000
        },
        "openSearch$startIndex": {
            "$t": 1
        },
        "openSearch$itemsPerPage": {
            "$t": 10
        },
        "entry": [
            {
                "gd$etag": "W/\"DE4BQ347eCp7I2A9Wh5XEUg.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:Kdgt1ZHkvnM"
                },
                "published": {
                    "$t": "2013-02-06T13:37:46.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T08:02:32.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Comedy",
                        "label": "Comedy"
                    }
                ],
                "title": {
                    "$t": "Epic Funny Cats 20 Minutes"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/Kdgt1ZHkvnM?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=Kdgt1ZHkvnM&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/Kdgt1ZHkvnM/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=Kdgt1ZHkvnM"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/b91Zl2MxLmUwriNocKeYnQ?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/Kdgt1ZHkvnM?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "Catsbook.co"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/CrazyCats2020"
                        },
                        "yt$userId": {
                            "$t": "b91Zl2MxLmUwriNocKeYnQ"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/Kdgt1ZHkvnM/comments?v=2",
                        "countHint": 12056
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Comedy",
                            "label": "Comedy",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/Kdgt1ZHkvnM?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 1201,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7d.c.youtube.com/CiILENy73wIaGQlzvuSR1S3YKRMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 1201,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7d.c.youtube.com/CiILENy73wIaGQlzvuSR1S3YKRMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 1201,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "crazycats2020",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "Catsbook.co"
                        }
                    ],
                    "media$description": {
                        "$t": "More funny cats -- http://bit.ly/Catsbook_co Epic Funny Cats 20 Minutes http://www.catsbook.co http://www.facebook.com/Catsbook.co https://twitter.com/Catsbo...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=Kdgt1ZHkvnM&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:10:00.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:05:00.250",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:10:00.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:15:00.750",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Epic Funny Cats 20 Minutes",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "1201"
                    },
                    "yt$uploaded": {
                        "$t": "2013-02-06T13:37:46.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCb91Zl2MxLmUwriNocKeYnQ"
                    },
                    "yt$videoid": {
                        "$t": "Kdgt1ZHkvnM"
                    }
                },
                "gd$rating": {
                    "average": 4.631054,
                    "max": 5,
                    "min": 1,
                    "numRaters": 60063,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$recorded": {
                    "$t": "2013-02-06"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "13341806"
                },
                "yt$rating": {
                    "numDislikes": "5540",
                    "numLikes": "54523"
                }
            },
            {
                "gd$etag": "W/\"D0YGQn47eCp7I2A9Wh5XEU4.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:xEhaVhta7sI"
                },
                "published": {
                    "$t": "2013-03-05T21:16:46.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T01:58:43.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Animals",
                        "label": "Pets & Animals"
                    }
                ],
                "title": {
                    "$t": "Cats Compilation"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/xEhaVhta7sI?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=xEhaVhta7sI&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/xEhaVhta7sI/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=xEhaVhta7sI"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/cz_5aVIagGz46J0_dvdzaw?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/xEhaVhta7sI?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "CompilarizTVi"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/CompilarizTVi"
                        },
                        "yt$userId": {
                            "$t": "cz_5aVIagGz46J0_dvdzaw"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/xEhaVhta7sI/comments?v=2",
                        "countHint": 8386
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Animals",
                            "label": "Pets & Animals",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/xEhaVhta7sI?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 305,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQnC7lobVlpIxBMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 305,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQnC7lobVlpIxBMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 305,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "compilariztvi",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "CompilarizTVi",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "More funny Videos on http://webfail.com Courtesy of CutiesNFuzzies http://bit.ly/CutiesNFuzziesClips Do yourself a favor and just watch it, okay? You won't b...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=xEhaVhta7sI&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:32.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:16.250",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:32.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/xEhaVhta7sI/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:03:48.750",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Cats Compilation",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "305"
                    },
                    "yt$uploaded": {
                        "$t": "2013-03-05T21:16:46.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCcz_5aVIagGz46J0_dvdzaw"
                    },
                    "yt$videoid": {
                        "$t": "xEhaVhta7sI"
                    }
                },
                "gd$rating": {
                    "average": 4.835594,
                    "max": 5,
                    "min": 1,
                    "numRaters": 58830,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "8175281"
                },
                "yt$rating": {
                    "numDislikes": "2418",
                    "numLikes": "56412"
                }
            },
            {
                "gd$etag": "W/\"CUUBQX47eCp7I2A9Wh5XEUg.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:ctJJrBw7e-c"
                },
                "published": {
                    "$t": "2011-07-09T02:31:02.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T07:00:50.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Comedy",
                        "label": "Comedy"
                    }
                ],
                "title": {
                    "$t": "Funny cats in water, EPIC"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/ctJJrBw7e-c?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=ctJJrBw7e-c&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ctJJrBw7e-c/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=ctJJrBw7e-c"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/qhmKO6x54y8Wpw8pyhV_gw?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ctJJrBw7e-c?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "SchneiderYuri"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/SchneiderYuri"
                        },
                        "yt$userId": {
                            "$t": "qhmKO6x54y8Wpw8pyhV_gw"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ctJJrBw7e-c/comments?v=2",
                        "countHint": 36092
                    }
                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Comedy",
                            "label": "Comedy",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/ctJJrBw7e-c?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 199,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r6---sn-p5qlsu7e.c.youtube.com/CiILENy73wIaGQnnezscrEnSchMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 199,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r6---sn-p5qlsu7e.c.youtube.com/CiILENy73wIaGQnnezscrEnSchMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 199,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "schneideryuri",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "SchneiderYuri",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "http://www.youtube.com/watch?v=ueXG7CAheO8 - new cat video http://bit.ly/SubForMyChannel - Sub for my channel please. Music: Nicoleta Dara - Is it true.",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=ctJJrBw7e-c&feature=youtube_gdata_player"
                    },
                    "media$restriction": [
                        {
                            "$t": "JP",
                            "type": "country",
                            "relationship": "deny"
                        }
                    ],
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:39.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:49.750",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:39.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ctJJrBw7e-c/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:29.250",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Funny cats in water, EPIC",
                        "type": "plain"
                    },
                    "yt$duration": {
                        "seconds": "199"
                    },
                    "yt$uploaded": {
                        "$t": "2011-07-09T02:31:02.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCqhmKO6x54y8Wpw8pyhV_gw"
                    },
                    "yt$videoid": {
                        "$t": "ctJJrBw7e-c"
                    }
                },
                "gd$rating": {
                    "average": 4.6918364,
                    "max": 5,
                    "min": 1,
                    "numRaters": 246022,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "79504283"
                },
                "yt$rating": {
                    "numDislikes": "18954",
                    "numLikes": "227068"
                }
            },
            {
                "gd$etag": "W/\"DUEFRX47eCp7I2A9Wh5XEU0.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:J11uu8L8FTY"
                },
                "published": {
                    "$t": "2013-04-18T21:33:06.000Z"
                },
                "updated": {
                    "$t": "2013-11-10T18:20:14.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Animals",
                        "label": "Pets & Animals"
                    }
                ],
                "title": {
                    "$t": "BIG CATS like boxes too!"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/J11uu8L8FTY?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=J11uu8L8FTY&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/J11uu8L8FTY/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=J11uu8L8FTY"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/cftblae5aEnraa34d1FPQg?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/J11uu8L8FTY?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "Big Cat Rescue"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/BigCatRescue"
                        },
                        "yt$userId": {
                            "$t": "cftblae5aEnraa34d1FPQg"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "moderated"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/J11uu8L8FTY/comments?v=2",
                        "countHint": 1942
                    }
                },
                "georss$where": {
                    "gml$Point": {
                        "gml$pos": {
                            "$t": "28.06842041015625 -82.55645751953125"
                        }
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Animals",
                            "label": "Pets & Animals",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/J11uu8L8FTY?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 168,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r3---sn-p5qlsu7k.c.youtube.com/CiILENy73wIaGQk2FfzCu25dJxMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 168,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r3---sn-p5qlsu7k.c.youtube.com/CiILENy73wIaGQk2FfzCu25dJxMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 168,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "bigcatrescue",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "Big Cat Rescue",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "Tigers, Lions & Leopards love boxes too! Just like domestic cats! To find out more about Big Cat Rescue, our mission and volunteer opportunities please visit...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=J11uu8L8FTY&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:24",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:42",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:24",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/J11uu8L8FTY/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:06",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "BIG CATS like boxes too!",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "168"
                    },
                    "yt$uploaded": {
                        "$t": "2013-04-18T21:33:06.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCcftblae5aEnraa34d1FPQg"
                    },
                    "yt$videoid": {
                        "$t": "J11uu8L8FTY"
                    }
                },
                "gd$rating": {
                    "average": 4.9388695,
                    "max": 5,
                    "min": 1,
                    "numRaters": 19303,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "2506805"
                },
                "yt$rating": {
                    "numDislikes": "295",
                    "numLikes": "19008"
                }
            },
            {
                "gd$etag": "W/\"CUEMRn47eCp7I2A9Wh5XEU4.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:ol1wxsN411k"
                },
                "published": {
                    "$t": "2013-09-16T18:10:40.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T01:34:47.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Animals",
                        "label": "Pets & Animals"
                    }
                ],
                "title": {
                    "$t": "Ginger Cat vs The Paper Army"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/ol1wxsN411k?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=ol1wxsN411k&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ol1wxsN411k/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=ol1wxsN411k"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/jqqFwAhaP4yDLTDiLbmmzA?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ol1wxsN411k?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "Adam Cox"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/Ricadamu"
                        },
                        "yt$userId": {
                            "$t": "jqqFwAhaP4yDLTDiLbmmzA"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ol1wxsN411k/comments?v=2",
                        "countHint": 1377
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Animals",
                            "label": "Pets & Animals",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/ol1wxsN411k?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 152,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQlZ13jDxnBdohMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 152,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQlZ13jDxnBdohMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 152,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "ricadamu",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "Adam Cox",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "Cats love to attack paper. Today, paper fights back. Subscribe for more! \u202ahttp://www.youtube.com/user/Ricadamu\u202c Facebook: \u202ahttps://www.facebook.com/Creatura...\u202c",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=ol1wxsN411k&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:16",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:38",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:16",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ol1wxsN411k/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:54",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Ginger Cat vs The Paper Army",
                        "type": "plain"
                    },
                    "yt$duration": {
                        "seconds": "152"
                    },
                    "yt$uploaded": {
                        "$t": "2013-09-16T18:10:40.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCjqqFwAhaP4yDLTDiLbmmzA"
                    },
                    "yt$videoid": {
                        "$t": "ol1wxsN411k"
                    }
                },
                "gd$rating": {
                    "average": 4.84178,
                    "max": 5,
                    "min": 1,
                    "numRaters": 22197,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "2344853"
                },
                "yt$rating": {
                    "numDislikes": "878",
                    "numLikes": "21319"
                }
            },
            {
                "gd$etag": "W/\"DEYBSH47eCp7I2A9Wh5XEU0.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:q1dpQKntj_w"
                },
                "published": {
                    "$t": "2009-03-06T19:47:25.000Z"
                },
                "updated": {
                    "$t": "2013-11-10T17:55:59.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Comedy",
                        "label": "Comedy"
                    }
                ],
                "title": {
                    "$t": "10 Cutest Cat Moments"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/q1dpQKntj_w?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=q1dpQKntj_w&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/q1dpQKntj_w/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=q1dpQKntj_w"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/Gaj1kgS4I3WpkiAXf5y7hw?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/q1dpQKntj_w?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "LiquidGenerationTube"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/LiquidGenerationTube"
                        },
                        "yt$userId": {
                            "$t": "Gaj1kgS4I3WpkiAXf5y7hw"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "allowed"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/q1dpQKntj_w/comments?v=2",
                        "countHint": 31557
                    }
                },
                "yt$location": {
                    "$t": "8750 wilshire blvd beverly hills, ca 90211"
                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Comedy",
                            "label": "Comedy",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/q1dpQKntj_w?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 336,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r4---sn-p5qlsu7d.c.youtube.com/CiILENy73wIaGQn8j-2pQGlXqxMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 336,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r4---sn-p5qlsu7d.c.youtube.com/CiILENy73wIaGQn8j-2pQGlXqxMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 336,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "liquidgenerationtube",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "LiquidGenerationTube"
                        }
                    ],
                    "media$description": {
                        "$t": "The clips for this compilation of cute cat bloopers, etc. is one of our favorite videos. http://www.liquidgeneration.com/abbc9828.",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=q1dpQKntj_w&feature=youtube_gdata_player"
                    },
                    "media$restriction": [
                        {
                            "$t": "JP",
                            "type": "country",
                            "relationship": "deny"
                        }
                    ],
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:48",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:24",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:02:48",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/q1dpQKntj_w/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:04:12",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "10 Cutest Cat Moments",
                        "type": "plain"
                    },
                    "yt$duration": {
                        "seconds": "336"
                    },
                    "yt$uploaded": {
                        "$t": "2009-03-06T19:47:25.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCGaj1kgS4I3WpkiAXf5y7hw"
                    },
                    "yt$videoid": {
                        "$t": "q1dpQKntj_w"
                    }
                },
                "gd$rating": {
                    "average": 4.827182,
                    "max": 5,
                    "min": 1,
                    "numRaters": 97999,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$recorded": {
                    "$t": "2008-09-19"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "17917550"
                },
                "yt$rating": {
                    "numDislikes": "4234",
                    "numLikes": "93765"
                }
            },
            {
                "gd$etag": "W/\"Ak8FQn47eCp7I2A9Wh5XEU0.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:19jaOSNibkU"
                },
                "published": {
                    "$t": "2013-10-25T11:19:49.000Z"
                },
                "updated": {
                    "$t": "2013-11-10T18:40:13.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Film",
                        "label": "Film & Animation"
                    }
                ],
                "title": {
                    "$t": "Scary Legs - Simon's Cat (A Halloween Special)"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/19jaOSNibkU?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=19jaOSNibkU&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/19jaOSNibkU/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=19jaOSNibkU"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/H6vXjt-BA7QHl0KnfL-7RQ?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/19jaOSNibkU?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "simonscat"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/simonscat"
                        },
                        "yt$userId": {
                            "$t": "H6vXjt-BA7QHl0KnfL-7RQ"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/19jaOSNibkU/comments?v=2",
                        "countHint": 3928
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Film",
                            "label": "Film & Animation",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/19jaOSNibkU?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 113,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7z.c.youtube.com/CiILENy73wIaGQlFbmIjOdrY1xMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 113,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r2---sn-p5qlsu7z.c.youtube.com/CiILENy73wIaGQlFbmIjOdrY1xMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 113,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "simonscat",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "simonscat",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "\"Anattention-seekingcatspinsawebtocatchhisownersattention\" Don't forget to SUBSCRIBE! http://www.youtube.com/subscription_center?add_user=simonscat...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=19jaOSNibkU&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:56.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:28.250",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:56.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/19jaOSNibkU/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:24.750",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Scary Legs - Simon's Cat (A Halloween Special)",
                        "type": "plain"
                    },
                    "yt$duration": {
                        "seconds": "113"
                    },
                    "yt$uploaded": {
                        "$t": "2013-10-25T11:19:49.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCH6vXjt-BA7QHl0KnfL-7RQ"
                    },
                    "yt$videoid": {
                        "$t": "19jaOSNibkU"
                    }
                },
                "gd$rating": {
                    "average": 4.925769,
                    "max": 5,
                    "min": 1,
                    "numRaters": 64124,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "4177283"
                },
                "yt$rating": {
                    "numDislikes": "1190",
                    "numLikes": "62934"
                }
            },
            {
                "gd$etag": "W/\"D0YHSX47eCp7I2A9Wh5XEUk.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:ZBAGEeOms-8"
                },
                "published": {
                    "$t": "2012-10-17T21:09:11.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T04:45:38.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Animals",
                        "label": "Pets & Animals"
                    }
                ],
                "title": {
                    "$t": "Epic Funny Cats / Cute Cats Compilation  -  60 minutes!! [HD][HQ]"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/ZBAGEeOms-8?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=ZBAGEeOms-8&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ZBAGEeOms-8/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=ZBAGEeOms-8"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/fM4Ls9nZKTourBUerc1Wnw?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ZBAGEeOms-8?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "EpicCompilation"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/EpicCompilation"
                        },
                        "yt$userId": {
                            "$t": "fM4Ls9nZKTourBUerc1Wnw"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/ZBAGEeOms-8/comments?v=2",
                        "countHint": 9547
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Animals",
                            "label": "Pets & Animals",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/ZBAGEeOms-8?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 3605,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7r.c.youtube.com/CiILENy73wIaGQnvs6bjEQYQZBMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 3605,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7r.c.youtube.com/CiILENy73wIaGQnvs6bjEQYQZBMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 3605,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "epiccompilation",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "EpicCompilation"
                        }
                    ],
                    "media$description": {
                        "$t": "An epic compilation with hundreds of funny and cute cats in one video (one hour).",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=ZBAGEeOms-8&feature=youtube_gdata_player"
                    },
                    "media$restriction": [
                        {
                            "$t": "JP",
                            "type": "country",
                            "relationship": "deny"
                        }
                    ],
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:30:02.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:15:01.250",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:30:02.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/ZBAGEeOms-8/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:45:03.750",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Epic Funny Cats / Cute Cats Compilation  -  60 minutes!! [HD][HQ]",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "3605"
                    },
                    "yt$uploaded": {
                        "$t": "2012-10-17T21:09:11.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCfM4Ls9nZKTourBUerc1Wnw"
                    },
                    "yt$videoid": {
                        "$t": "ZBAGEeOms-8"
                    }
                },
                "gd$rating": {
                    "average": 4.710366,
                    "max": 5,
                    "min": 1,
                    "numRaters": 60680,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "11251269"
                },
                "yt$rating": {
                    "numDislikes": "4394",
                    "numLikes": "56286"
                }
            },
            {
                "gd$etag": "W/\"C0UEQ347eCp7I2A9Wh5XEU4.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:NZ8IaSdJAtA"
                },
                "published": {
                    "$t": "2013-02-16T19:20:32.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T00:53:22.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Animals",
                        "label": "Pets & Animals"
                    }
                ],
                "title": {
                    "$t": "Cats shopping at PetSmart - OFF LEASH"
                },
                "content": {
                    "type": "video/3gpp",
                    "src": "rtsp://r3---sn-p5qlsu7e.c.youtube.com/CiILENy73wIaGQnQAkknaQifNRMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=NZ8IaSdJAtA&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/NZ8IaSdJAtA/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=NZ8IaSdJAtA"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/Ka6Dt4qiBpD9tVJfk4P52w?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/NZ8IaSdJAtA?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "Zeus & Phoebe's Cat Sanctuary"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/utahactor"
                        },
                        "yt$userId": {
                            "$t": "Ka6Dt4qiBpD9tVJfk4P52w"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "moderated"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "denied"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/NZ8IaSdJAtA/comments?v=2",
                        "countHint": 552
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Animals",
                            "label": "Pets & Animals",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "rtsp://r3---sn-p5qlsu7e.c.youtube.com/CiILENy73wIaGQnQAkknaQifNRMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 1328,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r3---sn-p5qlsu7e.c.youtube.com/CiILENy73wIaGQnQAkknaQifNRMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 1328,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "utahactor",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "Zeus & Phoebe's Cat Sanctuary",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "Order your Zeus & Phoebe kitty cat cards here https://www.facebook.com/ZeusAndPhoebe Become a fan and LIKE our Facebook page to see photos and updates: http:...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=NZ8IaSdJAtA&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:11:04",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:05:32",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:11:04",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/NZ8IaSdJAtA/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:16:36",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Cats shopping at PetSmart - OFF LEASH",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "1328"
                    },
                    "yt$uploaded": {
                        "$t": "2013-02-16T19:20:32.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCKa6Dt4qiBpD9tVJfk4P52w"
                    },
                    "yt$videoid": {
                        "$t": "NZ8IaSdJAtA"
                    }
                },
                "yt$noembed": {

                },
                "gd$rating": {
                    "average": 4.5460615,
                    "max": 5,
                    "min": 1,
                    "numRaters": 749,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "103716"
                },
                "yt$rating": {
                    "numDislikes": "85",
                    "numLikes": "664"
                }
            },
            {
                "gd$etag": "W/\"CEIESX47eCp7I2A9Wh5XEUg.\"",
                "id": {
                    "$t": "tag:youtube.com,2008:video:4fsSAPyHxJI"
                },
                "published": {
                    "$t": "2013-04-29T15:03:05.000Z"
                },
                "updated": {
                    "$t": "2013-11-11T06:48:28.000Z"
                },
                "category": [
                    {
                        "scheme": "http://schemas.google.com/g/2005#kind",
                        "term": "http://gdata.youtube.com/schemas/2007#video"
                    },
                    {
                        "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat",
                        "term": "Comedy",
                        "label": "Comedy"
                    }
                ],
                "title": {
                    "$t": "Cat-Friend vs Dog-Friend 2"
                },
                "content": {
                    "type": "application/x-shockwave-flash",
                    "src": "https://www.youtube.com/v/4fsSAPyHxJI?version=3&f=videos&app=youtube_gdata"
                },
                "link": [
                    {
                        "rel": "alternate",
                        "type": "text/html",
                        "href": "https://www.youtube.com/watch?v=4fsSAPyHxJI&feature=youtube_gdata"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#video.related",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/4fsSAPyHxJI/related?v=2"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#mobile",
                        "type": "text/html",
                        "href": "https://m.youtube.com/details?v=4fsSAPyHxJI"
                    },
                    {
                        "rel": "http://gdata.youtube.com/schemas/2007#uploader",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/users/mMommaJFJOFbJytrTMjGCw?v=2"
                    },
                    {
                        "rel": "self",
                        "type": "application/atom+xml",
                        "href": "https://gdata.youtube.com/feeds/api/videos/4fsSAPyHxJI?v=2"
                    }
                ],
                "author": [
                    {
                        "name": {
                            "$t": "fatawesome"
                        },
                        "uri": {
                            "$t": "https://gdata.youtube.com/feeds/api/users/fatawesomefilms"
                        },
                        "yt$userId": {
                            "$t": "mMommaJFJOFbJytrTMjGCw"
                        }
                    }
                ],
                "yt$accessControl": [
                    {
                        "action": "comment",
                        "permission": "allowed"
                    },
                    {
                        "action": "commentVote",
                        "permission": "allowed"
                    },
                    {
                        "action": "videoRespond",
                        "permission": "moderated"
                    },
                    {
                        "action": "rate",
                        "permission": "allowed"
                    },
                    {
                        "action": "embed",
                        "permission": "allowed"
                    },
                    {
                        "action": "list",
                        "permission": "allowed"
                    },
                    {
                        "action": "autoPlay",
                        "permission": "allowed"
                    },
                    {
                        "action": "syndicate",
                        "permission": "allowed"
                    }
                ],
                "gd$comments": {
                    "gd$feedLink": {
                        "rel": "http://gdata.youtube.com/schemas/2007#comments",
                        "href": "https://gdata.youtube.com/feeds/api/videos/4fsSAPyHxJI/comments?v=2",
                        "countHint": 4003
                    }
                },
                "yt$hd": {

                },
                "media$group": {
                    "media$category": [
                        {
                            "$t": "Comedy",
                            "label": "Comedy",
                            "scheme": "http://gdata.youtube.com/schemas/2007/categories.cat"
                        }
                    ],
                    "media$content": [
                        {
                            "url": "https://www.youtube.com/v/4fsSAPyHxJI?version=3&f=videos&app=youtube_gdata",
                            "type": "application/x-shockwave-flash",
                            "medium": "video",
                            "isDefault": "true",
                            "expression": "full",
                            "duration": 145,
                            "yt$format": 5
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQmSxIf8ABL74RMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 145,
                            "yt$format": 1
                        },
                        {
                            "url": "rtsp://r5---sn-p5qlsu7s.c.youtube.com/CiILENy73wIaGQmSxIf8ABL74RMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp",
                            "type": "video/3gpp",
                            "medium": "video",
                            "expression": "full",
                            "duration": 145,
                            "yt$format": 6
                        }
                    ],
                    "media$credit": [
                        {
                            "$t": "fatawesomefilms",
                            "role": "uploader",
                            "scheme": "urn:youtube",
                            "yt$display": "fatawesome",
                            "yt$type": "partner"
                        }
                    ],
                    "media$description": {
                        "$t": "Here's some more reasons why you might not keep your friends around if they acted like your pets. Facebook us- https://www.facebook.com/Fatawesome http://fat...",
                        "type": "plain"
                    },
                    "media$keywords": {

                    },
                    "media$license": {
                        "$t": "youtube",
                        "type": "text/html",
                        "href": "http://www.youtube.com/t/terms"
                    },
                    "media$player": {
                        "url": "https://www.youtube.com/watch?v=4fsSAPyHxJI&feature=youtube_gdata_player"
                    },
                    "media$thumbnail": [
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/default.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:12.500",
                            "yt$name": "default"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/mqdefault.jpg",
                            "height": 180,
                            "width": 320,
                            "yt$name": "mqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/hqdefault.jpg",
                            "height": 360,
                            "width": 480,
                            "yt$name": "hqdefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/sddefault.jpg",
                            "height": 480,
                            "width": 640,
                            "yt$name": "sddefault"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/1.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:00:36.250",
                            "yt$name": "start"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/2.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:12.500",
                            "yt$name": "middle"
                        },
                        {
                            "url": "https://i.ytimg.com/vi/4fsSAPyHxJI/3.jpg",
                            "height": 90,
                            "width": 120,
                            "time": "00:01:48.750",
                            "yt$name": "end"
                        }
                    ],
                    "media$title": {
                        "$t": "Cat-Friend vs Dog-Friend 2",
                        "type": "plain"
                    },
                    "yt$aspectRatio": {
                        "$t": "widescreen"
                    },
                    "yt$duration": {
                        "seconds": "145"
                    },
                    "yt$uploaded": {
                        "$t": "2013-04-29T15:03:05.000Z"
                    },
                    "yt$uploaderId": {
                        "$t": "UCmMommaJFJOFbJytrTMjGCw"
                    },
                    "yt$videoid": {
                        "$t": "4fsSAPyHxJI"
                    }
                },
                "gd$rating": {
                    "average": 4.9424043,
                    "max": 5,
                    "min": 1,
                    "numRaters": 50212,
                    "rel": "http://schemas.google.com/g/2005#overall"
                },
                "yt$statistics": {
                    "favoriteCount": "0",
                    "viewCount": "3763922"
                },
                "yt$rating": {
                    "numDislikes": "723",
                    "numLikes": "49489"
                }
            }
        ]
    }
}

function capitalizer(str) {
    str = str.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    });
    return str

}

bpyt.init();