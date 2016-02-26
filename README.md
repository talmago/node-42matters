# node-42matters

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Google Play Store API](#google-play-store-api)
    - [Class Variables](#class-variables)
    - [Constructor](#constructor)
    - [Lookup API](#lookup-api)
    - [Search API](#search-api)
    - [Advanced Query API](#advanced-query-api)
    - [Availability API](#availability-api)
- [Apple Store API](#apple-store-api)
    - [Constructor](#constructor-1)
    - [Lookup API](#lookup-api-1)
    - [Search API](#search-api-1)
    - [Advanced Query API](#advanced-query-api-1)


## Overview

Simple API module for 42matters written in Node.js. MIT LICENSE.

## Quick Start

#### Installation

```sh
npm install 42matters
```

#### Usage

```javascript
const M42 = require('42matters');
const GooglePlayStoreAPI = M42.GooglePlayStoreAPI;
const AppleStoreAPI =  M42.AppleStoreAPI;
```

> **NOTICE:** Class methods support both [Promise/A+](https://www.promisejs.org/) 
and [callbacks] (https://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks) 
for convenience. Examples here are with `Promise/A+`, but feel free to use callbacks.


#### Google Play Store API


##### Class variables

API internal properties and references are accessible within the GooglePlayStoreAPI class.

`GooglePlayStoreAPI` class has the following "static" variables:

    * `endpoints` - Object, API endpoints.
    * `countries` - Object, mapping between country codes and their names (e.g 'en' -> 'English').
    * `languages` - Object, mapping between language codes and their names (e.g 'zh-cn' -> 'Chinese Simplified').
    * `categories` - Object, mapping between categories and their names (e.g. 'NEWS_AND_MAGAZINES' -> 'News & Magazines').
    * `charts` - Object, mapping between charts and their description (e.g. 'topgrossing' -> 'Top Grossing Apps'). 


For example, in order to know which country codes are supported by the API we can 
simply print `GooglePlayStoreAPI.countries`.


```javascript
> console.log(GooglePlayStoreAPI.countries);
{
    "US": "United States",
    "AR": "Argentina",
    "AU": "Australia",
    "AT": "Austria",
    "BE": "Belgium",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "CA": "Canada",
    "CL": "Chile",
    "CN": "China",
    "CO": "Colombia",
    "HR": "Croatia",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EG": "Egypt",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IN": "India",
    "ID": "Indonesia",
    "IL": "Israel",
    "IT": "Italy",
    "JP": "Japan",
    "LV": "Latvia",
    "LT": "Lithuania",
    "MY": "Malaysia",
    "MX": "Mexico",
    "NL": "Netherlands",
    "NZ": "New Zealand",
    "NO": "Norway",
    "PE": "Peru",
    "PH": "Phillipines",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "RU": "Russian Federation",
    "SA": "Saudi Arabia",
    "RS": "Serbia",
    "SG": "Singapore",
    "SK": "Slovakia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "ES": "Spain",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TW": "Taiwan",
    "TH": "Thailand",
    "TR": "Turkey",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "VN": "Vietnam"
}
```

##### Constructor

```javascript

var playStore = new GooglePlayStoreAPI({
    accessToken: '42MATTERS_ACCESS_TOKEN'                 // mandatory
    debug: true|false,                                    // optional, default is false.
    useCache: true|false                                  // optional, default is false.
});
```

##### Lookup API

Find an android app that matches the specified package name and return full app details.
See full API documentation [here]("https://42matters.com/api/lookup").

```javascript
// Using a promise
playStore.lookup('com.facebook.orca')
    .then(function (res) {
        // `res` object should look like this:
        {
            package_name: 'com.facebook.orca',
            title: 'Messenger',
            description: 'Instantly reach the people in your life—for free. Messenger is just like texting, but you don\'t have to pay for every message (it works with your data plan). Not just for Facebook friends: Message people in your phone book and just enter a phone number to add a new contact.\n\nGroup chats: Create groups for the people you message most. Name them, set group photos and keep them all in one place.\n\nPhotos and videos: Shoot videos and snap selfies or other photos right from the app and send them with one tap.\n\nChat heads: Keep the conversation going while you use other apps. \n\nFree calls: Talk as long as you want, even with people in other countries. (Calls are free over Wi-Fi. Otherwise, standard data charges apply.)\n\nEven more ways to message: \nBring your conversations to life with stickers. \nPreview your gallery photos and videos without leaving the conversation--then choose the perfect ones to send.\nRecord voice messages when you have more to say.\n\nExtra features:\nKnow when people have seen your messages.\nForward messages or photos to people who weren\'t in the conversation.\nSearch for people and groups to quickly get back to them.\nTurn on location to let people know when you\'re nearby.\nSee who\'s available on Messenger and who\'s active on Facebook. \nCreate shortcuts to get to any conversation right from your home screen.\nTurn off notifications when you\'re working, sleeping or just need a break.\nStay logged in so you never miss a message.\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            short_desc: 'Messenger — a faster way to message.',
            rating: 3.8945906162262,
            category: 'Communication',
            cat_int: 5,
            cat_type: 0,
            cat_key: 'COMMUNICATION',
            price: '',
            price_numeric: 0,
            iap: false,
            iap_min: 0,
            iap_max: 0,
            downloads: '1,000,000,000 - 5,000,000,000',
            downloads_min: 1000000000,
            downloads_max: 5000000000,
            version: 'Varies with device',
            content_rating: 'Everyone',
            market_update: '2016-02-22T00:00:00+00:00',
            screenshots: ['https://lh5.ggpht.com/S3udjKLR0045VRTGmKSCRq6n_-JVM084xH36SYUmjRnc8zZ2Gcq8eL7bixe-cscP_A=h310',
                'https://lh4.ggpht.com/Idi8NCyRZHGQ8V1h64dGqD-N7PGym27FghdYtRqCY1H5HP5wRZwjISS8RB2XXnwh6Q=h310',
                'https://lh6.ggpht.com/reXX4Sm0tmG5vu534eddDzgBW8R3s3ysmVCpMuXphHSDXct92G8vRpJQis7ZgCHe0Q=h310',
                'https://lh5.ggpht.com/2FjQK1nkRoihPnafEG3KxuO5UkRDjZKfHUPcZgtz1jgB-zpKg9tduPEuX2jjK23WpwKv=h310',
                'https://lh5.ggpht.com/dH_Znb__NjJkyQ0_HW4TPniO3pnfXqhVF9xQ2r06bj_z0PGXIKIIxw0GlvDmKWYUDw=h310',
                'https://lh6.ggpht.com/qvqDEwA-q0qKrXMfMTaI6GYymqI1sdmS00QYoEYNn_fR2Eh2hIsHKs-D_9c1q9EV5m7N=h310',
                'https://lh3.googleusercontent.com/Aw9Yc9dOrD4sMMLHmlUizVwcAwUhJntcUPc68Fl_UpVozZmLRQmIu0iFHrvMv1IiXzQ=h310'],
            lang: 'en',
            i18n_lang: ['de',
                'hi',
                'no',
                'ru',
                'fi',
                'pt',
                'hr',
                'fr',
                'zh-cn',
                'hu',
                'sk',
                'id',
                'sv',
                'ko',
                'zh-tw',
                'pt-br',
                'ms',
                'el',
                'it',
                'es',
                'cs',
                'vi',
                'th',
                'ja',
                'pl',
                'da',
                'nl',
                'tr'],
            price_i18n_countries: [],
            website: 'http://www.facebook.com/apps/application.php?id%3D256002347743983',
            created: '2011-12-19T08:31:50+00:00',
            version_code: 14709108,
            developer: 'Facebook',
            number_ratings: 23552539,
            icon: 'https://lh5.ggpht.com/0VYAvZLR9YhosF-thqm8xl8EWsCfrEY_uk2og2f59K8IOx5TfPsXjFVwxaHVnUbuEjc=w300',
            icon_72: 'https://lh5.ggpht.com/0VYAvZLR9YhosF-thqm8xl8EWsCfrEY_uk2og2f59K8IOx5TfPsXjFVwxaHVnUbuEjc=w72',
            promo_video: '',
            market_url: 'https://play.google.com/store/apps/details?id=com.facebook.orca&referrer=utm_source%3D42matters.com%26utm_medium%3Dapi',
            deep_link: 'http://playboard.me/android/apps/com.facebook.orca'
        }
    });

// Using a callback
playStore.lookup('com.facebook.orca', function(err, res) {
    // ...
});
```

`lookup` receives the following arguments:
* pname - mandatory, package name (e.g. 'com.facebook.orca').
* lang  - optional, language code. (e.g 'en'). default is 'en'.
* fields - optional. output fields (e.g ['package_name']). Default is all.
* callback - optional. callback function.


##### Search API

Find Android apps that match a given full text query. 
Searches are done against 42matters index of android apps and are ranked based on 42matters' algorithms, 
which do not match the order on other stores such as Google Play Store. 
See full API documentation [here] ("https://42matters.com/api/search"). 

```javascript
playStore.search('arcade games')
    .then(function (res) {
        console.log(res);
    });
```

`search` receives the following arguments:
* query - mandatory, query string for the search (e.g. 'arcade games').
* include_desc - optional. whether or not to include description. default is true.
* limit - optional. limit response items (1-50).
* page - optional. page number (1 - max pages).
* lang - optional, language code. (e.g 'en'). default is 'en'.
* fields - optional. output fields (e.g ['package_name']). Default is all.
* callback - optional. callback function.

##### Advanced Query API

Run an advanced query with multiple filters and sorting for all available app parameters for android app. 
Ideal for data analysis and market insights of the Google Play Store™.
See full API documentation [here]("https://42matters.com/api/advanced-query-api").

```javascript
// Query
playStore.query({
        "query": {
            "name": "Most Popular Apps",
            "platform": "android",
            "query_params": {
                "sort": "number_ratings",
                "from": 0,
                "num": 10,
                "sort_order": "desc"
            }
        }
    })
    .then(function (queryResult) {
        // do something with queryResult object
    });
```

`query` receives the following arguments:
* query - mandatory. Query object. You can design your query JSON [here] (https://42matters.com/app-market-explorer/android).
* lang - optional, language code. (e.g 'en'). default is 'en'.
* limit - optional. limit response items (1-100).
* page - optional. page number (1 - max pages).
* fields - optional. output fields (e.g ['package_name']). Default is all.
* callback - optional.

##### Availability API

Check in which countries an android app is available.

```javascript
playStore.available('com.facebook.orca')
    .then(function(res) {
        // res should look like this:
        { 
            DE: true,
            NO: true,
            RS: true,
            RU: true,
            BE: true,
            FI: true,
            TW: true,
            HK: true,
            PT: true,
            BG: true,
            JP: true,
            DK: true,
            HR: true,
            FR: true,
            NZ: true,
            UA: true,
            HU: true,
            SA: true,
            BR: true,
            SE: true,
            SG: true,
            SK: true,
            GB: true,
            ID: true,
            US: true,
            CA: true,
            EG: true,
            IL: true,
            AE: true,
            IN: true,
            CH: true,
            KR: true,
            ZA: true,
            CL: true,
            IT: true,
            GR: true,
            ES: true,
            AR: true,
            AT: true,
            AU: true,
            TH: true,
            CZ: true,
            VN: true,
            PH: true,
            PL: true,
            RO: true,
            NL: true,
            TR: true,
            MX: true,
            MY: true,
            LT: true,
            PY: true,
            LV: true,
            EE: true,
            UY: true,
            CO: true,
            PE: true,
            CN: false 
        }
    });
```

`available` receives the following arguments:
* pname - mandatory. Package name (e.g. 'com.facebook.orca').
* countries - optional, array of language codes. (e.g ['en']). 
              Output will consist of these countries only.
* callback - optional.

##### Top Google Play Charts API

Retrieve the top app charts on Google Play for a specific date and country. 
Lists have up to 540 apps for 55 countries for a total of 6944 lists daily. 
See more details [here] (https://42matters.com/api/top-google-charts).
 
```javascript
// Google top charts
playStore.getTopGoogleChart('topgrossing')
    .then(function (chart) {
        chart = chart.appList;
        // do something with the chart
    });
```

`getTopGoogleChart` receives the following arguments:
* chart - mandatory. chart name [topselling_free|topselling_paid|topgrossing|topselling_new_free|topselling_new_paid].
* country - optional. country code (e.g 'US'). default is 'US'.
* lang - optional, language code. (e.g 'en'). default is 'en'.
* limit - optional. limit response items (1-100).
* page - optional. page number (1 - max pages).
* fields - optional. output fields (e.g ['package_name']). Default is all.
* callback - optional.


#### Apple Store API

##### Constructor

```javascript

var appleStore = new AppleStoreAPI({
    accessToken: "42MATTERS_ACCESS_TOKEN",            // mandatory, 42matters access token
    debug: true|false,                                // optional. default is false.
    useCache: true|false                              // optional. default is false.
});
```

##### Lookup API

Returns iPhone and iPad applications that match a given iOS app track ID.
See full API documentation [here] (https://42matters.com/api/ios/lookup).

```javascript
appleStore.lookup(343200656)
    .then(function(res) {
        // res should look like this:
        { artistId: 298910979,
          artistName: 'Rovio Entertainment Ltd',
          artistViewUrl: 'http://itunes.apple.com/artist/rovio-entertainment-ltd/id298910979?uo=5',
          artworkUrl100: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/175x175bb-85.jpg',
          artworkUrl512: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/512x512bb-85.jpg',
          artworkUrl60: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/100x100bb-85.jpg',
          averageUserRating: 4.5,
          averageUserRatingForCurrentVersion: 4,
          bundleId: 'com.clickgamer.AngryBirds',
          contentAdvisoryRating: '4+',
          currency: 'USD',
          description: 'Use the unique powers of the Angry Birds to destroy the greedy pigs\' defenses!  \n\nThe survival of the Angry Birds is at stake. Dish out revenge on the greedy pigs who stole their eggs. Use the unique powers of each bird to destroy the pigs’ defenses. Angry Birds features challenging physics-based gameplay and hours of replay value. Each level requires logic, skill and force to solve.  \n\nIf you get stuck in the game, you can purchase the Mighty Eagle! Mighty Eagle is a one-time in-app purchase in Angry Birds that gives unlimited use. This phenomenal creature will soar from the skies to wreak havoc and smash the pesky pigs into oblivion. There’s just one catch: you can only use the aid of Mighty Eagle to pass a level once per hour. Mighty Eagle also includes all new gameplay goals and achievements!  \n\nIn addition to the Mighty Eagle, Angry Birds now has power-ups! Boost your birds’ abilities and three-star levels to unlock secret content! Angry Birds now has the following amazing power-ups: Sling Scope for laser targeting, King Sling for maximum flinging power, Super Seeds to supersize your birds, and Birdquake to shake pigs’ defenses to the ground!  \n\nHAVING TROUBLE? Head over to https://support.rovio.com where you can browse FAQs or submit a request to our support flock!\n\n#1 IPHONE PAID APP in US, UK, Canada, Italy, Germany, Russia, Sweden, Denmark, Finland, Singapore, Poland, France, Netherlands, Malta, Greece, Austria, Australia, Turkey, UAE, Saudi Arabia, Israel, Belgium, Norway, Hungary, Malaysia, Luxembourg, Portugal, Czech Republic, Spain, Ireland, Romania, New Zealand, Latvia, Lithuania, Estonia, Nicaragua, Kazakhstan, Argentina, Bulgaria, Slovakia, Slovenia, Mauritius, Chile, Hong Kong, Pakistan, Taiwan, Colombia, Indonesia, Thailand, India, Kenya, Macedonia, Croatia, Macau, Paraguay, Peru, Armenia, Philippines, Vietnam, Jordan and Kuwait.   \n\n#1 IPHONE PAID GAME in more countries than we can count!\n\nTerms of Use: http://www.rovio.com/eula \nPrivacy Policy: http://www.rovio.com/privacy \n\nThis application may require internet connectivity and subsequent data transfer charges may apply.\n\n\nImportant Message for Parents\n\nThis game may include:\n- Direct links to social networking websites that are intended for an audience over the age of 13.\n- Direct links to the internet that can take players away from the game with the potential to browse any web page.\n- Advertising of Rovio products and also products from select partners.\n- The option to make in-app purchases. The bill payer should always be consulted beforehand.',
          features: [ 'gameCenter' ],
          fileSizeBytes: '71674372',
          fileSizeBytesNumeric: 71674372,
          formattedPrice: '0.99 USD',
          genreIds: [ '6014', '6016', '7001', '7003' ],
          genres: [ 'Games', 'Entertainment', 'Action', 'Arcade' ],
          ipad: false,
          ipadScreenshotUrls: [],
          iphone: true,
          isGameCenterEnabled: true,
          isVppDeviceBasedLicensingEnabled: true,
          languageCodesISO2A: [ 'EN', 'FR', 'DE', 'IT', 'JA', 'PT', 'RU', 'ZH', 'ES', 'ZH' ],
          minimumOsVersion: '6.0',
          price: 0.99,
          primaryGenreId: 6014,
          primaryGenreName: 'Games',
          releaseDate: '2009-12-11T00:00:00+00:00',
          releaseNotes: 'The #1 App of all time turns 6!\nJoin the celebration in 15 all-new levels in the BirdDay episode!',
          screenshotUrls: 
           [ 'http://a3.mzstatic.com/us/r30/Purple5/v4/bc/9f/44/bc9f4453-7031-d39f-1ba2-c64ac3662c93/screen480x480.jpeg',
             'http://a1.mzstatic.com/us/r30/Purple69/v4/e9/d3/f6/e9d3f6f8-ac9e-2218-e069-9f5fac99daee/screen480x480.jpeg',
             'http://a3.mzstatic.com/us/r30/Purple7/v4/7e/d5/8b/7ed58b94-dfbf-366a-f3f6-5a8f65e2fa94/screen480x480.jpeg',
             'http://a3.mzstatic.com/us/r30/Purple5/v4/76/7a/f4/767af4a2-9471-ac84-f428-c1e0494d99d1/screen480x480.jpeg' ],
          sellerName: 'Rovio Entertainment Ltd',
          sellerUrl: 'http://www.angrybirds.com/',
          supportedDevices: 
           [ 'iPhone-3GS',
             'iPhone4',
             'iPodTouchFourthGen',
             'iPad2Wifi',
             'iPad23G',
             'iPhone4S',
             'iPadThirdGen',
             'iPadThirdGen4G',
             'iPhone5',
             'iPodTouchFifthGen',
             'iPadFourthGen',
             'iPadFourthGen4G',
             'iPadMini',
             'iPadMini4G',
             'iPhone5c',
             'iPhone5s',
             'iPhone6',
             'iPhone6Plus',
             'iPodTouchSixthGen' ],
          trackCensoredName: 'Angry Birds',
          trackContentRating: '4+',
          trackId: 343200656,
          trackViewUrl: 'http://itunes.apple.com/app/angry-birds/id343200656?uo=5&at=10l9yE',
          userRatingCount: 822935,
          userRatingCountForCurrentVersion: 802,
          version: '6.0.1' 
        }
    });
```

`lookup` receives the following arguments:
* id - mandatory, apple store ID (e.g. 343200656). number format.
* lang  - optional, language code. (e.g 'en'). default is 'en'.
* fields - optional. output fields (e.g ['artistId', 'artistName']). Default is all.
* callback - optional. callback function.


##### Search API

Returns iPhone and iPad applications that match a given full text search query. 
Search results are ranked based on 42matters' algorithms and do no match the order of the Apple App Store.

```javascript
appleStore.search("angry birds")
    .then(function(res) {
        // res would be:
        { results: 
           [{  
               artistId: 298910979,
               artistName: 'Rovio Entertainment Ltd',
               artistViewUrl: 'http://itunes.apple.com/artist/rovio-entertainment-ltd/id298910979?uo=5',
               artworkUrl100: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/175x175bb-85.jpg',
               artworkUrl512: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/512x512bb-85.jpg',
               artworkUrl60: 'http://is2.mzstatic.com/image/thumb/Purple69/v4/b1/e2/8d/b1e28d0d-810b-173a-2d97-6a472774c6ae/mzl.uulfrkla.png/100x100bb-85.jpg',
               averageUserRating: 4.5,
               averageUserRatingForCurrentVersion: 4,
               bundleId: 'com.clickgamer.AngryBirds',
               contentAdvisoryRating: '4+',
               currency: 'USD',
               description: 'Use the unique powers of the Angry Birds to destroy the greedy pigs\' defenses!  \n\nThe survival of the Angry Birds is at stake. Dish out revenge on the greedy pigs who stole their eggs. Use the unique powers of each bird to destroy the pigs’ defenses. Angry Birds features challenging physics-based gameplay and hours of replay value. Each level requires logic, skill and force to solve.  \n\nIf you get stuck in the game, you can purchase the Mighty Eagle! Mighty Eagle is a one-time in-app purchase in Angry Birds that gives unlimited use. This phenomenal creature will soar from the skies to wreak havoc and smash the pesky pigs into oblivion. There’s just one catch: you can only use the aid of Mighty Eagle to pass a level once per hour. Mighty Eagle also includes all new gameplay goals and achievements!  \n\nIn addition to the Mighty Eagle, Angry Birds now has power-ups! Boost your birds’ abilities and three-star levels to unlock secret content! Angry Birds now has the following amazing power-ups: Sling Scope for laser targeting, King Sling for maximum flinging power, Super Seeds to supersize your birds, and Birdquake to shake pigs’ defenses to the ground!  \n\nHAVING TROUBLE? Head over to https://support.rovio.com where you can browse FAQs or submit a request to our support flock!\n\n#1 IPHONE PAID APP in US, UK, Canada, Italy, Germany, Russia, Sweden, Denmark, Finland, Singapore, Poland, France, Netherlands, Malta, Greece, Austria, Australia, Turkey, UAE, Saudi Arabia, Israel, Belgium, Norway, Hungary, Malaysia, Luxembourg, Portugal, Czech Republic, Spain, Ireland, Romania, New Zealand, Latvia, Lithuania, Estonia, Nicaragua, Kazakhstan, Argentina, Bulgaria, Slovakia, Slovenia, Mauritius, Chile, Hong Kong, Pakistan, Taiwan, Colombia, Indonesia, Thailand, India, Kenya, Macedonia, Croatia, Macau, Paraguay, Peru, Armenia, Philippines, Vietnam, Jordan and Kuwait.   \n\n#1 IPHONE PAID GAME in more countries than we can count!\n\nTerms of Use: http://www.rovio.com/eula \nPrivacy Policy: http://www.rovio.com/privacy \n\nThis application may require internet connectivity and subsequent data transfer charges may apply.\n\n\nImportant Message for Parents\n\nThis game may include:\n- Direct links to social networking websites that are intended for an audience over the age of 13.\n- Direct links to the internet that can take players away from the game with the potential to browse any web page.\n- Advertising of Rovio products and also products from select partners.\n- The option to make in-app purchases. The bill payer should always be consulted beforehand.',
               features: [Object],
               fileSizeBytes: '71674372',
               fileSizeBytesNumeric: 71674372,
               formattedPrice: '0.99 USD',
               genreIds: [Object],
               genres: [Object],
               ipad: false,
               ipadScreenshotUrls: [],
               iphone: true,
               isGameCenterEnabled: true,
               isVppDeviceBasedLicensingEnabled: true,
               languageCodesISO2A: [Object],
               minimumOsVersion: '6.0',
               price: 0.99,
               primaryGenreId: 6014,
               primaryGenreName: 'Games',
               releaseDate: '2009-12-11T00:00:00+00:00',
               releaseNotes: 'The #1 App of all time turns 6!\nJoin the celebration in 15 all-new levels in the BirdDay episode!',
               screenshotUrls: [Object],
               sellerName: 'Rovio Entertainment Ltd',
               sellerUrl: 'http://www.angrybirds.com/',
               supportedDevices: [Object],
               trackCensoredName: 'Angry Birds',
               trackContentRating: '4+',
               trackId: 343200656,
               trackViewUrl: 'http://itunes.apple.com/app/angry-birds/id343200656?uo=5&at=10l9yE',
               userRatingCount: 822935,
               userRatingCountForCurrentVersion: 802,
               version: '6.0.1'
           }]
        }
    });
```

`search` receives the following arguments:
* query - mandatory, query string for the search (e.g. 'angry birds').
* include_desc - optional. whether or not to include description. default is true.
* limit - optional. limit response items (1-50).
* page - optional. page number (1 - max pages).
* lang - optional, language code. (e.g 'en'). default is 'en'.
* fields - optional. output fields (e.g ['artistId']). Default is all.
* callback - optional. callback function.

##### Advanced Query API

Run an advanced query with multiple filters and sorting for all available app parameters for 
iPhone and iPad apps. Ideal for data analysis and market insights of the Apple App Store™.
See full API documentation [here](https://42matters.com/api/ios/advanced-query-api).

```javascript

// Get the top 10 most rated apps on Apple App Store
var query = {
    "query": {
        "name": "Most Popular Apps",
        "platform": "ios",
        "query_params": {
            "from": 0,
            "num": 100,
            "sort": "userRatingCount",
            "sort_order": "desc"
        }
    }
};

appleStore.query(query)
    .then(function (res) {
        // do something with query result
    });
```

`query` receives the following arguments:
* query - mandatory. Query object. You can design your query JSON [here] (https://42matters.com/app-market-explorer/ios).
* lang - optional, language code. (e.g 'en'). default is 'en'.
* limit - optional. limit response items (1-100).
* page - optional. page number (1 - max pages).
* fields - optional. output fields (e.g ['package_name']). Default is all.
* callback - optional.