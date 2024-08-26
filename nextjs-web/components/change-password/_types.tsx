export interface IChangePassword {
  newPassword: string;
  password: string;
}

export interface IChangePasswordModal {
  openState: boolean;
  onClose: () => void;
}
