export function nodeValue(node) {
    if (!node)
        return null
    return node['#text'] || node['#cdata-section']
}