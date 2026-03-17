export default function Landing({ onGetStarted }) {
  return (
    <div className="landing">
      <h1 className="logo">
        BAR<span className="logo-accent">BUDS</span>
      </h1>
      <p className="tagline">Push. Pull. Train with your crew.</p>
      <button className="btn-primary" onClick={onGetStarted}>
        GET STARTED
      </button>
    </div>
  );
}
