import chalkAnimation from 'chalk-animation';

export const animationKaraoke = async (text, duration = 2000) => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const animation = chalkAnimation.karaoke(text);
    await sleep(duration);
    animation.stop();
};
