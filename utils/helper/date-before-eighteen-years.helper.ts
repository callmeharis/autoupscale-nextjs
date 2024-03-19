
export function dateBeforeEighteenYears() {
    const today = new Date()
    return new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    ).toISOString().split("T")[0]
}