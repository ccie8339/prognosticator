module.exports = function (app) {
  const userConnections = {};
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // console.log("Connection ", connection)
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('player').join(connection);
      try {
        userConnections[connection.user.id] = connection;
      } catch (error) {
        console.log(error);
      }
      // Channels can be named anything and joined on any condition 

      // E.g. to send real-time events only to admins use

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(connection);
      // app.channel(`userIds/${user.id}`).join(connection);
    }
  });
  app.service('activegames').publish('patched', async (data,hook) => {
    try {
      const game = await app.service('activegames').get(data.id);
      const leaderBoard = await app.service('joinedgames').find({
        query: {
          gameId: data.id
        }
      })
      console.log(leaderBoard.data);
      const response = await app.channel(`CHANNEL_${game.channel}`).send({message: "GAME_STARTED", gameId: data.id, started: true, leaderBoard: leaderBoard});
      return response;
    } catch (error) {
      console.log(error);
    }
  })
  app.service('activegames').publish(async (data, hook) => {
    if (data.id !== undefined) { // Prevent New Play Being Created When New Game Create Fails
      try {
        const response = await app.service('activegames').find();
        return app.channel("player").send({ message: "NEW_GAME_AVAILABLE", games:  response.data});
      } catch (error) {
        console.log(error);
      }
    }
  })
  app.service('plays').publish((data, hook) => {
    return app.channel("player").send({ message: "REQUEST_PLAYCALL", gameId: data.gameId, playId: data.id, });
  })
  app.service('joinedgames').publish('created', async (data, hook) => {
    try {
      if (data !== null) {
        const games = await app.service('activegames').get(data.gameId);
        await app.channel(`CHANNEL_${games.channel}`).join(userConnections[data.userId]);
        return app.channel(`CHANNEL_${games.channel}`).send({message: "TEST MESSAGE"});
      }
    } catch (error) {
      console.log(error);
    }
  })
  // eslint-disable-next-line no-unused-vars
  // app.publish((data, hook) => {
  // Here you can add event publishers to channels set up in `channels.js`
  // To publish only for a specific event use `app.publish(eventname, () => {})`

  // console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

  // e.g. to publish all service events to all authenticated users use
  // return app.channel('authenticated');
  // });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
