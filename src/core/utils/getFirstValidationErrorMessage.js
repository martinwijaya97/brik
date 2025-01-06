const getFirstValidationErrorMessage = (graphQLErrors) => {
  let displayedMessage = [];
  if (Array.isArray(graphQLErrors)) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions.code === 'BAD_USER_INPUT') {
        Object.values(extensions.validationErrors).forEach((value) => {
          if (Array.isArray(value)) {
            displayedMessage.push(value[0]);
          } else {
            displayedMessage.push(value);
          }
        });
      } else {
        displayedMessage.push(message);
      }
    });
  }

  return displayedMessage[0];
};

export default getFirstValidationErrorMessage;
