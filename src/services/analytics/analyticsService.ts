export interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, any>;
  timestamp: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  trackEvent(eventName: string, params?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      params,
      timestamp: new Date().toISOString()
    };
    this.events.push(event);
    console.log(`[Analytics Tracked]`, eventName, params || {});
  }

  getEvents() {
    return this.events;
  }
}

export const analytics = new AnalyticsService();
