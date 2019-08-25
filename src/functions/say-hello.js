import { addSubscriber } from "../firebase";

exports.handler = function(event, context, callback) {
  const { name, email } = decodeURIComponent(event.queryStringParameters);
  console.log(name, email);
  callback(null, { body: "Hello!", statusCode: 200, something: "Hmmm" });
};
