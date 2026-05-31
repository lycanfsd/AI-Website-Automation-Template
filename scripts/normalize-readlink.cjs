const fs = require("node:fs");

function normalizeReadlinkError(error) {
  if (error && error.code === "EISDIR" && error.syscall === "readlink") {
    error.code = "EINVAL";
    error.message = error.message.replace("EISDIR", "EINVAL");
  }

  return error;
}

const readlinkSync = fs.readlinkSync;
fs.readlinkSync = function patchedReadlinkSync(...args) {
  try {
    return readlinkSync.apply(this, args);
  } catch (error) {
    throw normalizeReadlinkError(error);
  }
};

const readlink = fs.readlink;
fs.readlink = function patchedReadlink(...args) {
  const callback = args.pop();

  return readlink.call(this, ...args, (error, ...rest) => {
    callback(error ? normalizeReadlinkError(error) : null, ...rest);
  });
};

if (fs.promises?.readlink) {
  const promiseReadlink = fs.promises.readlink.bind(fs.promises);
  fs.promises.readlink = async function patchedPromiseReadlink(...args) {
    try {
      return await promiseReadlink(...args);
    } catch (error) {
      throw normalizeReadlinkError(error);
    }
  };
}
