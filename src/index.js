let dusts = [];
let planet;

let lastFrequencyLevel = 0;
const threshold = 10;
const frameRateDiv = document.getElementsByClassName('frame-rate')[0];

addDust = (angle) => {
  // 粒子参数配置
  dusts.push(new Dust({
    radius: random(0.5, 0.9),
    pos: planet.pos.copy().add(createVector(planet.radius * cos(angle), planet.radius * sin(angle))),
    dir: createVector(cos(angle + random(-PI / 2, PI / 2)), sin(angle + random(-PI / 2, PI / 2))),
    flyV: random(0.4, 0.8), // 飞行速度
    fadeV: 6, //颜色变淡速度
    color: color(colorboard.dust),
    alpha: 255
  }));
}

getFrequencyLevel = () => {
  const frequencyArr = analyseFrequency();

  let level = 0;
  if(frequencyArr.length !== 0) {
    for(let i = 0; i < 32; i++) {
      level += frequencyArr[i];
    }
    level /= 32;
  }

  return level;
}

setup = () => {
  createCanvas(windowWidth, windowHeight);
  // 中间那个大⭐
  planet = new Planet({
    radius: 150,
    pos: createVector(windowWidth / 2, windowHeight / 2),
    color: color(colorboard.planet)
  });
}

draw = () => {
  background(color(colorboard.background));

  const frequencyLevel = getFrequencyLevel();
  // 粒子数量
  // 若频率突变，即两帧频率相差大于阈值，产生500个粒子，形成爆发效果
  // 反之频率与粒子数量成正比
  // map()即映射
  // map(x, 0, 10, 0, 20) 即 把x这个在0-10区间上的值均匀映射到0-20的区间上
  // 此处 0 <= frequencyLevel <= 255，因此当frequencyLevel为0时dustNum为0，当frequencyLevel为255的时候dustNum为50
  const dustNum = frequencyLevel - lastFrequencyLevel > threshold ? 500 : map(frequencyLevel, 0, 255, 0, 50);
  for(let i = 0; i < dustNum; i++) {
    addDust(random(0, PI * 2));
  }
  lastFrequencyLevel = frequencyLevel;

  planet.draw();

  dusts.forEach((dust, index) => {
    dust.draw();

    if(dust.isDead) {
      dusts.splice(index, 1);
    }
  });

  frameRateDiv.innerHTML = frameRate();
}