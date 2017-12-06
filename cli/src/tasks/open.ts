import { Config } from '../config';
import { logFatal, runTask } from '../common';
import { openAndroid } from '../android/open';
import { openIOS } from '../ios/open';


export async function openCommand(config: Config, selectedPlatform: string) {
  const platformName = await config.askPlatform(
    selectedPlatform,
    `Please choose a platform to open:`
  );

  try {
    await open(config, platformName);

  } catch (e) {
    logFatal(e);
  }
}


export async function open(config: Config, platformName: string) {
  if (platformName === config.ios.name) {
    await runTask('Opening the xcode workspace...', () => {
      return openIOS(config);
    });

  } else if (platformName === config.android.name) {
    await runTask('Opening the Android project...', () => {
      return openAndroid(config);
    });

  } else {
    throw `Platform ${platformName} is not valid.`;
  }
}
