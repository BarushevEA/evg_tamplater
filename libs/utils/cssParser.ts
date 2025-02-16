/**
 * Parses a single CSS block and extracts styles.
 * Note: This function only correctly handles one CSS block. Multiple blocks or nested selectors will not be parsed correctly.
 */

export function parseCssBlock(cssString: string): Partial<CSSStyleDeclaration> {
    const style: Partial<CSSStyleDeclaration> = {};
    let openBracketIndex = cssString.indexOf("{");
    let closeBracketIndex = cssString.lastIndexOf("}");

    if (openBracketIndex !== -1 && closeBracketIndex !== -1) {
        cssString = cssString.substring(openBracketIndex + 1, closeBracketIndex);
    }

    const rules = cssString.split(';');

    for (const rule of rules) {
        const trimmedRule = rule.trim();
        if (trimmedRule) {
            const [property, value] = trimmedRule.split(':');
            if (property && value) {
                const camelCaseProperty = property.trim().replace(/-\w/g, (match) => match[1].toUpperCase());
                style[camelCaseProperty] = value.trim();
            }
        }
    }

    return style;
}
