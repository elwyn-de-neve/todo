function formatDate(dateString) {
    // We moeten de string eerst terug omzetten naar een date-format
    const date = new Date(dateString);

    // Dan kunnen we alle juiste getallen eruit halen
    const year = date.toLocaleDateString('default', { year: "numeric"});
    const month = date.toLocaleDateString('default', { month: "2-digit"});
    const day = date.toLocaleDateString('default', { day: "2-digit"});

    // ... en vervolgens aan elkaar plakken op de manier waarop het date-veld dit wil ontvangen
    return `${year}-${month}-${day}`;
}

export default formatDate;