type City = {
    name: string;
    pkId: number;
    latitude: number;
    longitude: number;
};

type Station = {
    stationId: number;
    name: string;
    latitude: number;
    longitude: number;
};

type CityName = {
    cityNameId: number;
    cityName: string;
    language: string;
};

type IndexMappings = {
    cityName: string;
    language: string;
    city: City
};