export declare function compileCursorRule(opts: {
    description: string;
    alwaysApply: boolean;
    globs?: string;
    body: string;
}): string;
export declare function compileClaudeRule(opts: {
    description?: string;
    paths?: string[];
    body: string;
}): string;
