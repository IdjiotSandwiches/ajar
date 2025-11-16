import React from "react";
import DeleteConfirmationView from "./delete-confirmation.view";
import { DeleteConfirmationModalProps } from "@/interfaces/shared";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <DeleteConfirmationView
      onClose={onClose}
      onConfirm={onConfirm}
      description={description}
    />
  );
};

export default DeleteConfirmationModal;
