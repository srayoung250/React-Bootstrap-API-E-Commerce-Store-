export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="cyber-spinner-wrap">
      <div className="cyber-spinner" />
      <p className="cyber-spinner-text">{text}</p>
    </div>
  )
}
