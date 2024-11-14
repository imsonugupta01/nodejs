const _ = require('lodash');
const chat = require('@botpress/chat');

const main = async () => {
  const webhookId = 'aa093610-bd05-44be-a5f6-5ce448bac437';
  if (!webhookId) {
    throw new Error('WEBHOOK_ID is required');
  }

  const apiUrl = `https://chat.botpress.cloud/${webhookId}`;

  // 0. Connect and create a user
  const client = await chat.Client.connect({ apiUrl });

//   1. Create a conversation
  const { conversation } = await client.createConversation({});
  console.log('Conversation created:', conversation.id);

  // 2. Send a message to the bot and check if it was sent successfully
  try {
    const messageResponse = await client.createMessage({
      conversationId: conversation.id,
      payload: {
        type: 'text',
        text: 'Hello, Bot!',
      },
    });

    console.log('Message sent successfully:', messageResponse);
  } catch (error) {
    console.error('Failed to send message:', error);
    return; // Exit the function if sending the message fails
  }

  // Function to poll for messages
  const pollMessages = async (conversationId) => {
    const { messages } = await client.listMessages({
      conversationId,
    });

    const sortedMessages = _.sortBy(messages, (m) => new Date(m.createdAt).getTime());

    // Check if the bot has responded (second message)
    if (sortedMessages.length > 1) {
      const botResponse = sortedMessages[1];
      console.log("Bot's response:", botResponse.payload);
      return true; // Stop polling once we get the response
    }

    return false; // Continue polling
  };

  // Poll every 2 seconds until bot responds
  const waitForBotResponse = async () => {
    let botResponded = false;
    while (!botResponded) {
      console.log('Checking for bot response...');
      botResponded = await pollMessages(conversation.id);
      if (!botResponded) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
      }
    }
  };

  // Start polling for the bot's response
  await waitForBotResponse();
};

// Start the main process and handle errors
main()
  .then(() => {
    console.log('Bot interaction completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


// const _ = require('lodash');
// const chat = require('@botpress/chat');

// const main = async () => {
//   const webhookId = 'aa093610-bd05-44be-a5f6-5ce448bac437';
//   if (!webhookId) {
//     throw new Error('WEBHOOK_ID is required');
//   }

//   const apiUrl = `https://chat.botpress.cloud/${webhookId}`;

//   // 0. Connect to the client
//   const client = await chat.Client.connect({ apiUrl });

//   // 1. Create a conversation with user details
//   const user = {
//     name: 'John Doe',
//     email: 'john.doe@example.com'
//   };

//   const { conversation } = await client.createConversation({ user });
//   console.log('Conversation created:', conversation.id);

//   // 2. Send a message to the bot
//   try {
//     const messageResponse = await client.createMessage({
//       conversationId: conversation.id,
//       payload: {
//         type: 'text',
//         text: 'Hello, Bot!',
//       },
//     });

//     console.log('Message sent successfully:', messageResponse);

//     // Log the user ID from the message response
//     const userId = messageResponse.message.userId; // Extracting user ID from the message response
//     console.log('User ID (Key):', userId);
//   } catch (error) {
//     console.error('Failed to send message:', error);
//     return; // Exit the function if sending the message fails
//   }

//   // Function to poll for messages
//   const pollMessages = async (conversationId) => {
//     const { messages } = await client.listMessages({
//       conversationId,
//     });

//     const sortedMessages = _.sortBy(messages, (m) => new Date(m.createdAt).getTime());

//     // Check if the bot has responded (second message)
//     if (sortedMessages.length > 1) {
//       const botResponse = sortedMessages[1];
//       console.log("Bot's response:", botResponse.payload);
//       return true; // Stop polling once we get the response
//     }

//     return false; // Continue polling
//   };

//   // Poll every 2 seconds until bot responds
//   const waitForBotResponse = async () => {
//     let botResponded = false;
//     while (!botResponded) {
//       console.log('Checking for bot response...');
//       botResponded = await pollMessages(conversation.id);
//       if (!botResponded) {
//         await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
//       }
//     }
//   };

//   // Start polling for the bot's response
//   await waitForBotResponse();
// };

// // Start the main process and handle errors
// main()
//   .then(() => {
//     console.log('Bot interaction completed');
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });
