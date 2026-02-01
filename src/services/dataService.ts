import type {
    DDJJCSubmission,
    IrrigationRequest,
    NetworkPoint,
    NetworkStats
} from '../types';

const STORAGE_KEYS = {
    DDJJC: 'ddjjc_submissions',
    REQUESTS: 'irrigation_requests',
    NETWORK: 'network_infrastructure',
    METRICS: 'network_metrics'
};

// Initial Mock Data
const MOCK_DDJJC: DDJJCSubmission[] = [
    {
        id: '1',
        producer: 'Juan Pérez',
        period: '2024 - Ciclo 1',
        timestamp: new Date().toISOString(),
        status: 'PENDING',
        plot: 'Lote 14',
        canal: 'Canal Secundario III',
        crops: [
            { lote: 'Lote 14', superficieTotal: '10ha', superficieParcial: '5ha', cultivo: 'Maíz', desde: '2024-01', hasta: '2024-06' }
        ]
    },
    {
        id: '2',
        producer: 'María García',
        period: '2024 - Ciclo 1',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'APPROVED',
        plot: 'Lote 08',
        canal: 'Canal Principal',
        crops: [
            { lote: 'Lote 08', superficieTotal: '25ha', superficieParcial: '25ha', cultivo: 'Alfalfa', desde: '2023-10', hasta: '2024-04' }
        ]
    }
];

const MOCK_NETWORK: NetworkPoint[] = [
    { id: '1', name: 'Bocatoma Principal', type: 'Entrada', zone: 'Norte', status: '1.45m³/s', health: 'good', pressure: '4.2 bar' },
    { id: '2', name: 'Canal Matriz Sur', type: 'Canal', zone: 'Sur', status: '0.92m³/s', health: 'good', pressure: '1.8 bar' },
    { id: '3', name: 'Compuerta Lote 14', type: 'Control', zone: 'Sect. A', status: '0.12m³/s', health: 'warning', pressure: '0.5 bar' },
    { id: '4', name: 'Estación de Bombeo 2', type: 'Bomba', zone: 'Oeste', status: '0.45m³/s', health: 'good', pressure: '6.5 bar' }
];

class DataService {
    private getStorage<T>(key: string, defaultValue: T): T {
        const stored = localStorage.getItem(key);
        if (!stored) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
        return JSON.parse(stored);
    }

    private setStorage<T>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
        // Dispatch event for reactive updates in other tabs/components
        window.dispatchEvent(new Event('storage'));
    }

    // --- DDJJC ---
    getDDJJCSubmissions(): DDJJCSubmission[] {
        return this.getStorage(STORAGE_KEYS.DDJJC, MOCK_DDJJC);
    }

    updateDDJJCStatus(id: string, status: DDJJCSubmission['status']): void {
        const submissions = this.getDDJJCSubmissions();
        const index = submissions.findIndex(s => s.id === id);
        if (index !== -1) {
            submissions[index].status = status;
            this.setStorage(STORAGE_KEYS.DDJJC, submissions);
        }
    }

    submitDDJJC(submission: Omit<DDJJCSubmission, 'id' | 'timestamp' | 'status'>): DDJJCSubmission {
        const submissions = this.getDDJJCSubmissions();
        const newSubmission: DDJJCSubmission = {
            ...submission,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            status: 'PENDING'
        };
        submissions.unshift(newSubmission);
        this.setStorage(STORAGE_KEYS.DDJJC, submissions);
        return newSubmission;
    }

    // --- Irrigation Requests ---
    getIrrigationRequests(): IrrigationRequest[] {
        return this.getStorage(STORAGE_KEYS.REQUESTS, []);
    }

    createIrrigationRequest(request: Omit<IrrigationRequest, 'id' | 'timestamp' | 'status'>): IrrigationRequest {
        const posts = this.getIrrigationRequests();
        const newRequest: IrrigationRequest = {
            ...request,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            status: 'PENDING'
        };
        posts.unshift(newRequest);
        this.setStorage(STORAGE_KEYS.REQUESTS, posts);
        return newRequest;
    }

    // --- Network ---
    getNetworkInfrastructure(): NetworkPoint[] {
        return this.getStorage(STORAGE_KEYS.NETWORK, MOCK_NETWORK);
    }

    getNetworkStats(): NetworkStats {
        return this.getStorage(STORAGE_KEYS.METRICS, {
            totalFlow: '1.45 m³/s',
            activePoints: '24 / 24',
            currentConsumption: '0.88 m³/s',
            efficiency: '96.4%'
        });
    }
}

export const dataService = new DataService();
