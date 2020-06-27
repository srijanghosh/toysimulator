export class RobotResponse {
  isError: boolean;
  successMsg: string;
  errorMsg: string;

  constructor(public isSuccess: boolean, msg: string) {
    this.isError = !isSuccess;
    isSuccess ? (this.successMsg = msg) : (this.errorMsg = msg);
  }
}
