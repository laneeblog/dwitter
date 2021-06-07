let users = [];

export async function findByUsername(username) {
    return users.find(v => v.username === username);
}

export async function createUser(userSet) {
    const created = {
        ...userSet,
        id: Date.now().toString()
    }
    users.push(created);
    return created.id;
}

export async function findById(id) {
    return users.find(v => v.id === id);
}