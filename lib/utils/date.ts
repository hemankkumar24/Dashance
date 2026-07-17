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

export function getLastUpdatedText(date: Date): string {
    const now = new Date();

    const sameDay =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (sameDay) {
        return "Last updated today";
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
        return "Last updated yesterday";
    }

    return `Last updated ${date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })}`;
}