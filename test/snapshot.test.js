const {execFile} = require('child_process');

/**
 * Run jest using a given configfile and the args, and return the
 * stderr (all reporters go to stderr).
 * 
 * The configfile should be specified relative to the fixtures 
 * directory, so just the filename will suffice.
 * 
 * This assumes it is being run from the top-level directory of
 * this project and hardcodes a path to jest.
 */
function runJest(configFile, ...args) {
    return new Promise(resolve => {
        execFile('node_modules/.bin/jest', ['-c', "test/fixture/"+configFile, ...args], (err, stdout, stderr) => {
            let code = err ? err.code : 0;
            stderr = fuzzOutput(stderr);
            resolve({code, stdout, stderr});
        });
    });
}

/**
 * Alter the outout to make it stable from run to run.
 * We remove all outoput from the jest default reporters,
 * because the order of tests is impossible to force.
 * @param {String} output 
 */
function fuzzOutput(output) {
    return output.replace(/[\s\S]+Ran all test suites.*?$/m, '');
}

describe('with default configuration', async () => {
    it('runs tests showing failures at end', async () => {
        const result = await runJest('jest-summary.config.json');
        expect(result).toMatchSnapshot();
    });    
    it('final message indicates when tests all pass', async () => {
        const result = await runJest('jest-summary.config.json', '-t', 'pass');
        expect(result).toMatchSnapshot();
    });    
});
describe('with failuresOnly=false configuration', async () => {
    it('runs tests showing all tests at end', async () => {
        const result = await runJest('jest-summary-all.config.json');
        expect(result).toMatchSnapshot();
    });
});
describe('when misconfigured to be only reporter', async () => {
    it('runs tests and returns code=1', async () => {
        const result = await runJest('jest-summary-only.config.json');
        expect(result).toMatchSnapshot();
        expect(result.code).toEqual(1);
    });
});
