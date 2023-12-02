export default function SuccessModal({isOpen, onClose}) {
    return <dialog className="modal" open={isOpen}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
            <button onClick={onClose} className="button">Okay</button>
        </p>
    </dialog>
}