import { addSubscriber } from "../firebase";

exports.handler = function(event, context, callback) {
  const { name, email } = decodeURIComponent(event.queryStringParameters);

  addSubscriber({ name, email, confirmed: false })
    .then(result => {
      if (result.success) {
        return { success: true, statusCode: 200 };
      } else {
        return { success: false, reason: result.reason, statusCode: 500 };
      }
    })
    .then(response => {
      callback(null, {
        body: JSON.stringify(response),
        statusCode: response.statusCode,
      });
    });
};
