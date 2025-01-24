import { create } from 'zustand';
import axios from 'axios';

interface Airline {
    AirlineId: string;
    AirlineName: string;
    CmdMessage?: string;
    IATA?: string;
    ICAO?: string;
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

interface LoginResponse {
    Token: string;
    Expiry: string;
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

interface AirlineSaveRequest {
    AirlineId: number;
    Url: string;
    CanonicalTag: string;
    Title: string;
    Description: string;
    Keywords: string;
    AirlineName: string;
    FullName: string;
    Domestic: string;
    International: string;
    IataCode: string;
    IcaoCode: string;
    CallSign: string;
    CheckInUrl: string;
    ImageUrl: string;
    FoundedDate: string;
    BaseHub: string;
    FleetSize: string;
    AvgFleetAge: string;
    Website: string;
    FlightStatusUrl: string;
    Email: string;
    CSNo: string;
    HLNo: string;
    FlightTrackingUrl: string;
    OfficeAddress: string;
    CountryId: number;
    Contents: {
        ContentTypeId: number;
        Content: string;
    }[];
    Fleets: {
        AircraftTypeId: number;
        Total: number;
    }[];
    Routes: {
        Origin: string;
        Destination: string;
        DepartureTime: string;
        ArrivalTime: string;
        Duration: string;
        Flight: string;
        StartingPrice: number;
        CheapestFlight: string;
        HighestSelling: string;
    }[];
    Baggages: {
        ClassTypeId: number;
        FareType: string;
        Luggage: string;
        ChangePolicy: string;
        Addons: string;
    }[];
    Resources: {
        ResourceTypeId: number;
        ResourceUrl: string;
    }[];
    Faqs: {
        Question: string;
        Answer: string;
    }[];
    SessionId: string;
    CreateId: number;
}

interface AirlineStore {
    airlines: Airline[];
    countries: Country[];
    contentTypes: ContentType[];
    loading: boolean;
    error: string | null;
    token: string | null;
    aircraftTypes: AircraftType[];
    airlineClassTypes: AirlineClassType[];
    resourceTypeList: ResourceTypeList[];
    airlineStations: AirlineStation[];
    login: (credentials: { LoginId: string; Password: string; AgencyId: number; MachineId?: string; IPAddress?: string }) => Promise<void>;
    fetchAirlines: () => Promise<void>;
    fetchCountries: () => Promise<void>;
    fetchContentTypes: () => Promise<void>;
    fetchAircraftTypes: () => Promise<void>;
    fetchAirlineClassTypes: () => Promise<void>;
    fetchResourceTypeList: () => Promise<void>;
    fetchAirlineStations: () => Promise<void>;
    saveAirline: (airlineData: AirlineSaveRequest) => Promise<void>;
}

export const useAirlineStore = create<AirlineStore>((set) => ({
    airlines: [],
    countries: [],
    contentTypes: [],
    aircraftTypes: [],
    airlineClassTypes: [],
    resourceTypeList: [],
    airlineStations: [],
    loading: false,
    error: null,
    token: null,

    // Login API
    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('https://api.nixtour.com/api/User/Login', credentials);
            const { Token } = response.data;
            set({ token: Token, loading: false });
            console.log('Login successful, token:', Token);
        } catch (err: any) {
            set({ error: err.message || 'Login failed!', loading: false });
        }
    },

    // Fetch Airlines API
    fetchAirlines: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/Web/AirlineList');
            set({ airlines: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Something went wrong!', loading: false });
        }
    },

    // Fetch Countries API
    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/CountryList');
            set({ countries: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch countries!', loading: false });
        }
    },

    // Fetch Content Types API
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

    // Fetch Airline Class Types API
    fetchAirlineClassTypes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('https://api.nixtour.com/api/List/AirlineClassTypeList');
            set({ airlineClassTypes: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to fetch airline class types!', loading: false });
        }
    },

    // Fetch Resource Type List API
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
    saveAirline: async (airlineData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('https://api.nixtour.com/api/CMS/AirlineSave', airlineData, {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
            });
            console.log('Airline saved successfully:', response.data);
            set({ loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Failed to save airline!', loading: false });
        }
    },
}));
