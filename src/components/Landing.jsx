export default function Landing({ onGetStarted }) {
  return (
    <div className="landing">
      <h1 className="logo">
        WILL<span className="logo-accent">FIT</span>
      </h1>
      <p className="tagline">Will's road back to fit.</p>
      <button className="btn-primary" onClick={onGetStarted}>
        GET STARTED
      </button>
    </div>
  );
}
