import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
export interface DeleteButtonProps {
    title?: string;
    onDelete?: string;
    className?: string;

}
const DeleteButton = ({ onDelete, tittle, className }: any) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        onDelete();
        setShowModal(false);
    };

    return (
        <>
            <button className={className} onClick={() => setShowModal(true)} >
                {tittle} <BsTrash className="text-red-500 cursor-pointer" />
            </button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="text-black" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" className="text-black" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteButton;
