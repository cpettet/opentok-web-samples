// Set Credentials
const apiKey = '47383071';
const sessionId = '1_MX40NzM4MzA3MX5-MTYzODU1ODU5Nzg4NH5ESTU3VFdCSU9sVjMxL3dZVDhGNWY5K1J-fg';
const token = 'T1==cGFydG5lcl9pZD00NzM4MzA3MSZzaWc9ZjY5NzdmNjJmZDBhMDY3ZDIzYWRkOTcyMGU3ZTcwNjViNDE2NmVlNDpzZXNzaW9uX2lkPTFfTVg0ME56TTRNekEzTVg1LU1UWXpPRFUxT0RVNU56ZzROSDVFU1RVM1ZGZENTVTlzVmpNeEwzZFpWRGhHTldZNUsxSi1mZyZjcmVhdGVfdGltZT0xNjM4NTU4NjE2Jm5vbmNlPTAuMDE3NjkyNDIwNjcxNDI5OTU0JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2Mzg2NDUwMTUmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

if (!apiKey || !sessionId || !token) {
  alert('You need to add your apiKey, sessionId and token to openTok.js');
}

// Initialize Session
const session = OT.initSession(apiKey, sessionId);

// Set session event listeners
session.on({
  streamCreated: (event) => {
    session.subscribe(event.stream, 'subscriber', (error) => {
      if (error) {
        console.error(`There was an issue subscribing to the stream: ${error}`);
      }
    });
  },
  streamDestroyed: (event) => {
    console.log(`Stream with name ${event.stream.name} ended because of reason: ${event.reason}`);
  }
});

// Create a publisher
const publisher = OT.initPublisher('publisher', { videoSource: 'screen' }, (initError) => {
  if (initError) {
    console.error(`There was an error initializing the publisher: ${initError}`);
  }
});

// Connect to the session
session.connect(token, (error) => {
  // If the connection is successful, initialize a publisher and publish to the session
  if (error) {
    console.error(`There was an error connecting to session: ${error}`);
    publisher.destroy();
    return;
  }
  session.publish(publisher, (pubError) => {
    if (pubError) {
      console.error(`There was an error when trying to publish: ${pubError}`);
    }
  });
});
