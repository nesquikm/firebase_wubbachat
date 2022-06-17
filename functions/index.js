const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendMessageToTopic = functions.https.onCall((data, context) => {
  functions.logger.info("========== DATA ===========", {
    structuredData: true,
  });

  const { id, topic, messageBody, fromId, fromNickname, fromColor } = data;

  const expTopic = /([0-9a-zA-Z-]+)_(.*)/;
  const match = topic.match(expTopic);
  const chatName = decodeURI(match[2]);

  const payload = {
    topic: topic,
    notification: {
      // TODO(nesquikm): parse data to get title
      title: chatName,
      body: messageBody,
    },
    data: {
      id,
      fromId,
      fromNickname,
      fromColor,
      messageBody: messageBody,
    },
  };

  admin
    .messaging()
    .send(payload)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      return { success: true };
    })
    .catch((error) => {
      return { error: error.code };
    });

  return {
    altered: `Response for ${data.text}`,
  };
});
