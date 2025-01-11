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

interface LoginResponse {
    Token: string;
    Expiry: string;
}

interface AirlineStore {
    airlines: Airline[];
    loading: boolean;
    error: string | null;
    token: string | null;
    login: (credentials: { LoginId: string; Password: string; AgencyId: number; MachineId?: string; IPAddress?: string }) => Promise<void>;
    fetchAirlines: () => Promise<void>;
}

export const useAirlineStore = create<AirlineStore>((set) => ({
    airlines: [],
    loading: false,
    error: null,
    token: null,

    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('http://api.nixtour.com/api/CMS/Login', credentials);
            const { Token } = response.data;
            set({ token: Token, loading: false });
            console.log('Login successful, token:', Token);
        } catch (err: any) {
            set({ error: err.message || 'Login failed!', loading: false });
        }
    },

    fetchAirlines: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://api.nixtour.com/api/CMS/AirlineList?airlineType=I');
            set({ airlines: response.data.Data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Something went wrong!', loading: false });
        }
    },
}));
