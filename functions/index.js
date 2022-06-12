const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendMessage = functions.https.onCall((data, context) => {
  functions.logger.info("========== DATA ===========", {
    structuredData: true,
  });

  const message = data.text;
  const FCMToken = data.token;

  const payload = {
    token: FCMToken,
    notification: {
      title: "cloud function demo",
      body: message,
    },
    data: {
      body: message,
    },
  };

  admin
      .messaging()
      .send(payload)
      .then((response) => {
      // Response is a message ID string.
        console.log("Successfully sent message:", response);
        return {success: true};
      })
      .catch((error) => {
        return {error: error.code};
      });

  return {
    altered: `Response for ${data.text}`,
  };
});


exports.sendMessageToTopic = functions.https.onCall((data, context) => {
  functions.logger.info("========== DATA ===========", {
    structuredData: true,
  });

  const message = data.text;
  const topic = data.topic;

  const payload = {
    topic: topic,
    notification: {
      title: "cloud function demo",
      body: message,
    },
    data: {
      body: message,
    },
  };

  admin
      .messaging()
      .send(payload)
      .then((response) => {
      // Response is a message ID string.
        console.log("Successfully sent message:", response);
        return {success: true};
      })
      .catch((error) => {
        return {error: error.code};
      });

  return {
    altered: `Response for ${data.text}`,
  };
});
