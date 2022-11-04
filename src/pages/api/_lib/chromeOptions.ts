import chrome from 'chrome-aws-lambda';

const chromeExecPaths: any = {
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
};

const exePath = chromeExecPaths[process.platform];

interface IOptions {
  args: string[],
  executablePath: string,
  headless: boolean,
};

export default async function getOptions(isDev: boolean): Promise<IOptions> {
  let options: IOptions;

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: false,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
};