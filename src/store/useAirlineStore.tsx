import { create } from 'zustand';
import axios from 'axios';

interface Airline {
    AirlineType: string;
    IataCode: any;
    IcaoCode: any;
    AirlineId: string;
    AirlineName: string;
    CallSign?: string;
}

interface Country {
    CountryId: string;
    CountryName: string;
}

interface ContentType {
    ContentTypeId: string;
    ContentTypeName: string;
}

interface AircraftType {
    AircraftTypeId: string;
    AircraftTypeName: string;
}

interface AirlineClassType {
    ClassId: number;
    ClassName: string;
}

interface ResourceTypeList {
    ResourceTypeId: string;
    ResourceTypeName: string;
}

interface AirlineStation {
    StationId: number;
    StationName: string;
    AirportCode: string;
    CountryName: string;
}

interface City {
    CityName: string;
    CountryName: string;
    AirportName: string;
    AirportCode: string;
    CountryCode: string;
    ProvinceCode: string;
    ProvinceName: string;
    IsCity: boolean;
}

interface UploadImageResponse {
    Data: string;
}

interface AirlineStore {
    airlines: Airline[];
    countries: Country[];
    contentTypes: ContentType[];
    aircraftTypes: AircraftType[];
    airlineClassTypes: AirlineClassType[];
    resourceTypeList: ResourceTypeList[];
    airlineStations: AirlineStation[];
    cities: City[];
    loading: boolean;
    error: string | null;
    SessionId: string | null;
    login: (credentials: { LoginId: string; Password: string; AgencyId: number; MachineId?: string; IPAddress?: string }) => Promise<void>;
    fetchAirlines: () => Promise<void>;
    fetchCountries: () => Promise<void>;
    fetchContentTypes: () => Promise<void>;
    fetchAircraftTypes: () => Promise<void>;
    fetchAirlineClassTypes: () => Promise<void>;
    fetchResourceTypeList: () => Promise<void>;
    fetchAirlineStations: () => Promise<void>;
    fetchCities: (prefix: string) => Promise<void>;
    uploadImage: (file: File) => Promise<{ CmdStatus: number; ImageName?: string; CmdMessage?: string }>
}

export const useAirlineStore = create<AirlineStore>((set) => ({
    airlines: [],
    countries: [],
    contentTypes: [],
    aircraftTypes: [],
    airlineClassTypes: [],
    resourceTypeList: [],
    airlineStations: [],
    cities: [],
    loading: false,
    error: null,
    SessionId: null,



    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('https://api.nixtour.com/api/Login/Login', credentials);
            const SessionId = response.data.Data.SessionId;
            localStorage.setItem('SessionId', SessionId);
            localStorage.setItem('UserName', response.data.Data.UserName);
            localStorage.setItem('AgencyName', response.data.Data.AgencyName);
            set({ SessionId: SessionId, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Login failed!', loading: false });
        }
    },

    fetchAirlines: async () => {
        set({ loading: true, error: null });
        try {
            const sessionId = localStorage.getItem('SessionId') || 'syst';
            const response = await axios.get(`https://api.nixtour.com/api/CMS/AirlineSearch`, {
                params: { SessionId: sessionId },
                headers: {
                    'accept': 'text/plain',
                },
            });
            set({ airlines: response.data.Data, loading: false });
        } catch (err: any) {
            console.error("Error fetching airlines:", err.response?.data || err.message);
            set({
                error: err.response?.data || { message: 'Something went wrong!' },
                loading: false,
            });
        }
    },

    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/CountryList');
            set({ countries: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch countries!', loading: false });
        }
    },

    fetchContentTypes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/ContentTypeList');
            set({ contentTypes: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch content types!', loading: false });
        }
    },

    fetchAircraftTypes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/AircraftTypeList');
            set({ aircraftTypes: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch aircraft types!', loading: false });
        }
    },

    fetchAirlineClassTypes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/AirlineClassTypeList');
            set({ airlineClassTypes: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch airline class types!', loading: false });
        }
    },

    fetchResourceTypeList: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/ResourceTypeList');
            set({ resourceTypeList: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch resource type list!', loading: false });
        }
    },

    fetchAirlineStations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/AirlineStationList');
            set({ airlineStations: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch airline stations!', loading: false });
        }
    },

    fetchCities: async (prefix) => {
        set({ loading: true, error: null });
        try {
            const url = `https://fares.nixtour.com/Online3s/Services/MainService.asmx/GetCities?strInputXML=%3CGetCities%3E%3CCompCode%3EKN2182%3C/CompCode%3E%3CPrefix%3E${encodeURIComponent(
                prefix
            )}%3C/Prefix%3E%3CLangCode%3EGB%3C/LangCode%3E%3CProduct%3EAIR%3C/Product%3E%3CCountryCode%3E%3C/CountryCode%3E%3C/GetCities%3E`;

            const response = await axios.get(url, { headers: { 'Content-Type': 'text/xml' } });
            const regex = /<string[^>]*>(.*?)<\/string>/;
            const match = response.data.match(regex);

            if (match && match[1]) {
                const citiesJsonString = match[1].replace(/([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"');
                const cities = JSON.parse(citiesJsonString) || [];
                set({ cities: cities, loading: false });
            } else {
                set({ cities: [], loading: false, error: 'No city data found in the response.' });
            }
        } catch (err: any) {
            set({
                cities: [],
                loading: false,
                error: err.message || 'Failed to fetch cities!',
            });
        }
    },
    uploadImage: async (file: File) => {
        set({ loading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post("https://api.nixtour.com/api/Image/Upload", formData, {
                headers: {
                    accept: "text/plain",
                    "Content-Type": "multipart/form-data",
                },
            });

            set({ loading: false });

            if (response.data.Data && response.data.Data.CmdStatus === 1 && response.data.Data.ImageName) {
                console.log("Uploaded Image Name:", response.data.Data.ImageName);
                return {
                    CmdStatus: 1,
                    ImageName: response.data.Data.ImageName, // Updated key
                    CmdMessage: "Image uploaded successfully",
                };
            } else {
                return {
                    CmdStatus: 0,
                    CmdMessage: response.data.Data.CmdMessage || "Image upload failed",
                };
            }
        } catch (err: any) {
            set({ error: err.message || "Image upload failed!", loading: false });
            return {
                CmdStatus: 0,
                CmdMessage: err.message || "Image upload failed",
            };
        }
    }
}));

