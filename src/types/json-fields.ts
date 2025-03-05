export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface Social {
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
  googleMyBusiness?: string;
}

export interface ManyChatFlows {
  confirmationPresenceRequest?: string;
}

export interface Credentials {
  manychatApiKey?: string;
}

export interface Channels {
  telegram?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface UTM {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

export interface Cancellation {
  canceledBy?: string;
  cancelerType?: string;
  reason?: string;
}

export interface AppointmentDetails {
  appointmentId: number;
  serviceName: string;
  serviceId: number;
  date: Date;
  rescheduleUrl?: string;
  cancellation?: Cancellation;
}

export type WhatsappMessageType =
  | 'text'
  | 'image'
  | 'document'
  | 'audio'
  | 'video';

export interface WhatsappMessage {
  type: WhatsappMessageType;
  text?: string;
  transcription?: string;
  resume?: string;
  mediaUrl?: string;
  mediaName?: string;
}

// Helper type for Business model
export interface BusinessJsonFields {
  address?: Address;
  social?: Social;
  manyChatFlows?: ManyChatFlows;
  credentials?: Credentials;
}

// Helper type for Contact model
export interface ContactJsonFields {
  address?: Address;
  channels?: Channels;
}

// Helper type for Activity model
export interface ActivityJsonFields {
  utm?: UTM;
  appointmentDetails?: AppointmentDetails;
  whatsappMessage?: WhatsappMessage;
}
