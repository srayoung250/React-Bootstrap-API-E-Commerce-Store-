import { Modal } from 'react-bootstrap'

export default function DeleteModal({ show, onHide, onConfirm, loading }) {
  return (
    <Modal show={show} onHide={onHide} centered className="cyber-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Confirm Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        <p
          style={{
            marginTop: 12,
            fontSize: '.78rem',
            color: 'var(--text-muted)',
            background: 'rgba(0,229,255,.06)',
            border: '1px solid rgba(0,229,255,.18)',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          ℹ️ FakeStoreAPI will confirm the deletion, but the product will remain in the
          API — this is expected mock-API behaviour.
        </p>
      </Modal.Body>

      <Modal.Footer style={{ gap: 10 }}>
        <button className="btn-cyber btn-cyber-secondary" onClick={onHide} disabled={loading}>
          Cancel
        </button>
        <button className="btn-cyber btn-cyber-danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting…' : 'Delete Product'}
        </button>
      </Modal.Footer>
    </Modal>
  )
}
