export interface IModalInfo {
  title: string;
  description: string;
}

export interface IDeleteModal {
  openState: boolean;
  onClose: () => void;
  onDeleteClick: () => void;
  modalInfo: IModalInfo;
}
