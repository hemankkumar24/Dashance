export interface FormatMoneyOptions {
    compact?: boolean;
    decimals?: number;
}

export const formatMoney = (
    amount: number,
    {
        compact = true,
        decimals = 1,
    }: FormatMoneyOptions = {}
): string => {
    if (!compact) {
        return `₹${amount.toLocaleString("en-IN")}`;
    }

    const abs = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";

    if (abs >= 1e7) {
        return `${sign}₹${(abs / 1e7).toFixed(decimals).replace(/\.0$/, "")}Cr`;
    }

    if (abs >= 1e5) {
        return `${sign}₹${(abs / 1e5).toFixed(decimals).replace(/\.0$/, "")}L`;
    }``

    return `${sign}₹${abs.toLocaleString("en-IN")}`;
};