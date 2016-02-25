var _ = require('lodash');

const V1 = {
    version: "1",
    protocol: "https",
    hostname : "42matters.com",
    pathname: "api",
    dateformat: "dd-mm-YYYY",
    limitRange: _.range(1, 101)
};

const GoogleAPI = {
    categories: {
        "APPS": "All",
        "GAMES": "All games",
        "BOOKS_AND_REFERENCE": "Books & Reference",
        "BUSINESS": "Business",
        "COMICS": "Comics",
        "COMMUNICATION": "Communication",
        "EDUCATION": "Education",
        "ENTERTAINMENT": "Entertainment",
        "FINANCE": "Finance",
        "HEALTH_AND_FITNESS": "Health & Fitness",
        "LIFESTYLE": "Lifestyle",
        "MEDIA_AND_VIDEO": "Media & Video",
        "MEDICAL": "Medical",
        "MUSIC_AND_AUDIO": "Music & Audio",
        "NEWS_AND_MAGAZINES": "News & Magazines",
        "PERSONALIZATION": "Personalization",
        "PHOTOGRAPHY": "Photography",
        "PRODUCTIVITY": "Productivity",
        "SHOPPING": "Shopping",
        "SOCIAL": "Social",
        "SPORTS": "Sports",
        "TOOLS": "Tools",
        "TRANSPORTATION": "Transportation",
        "TRAVEL_AND_LOCAL": "Travel & Local",
        "WEATHER": "Weather",
        "LIBRARIES_AND_DEMO": "Libraries & Demo",
        "GAME_ARCADE": "Arcade",
        "GAME_PUZZLE": "Puzzle",
        "GAME_CARD": "Cards",
        "GAME_CASUAL": "Casual",
        "GAME_RACING": "Racing",
        "GAME_SPORTS": "Sport Games",
        "GAME_ACTION": "Action",
        "GAME_ADVENTURE": "Adventure",
        "GAME_BOARD": "Board",
        "GAME_CASINO": "Casino",
        "GAME_EDUCATIONAL": "Educational",
        "GAME_FAMILY": "Family",
        "GAME_MUSIC	Music": "Games",
        "GAME_ROLE_PLAYING": "Role Playing",
        "GAME_SIMULATION": "Simulation",
        "GAME_STRATEGY": "Strategy",
        "GAME_TRIVIA": "Trivia",
        "GAME_WORD": "Word Games",
        "APP_WALLPAPER": "App Wallpaper",
        "APP_WIDGETS": "App Widgets",
        "ANDROID_WEAR": "Android Wear",
        "FAMILY": "Family All Ages",
        "FAMILY_UNDER_5": "Family Ages 5 & Under",
        "FAMILY_6_TO_8": "Family Ages 6-8",
        "FAMILY_9_AND_UP": "Family Ages 9 & Up",
        "FAMILY_ACTION": "Family Action",
        "FAMILY_BRAINGAMES": "Family Brain Games",
        "FAMILY_CREATE": "Family Create",
        "FAMILY_EDUCATION": "Family Education",
        "FAMILY_MUSICVIDEO": "Family Music & Video",
        "FAMILY_PRETEND": "Family Pretend Play"
    }
};


module.exports = {
    V1: V1,
    GoogleAPI: GoogleAPI
};