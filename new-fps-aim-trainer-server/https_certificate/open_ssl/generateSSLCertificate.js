import { exec } from "child_process";

export const generateSSLCertificate = () => {
  exec(
    `
    openssl genrsa -out localhost.key 2048
    openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating private key: ${error}`);
        return;
      }
      console.log(stdout);
    }
  );

  const checkForFiles = () => {
    exec(`ls`, (err, stdOut) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("stdOut", stdOut);
        if (
          stdOut.includes("localhost.cert") &&
          stdOut.includes("localhost.key")
        ) {
          res();
        } else {
          checkForFiles();
        }
      }
    });
  };
};
