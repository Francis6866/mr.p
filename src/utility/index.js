export const BaseUrl = "http://localhost:3000/api/v1"

export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const ageFromDate = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const Month = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('en-US', { month: 'long' });
}

export const Day = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.getDate();
}