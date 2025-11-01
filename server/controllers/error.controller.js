const getUniqueErrorMessage = (err) => {
  let output;
  try {
    const fieldName = err.message.substring(
      err.message.lastIndexOf("$") + 2,
      err.message.lastIndexOf("_1")
    );
    output = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`;
  } catch (ex) {
    output = "Duplicate field value";
  }
  return output;
};

const getErrorMessage = (err) => {
  if (!err) {
    return "An unknown error occurred";
  }

  if (err.code && (err.code === 11000 || err.code === 11001)) {
    return getUniqueErrorMessage(err);
  }

  if (err.errors) {
    for (const errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  }

  return err.message || "Unexpected error";
};

export default {
  getErrorMessage,
};
