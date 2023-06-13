export function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}