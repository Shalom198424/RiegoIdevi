import type {
    DDJJCSubmission,
    IrrigationRequest,
    NetworkPoint,
    NetworkStats,
    AppNotification
} from '../types';

const STORAGE_KEYS = {
    DDJJC: 'ddjjc_submissions',
    REQUESTS: 'irrigation_requests',
    NETWORK: 'network_infrastructure',
    METRICS: 'network_metrics',
    NOTIFICATIONS: 'user_notifications'
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
    }
];

const MOCK_REQUESTS: IrrigationRequest[] = [
    {
        id: 'req_1',
        producerId: 'producer_1',
        parcelId: 'p1',
        parcelName: 'Lote 14 - Sector A',
        date: '2024-02-05',
        flow: 120,
        duration: 8,
        status: 'PENDING',
        timestamp: new Date().toISOString()
    }
];

const MOCK_NETWORK: NetworkPoint[] = [
    { id: '1', name: 'Bocatoma Principal', type: 'Entrada', zone: 'Norte', status: '1.45m³/s', health: 'good', pressure: '4.2 bar' },
    { id: '2', name: 'Canal Matriz Sur', type: 'Canal', zone: 'Sur', status: '0.92m³/s', health: 'good', pressure: '1.8 bar' },
    { id: '3', name: 'Compuerta Lote 14', type: 'Control', zone: 'Sect. A', status: '0.12m³/s', health: 'warning', pressure: '0.5 bar' }
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

            this.createAppNotification({
                userId: submissions[index].producer,
                title: status === 'APPROVED' ? 'DDJJC Aprobada' : 'DDJJC Rechazada',
                message: `Tu declaración para ${submissions[index].plot} ha sido ${status === 'APPROVED' ? 'aprobada' : 'rechazada'}.`,
                type: status === 'APPROVED' ? 'SUCCESS' : 'ALERT',
                link: '/producer/history'
            });
        }
    }

    // --- Irrigation Requests ---
    getIrrigationRequests(): IrrigationRequest[] {
        return this.getStorage(STORAGE_KEYS.REQUESTS, MOCK_REQUESTS);
    }

    updateIrrigationStatus(id: string, status: IrrigationRequest['status']): void {
        const requests = this.getIrrigationRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index].status = status;
            this.setStorage(STORAGE_KEYS.REQUESTS, requests);

            this.createAppNotification({
                userId: requests[index].producerId,
                title: status === 'APPROVED' ? 'Riego Programado' : 'Riego Rechazado',
                message: `Tu solicitud para ${requests[index].parcelName} ha sido ${status === 'APPROVED' ? 'aprobada' : 'rechazada'}.`,
                type: status === 'APPROVED' ? 'SUCCESS' : 'ALERT',
                link: '/producer/history'
            });
        }
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

    // --- AppNotifications ---
    getAppNotifications(): AppNotification[] {
        return this.getStorage(STORAGE_KEYS.NOTIFICATIONS, [
            {
                id: 'n1',
                userId: 'all',
                title: 'Bienvenido a RiegoFlow',
                message: 'Sistema actualizado a la versión 1.2',
                type: 'INFO',
                isRead: false,
                timestamp: new Date(Date.now() - 3600000).toISOString()
            }
        ]);
    }

    createAppNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>): void {
        const notifications = this.getAppNotifications();
        const newAppNotification: AppNotification = {
            ...notification,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            isRead: false
        };
        notifications.unshift(newAppNotification);
        this.setStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }

    markAllAppNotificationsAsRead(): void {
        const notifications = this.getAppNotifications();
        notifications.forEach(n => n.isRead = true);
        this.setStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
}

export const dataService = new DataService();
