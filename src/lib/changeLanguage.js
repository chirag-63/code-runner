const { defaultFile } = require('@/components/codeEditor/SampleCode');

export function changeLanguage(
    newLanguage,
    setLanguage,
    setExtension,
    setCode,
    setInput,
    setOutput,
) {
    setLanguage(newLanguage);
    setExtension(defaultFile[newLanguage].extension);
    setCode(defaultFile[newLanguage].content);
    setInput('');
    setOutput('');
    localStorage.setItem('PreferredLanguage', newLanguage);
}
