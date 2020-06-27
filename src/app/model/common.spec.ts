import { RobotResponse } from './common';

describe('RobotResponse', () => {
  it('should create success response', () => {
    const response = new RobotResponse(true, 'success');
    expect(response).toBeTruthy();
  });

  it('should create error response', () => {
    const response = new RobotResponse(false, 'error');
    expect(response).toBeTruthy();
  });

  it('checking success message', () => {
    const response = new RobotResponse(true, 'success');
    expect(response.successMsg).toEqual('success');
  });

  it('checking error message', () => {
    const response = new RobotResponse(false, 'error');
    expect(response.errorMsg).toEqual('error');
  });

  it('checking success flag on error', () => {
    const response = new RobotResponse(false, 'error');
    expect(response.isSuccess).toBeFalsy();
  });

  it('checking error flag on success', () => {
    const response = new RobotResponse(true, 'success');
    expect(response.isError).toBeFalsy();
  });

});
