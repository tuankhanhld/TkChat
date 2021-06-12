export interface Imessage {
  id: string;
  messageContent: string;
  date: string;
  isRead: boolean;
  messageType: 'BINARY' | 'TEXT';
  allowDownload?: boolean;
}
