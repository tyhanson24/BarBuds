export interface LSIResult {
  value: number
  status: 'green' | 'amber' | 'red'
  label: string
}

export function calcLSI(surgical: number | undefined, nonSurgical: number | undefined, lowerIsBetter = false): LSIResult | null {
  if (surgical === undefined || nonSurgical === undefined) return null
  if (surgical <= 0 || nonSurgical <= 0) return null
  const value = lowerIsBetter
    ? Math.round((nonSurgical / surgical) * 1000) / 10
    : Math.round((surgical / nonSurgical) * 1000) / 10
  const status: LSIResult['status'] = value >= 95 ? 'green' : value >= 80 ? 'amber' : 'red'
  return { value, status, label: `${value.toFixed(0)}%` }
}

export function lsiColorClass(status: LSIResult['status']): string {
  return status === 'green' ? 'text-signal-green' : status === 'amber' ? 'text-signal-amber' : 'text-signal-red'
}
