import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const planetWidth = screenWidth * 0.28;
export const ringWidth = screenWidth * 0.45;
export const ring2Width = screenWidth * 0.4;

export const colorOfPlanet = '#E75582';
export const colorOfRing1 = '#EC90AD';
export const colorOfRing2 = '#F5C6D6';

const starPositionList1 = Array(60)
  .fill([0, 0])
  .map(() => [Math.random() * screenWidth, Math.random() * screenHeight * 0.2]);
const starPositionList2 = Array(60)
  .fill([0, 0])
  .map(() => [Math.random() * screenWidth, Math.random() * screenHeight * 0.6]);

export const starPositionList = [...starPositionList1, ...starPositionList2];

export const avatarPositionList = [
  ['7%', '25%', 2],
  ['40%', '12%', 1],
  ['73%', '25%', 1],
  ['15%', '72%', 1],
  ['66%', '72%', 2],
];
