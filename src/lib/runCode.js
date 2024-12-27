import { executeCode } from '../../actions/OnlineJudge';

export async function RunCodeHandler(
    setLoadingOutput,
    setOutput,
    language,
    code,
    input,
) {
    try {
        setLoadingOutput(true);
        const response = await executeCode(language, code, input);
        setOutput(response.run.output);
        // console.log(response.run.output)
    } catch (error) {
        // console.error("Error executing code:", error);
        throw error;
    } finally {
        setLoadingOutput(false);
    }
}
