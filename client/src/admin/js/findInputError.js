export function findInputError(error, name) {
    const filtered = Object.keys(error)
    .filter(key => key.includes(name))
    .reduce((cur, key) =>{
        return Object.assign(cur, {error: error[key]})
    }, {})
    return filtered
}
