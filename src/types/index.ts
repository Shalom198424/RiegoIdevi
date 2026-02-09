// Core Entities
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'PRODUCER';
    avatar?: string;
}

// DDJJC (Declaración Jurada de Justicia de Cultivos)
export interface CropEntry {
    lote: string;
    superficieTotal: string;
    superficieParcial: string;
    cultivo: string;
    desde: string;
    hasta: string;
}

export type DDJJCStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DDJJCSubmission {
    id: string;
    producer: string;
    period: string;
    crops: CropEntry[];
    timestamp: string;
    status: DDJJCStatus;
    plot: string;
    canal: string;
}

// Irrigation Requests
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface IrrigationRequest {
    id: string;
    producerId: string;
    parcelId: string;
    parcelName: string;
    date: string;
    duration: number; // in hours
    flow: number; // in L/s
    status: RequestStatus;
    timestamp: string;
}

// Network Infrastructure
export type PointHealth = 'good' | 'warning' | 'idle';

export interface NetworkPoint {
    id: string;
    name: string;
    type: string;
    zone: string;
    status: string; // e.g., "1.45m³/s"
    health: PointHealth;
    pressure: string;
}

// Notifications
export type NotificationType = 'SUCCESS' | 'WARNING' | 'INFO' | 'ALERT';

export interface AppNotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    timestamp: string;
    link?: string;
}

// Stats & Metrics
export interface NetworkStats {
    totalFlow: string;
    activePoints: string;
    currentConsumption: string;
    efficiency: string;
}

// Weather
export interface WeatherInfo {
    temp: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    forecast: Array<{
        day: string;
        temp: number;
        condition: string;
    }>;
}
