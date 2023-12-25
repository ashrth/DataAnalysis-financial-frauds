const names = ['junaid', 'abu', 'sonu', 'deepak', 'subhash', 'sahil'];

export function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}