export function downloadCodeHandler(code, extension) {
    const languageMapping = {
        '.cpp': { mimeType: 'text/x-c++src', fileExtension: 'cpp' },
        '.java': { mimeType: 'text/x-java-source', fileExtension: 'java' },
        '.py': { mimeType: 'text/x-python', fileExtension: 'py' },
        '.js': { mimeType: 'application/javascript', fileExtension: 'js' },
        '.go': { mimeType: 'text/x-go', fileExtension: 'go' },
    };

    const { mimeType = 'text/plain', fileExtension = 'txt' } =
        languageMapping[extension] || {};

    if (!mimeType) {
        console.error('Unsupported language extension ' + extension);
        return;
    }

    const blob = new Blob([code], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `main.${fileExtension}`;
    link.click();
}
