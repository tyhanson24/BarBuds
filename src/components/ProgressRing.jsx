export default function ProgressRing({ completed, total }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? (completed / total) * circumference : 0;
  const offset = circumference - progress;

  return (
    <div className="progress-ring">
      <svg width="52" height="52">
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="3"
        />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="progress-ring-text">
        <span>{completed}</span>
        <span className="progress-ring-sub">/{total}</span>
      </div>
    </div>
  );
}
