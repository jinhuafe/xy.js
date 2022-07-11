export function getStep(len) {
    if (len > 100) return [20, 0]
    if (len > 50) return [5, 0]
    if (len > 20) return [2, 0]
    if (len > 5) return [1, 0]
    // if (len > 5) return [0.5, 1]
    if (len > 2) return [0.2, 1]
    if (len > 1) return [0.1, 1]
    if (len > 0.5) return [0.05, 2]
    if (len > 0.1) return [0.02, 2]
    return [0.01, 2]
}
