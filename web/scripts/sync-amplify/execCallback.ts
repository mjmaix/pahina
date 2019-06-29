const execCb: (
  error: import('child_process').ExecException,
  stdout: string,
  stderr: string,
) => void = (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.log(`err: ${err}`);
    return;
  }
  // the *entire* stdout and stderr (buffered)
  if (stdout) {
    console.log(`stdout: ${stdout}`);
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
};

export { execCb };
