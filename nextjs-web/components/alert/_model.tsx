export interface IAlertMessage {
  openState: boolean;
  description: string;
  alertSuccess: boolean;
  onClose: () => void;
}
