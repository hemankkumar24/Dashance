export function formatMonth(
    month: number,
    year: number
): string {
    return new Date(year, month)
        .toLocaleString("en-IN", {
            month: "short",
            year: "2-digit",
        })
        .toUpperCase();
}