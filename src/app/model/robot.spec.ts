import { Robot } from './robot';
import { RobotResponse } from './common';

describe('Robot', () => {
  it('should create robot', () => {
    const robot = new Robot();
    expect(robot).toBeTruthy();
  });

  it('invalid place command should throw error', () => {
    const robot = new Robot();
    const response: RobotResponse = robot.place('-1,f,3');
    expect(response.isError).toBeTruthy();
  });

  it('valid place command should not throw error', () => {
    const robot = new Robot();
    const response: RobotResponse = robot.place('1,1,NORTH');
    expect(response.isSuccess).toBeTruthy();
  });

  it('valid place command should return position', () => {
    const robot = new Robot();
    const response: RobotResponse = robot.place('1,1,NORTH');
    expect(response.successMsg).toEqual('1,1,NORTH');
  });

  it('place command should not be case sensetive', () => {
    const robot = new Robot();
    const response: RobotResponse = robot.place('1,1,north');
    expect(response.successMsg).toEqual('1,1,NORTH');
  });

  it('north facing robot must move north', () => {
    const robot = new Robot();
    robot.place('1,1,north');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('1,2,NORTH');
  });

  it('east facing robot must move east', () => {
    const robot = new Robot();
    robot.place('1,1,east');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('2,1,EAST');
  });

  it('south facing robot must move south', () => {
    const robot = new Robot();
    robot.place('1,1,south');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('1,0,SOUTH');
  });

  it('west facing robot must move west', () => {
    const robot = new Robot();
    robot.place('1,1,west');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('0,1,WEST');
  });

  it('north facing robot must return correct location on if move', () => {
    const robot = new Robot();
    robot.place('1,1,north');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('1,2,NORTH');
  });

  it('east facing robot must return correct location on if move', () => {
    const robot = new Robot();
    robot.place('1,1,east');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('2,1,EAST');
  });

  it('south facing robot must return correct location on if move', () => {
    const robot = new Robot();
    robot.place('1,1,south');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('1,0,SOUTH');
  });

  it('west facing robot must return correct location on if move', () => {
    const robot = new Robot();
    robot.place('1,1,west');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.move();
    expect(response.successMsg).toEqual('0,1,WEST');
  });

  it('unplace robot', () => {
    const robot = new Robot();
    robot.place('1,1,west');
    robot.unPlace();
    const response: RobotResponse = robot.report();
    expect(response.isError).toBeTruthy();
  });

  it('move left', () => {
    const robot = new Robot();
    robot.place('1,1,west');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.left();
    expect(response.successMsg).toEqual('1,1,SOUTH');
  });

  it('move right', () => {
    const robot = new Robot();
    robot.place('1,1,west');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.right();
    expect(response.successMsg).toEqual('1,1,NORTH');
  });

  it('report must return location', () => {
    const robot = new Robot();
    robot.place('1,1,NORTH');
    robot.confirmLocation(true);
    const response: RobotResponse = robot.report();
    expect(response.successMsg).toEqual('1,1,NORTH');
  });

});
