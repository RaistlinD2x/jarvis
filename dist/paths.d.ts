/** Pack root: dist/../pack when built, or repo pack/ when running via tsx from src/ */
export declare function packRoot(): string;
export declare function projectJarvisDir(cwd: string): string;
export declare function ensureDir(path: string): void;
export declare function writeFileEnsured(path: string, content: string): void;
export declare function readText(path: string): string;
export declare function tryReadText(path: string): string | null;
export declare function sha256(content: string): string;
export declare function listFilesRecursive(dir: string): string[];
export declare function removeFileIfExists(path: string): boolean;
