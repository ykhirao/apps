require('dotenv').config()
const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// app.message('hello', ({ message, say }) => {
//   // say() sends a message to the channel where the event was triggered
//   say({
//     blocks: [
//     {
// 	    "type": "section",
//       "text": {
//         "type": "mrkdwn",
//         "text": `Hey there <@${message.user}>!`
//       },
//       "accessory": {
//         "type": "button",
//         "text": {
//           "type": "plain_text",
//           "text": "Click Me"
//         },
//         "action_id": "button_click"
//       }
//      }
//     ]
//   });
// });

// app.command('/echo', async ({ command, ack, say }) => {
//   // コマンドリクエストを確認
//   ack();

//   say(`${command.text}`);
// });

app.command('/vip', ({ ack, payload, context }) => {
  // コマンドのリクエストを確認
  ack();

  try {
    const result = app.client.views.open({
      token: context.botToken,
      // 適切な trigger_id を受け取ってから 3 秒以内に渡す
      trigger_id: payload.trigger_id,
      // view の値をペイロードに含む
      view: {
        type: 'modal',
        // callback_id が view を特定するための識別子
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Modal title'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Welcome to a modal with _blocks_'
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click me!'
              },
              action_id: 'button_abc'
            }
          },
          {
            type: 'input',
            block_id: 'input_c',
            label: {
              type: 'plain_text',
              text: 'What are your hopes and dreams?'
            },
            element: {
              type: 'plain_text_input',
              action_id: 'dreamy_input',
              multiline: true
            }
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit'
        }
      }
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.view('view_1', async ({ ack, body, view, context }) => {
  // モーダルビューでのデータ送信イベントを確認
  ack();

  // 入力値を使ってやりたいことをここで実装 - ここでは DB に保存して送信内容の確認を送っている

  // block_id: block_1 という input ブロック内で action_id: input_a の場合の入力
  const val = view['state']['values']['input_c']['dreamy_input'];
  const user = body['user']['id'];
  console.log(val.value)

  // ユーザーに対して送信するメッセージ
  let msg = val.value;

  // ユーザーにメッセージを送信
  try {
    app.client.chat.postMessage({
      token: context.botToken,
      channel: '#bot-test2',
      text: msg
    });
  }
  catch (error) {
    console.error(error);
  }
});

app.action('button_abc', ({ ack, body, context }) => {
  // ボタンを押したイベントを確認
  ack();

  try {
    const result = app.client.views.update({
      token: context.botToken,
      // リクエストに含まれる view_id を渡す
      view_id: body.view.id,
      // 更新された view の値をペイロードに含む
      view: {
        type: 'modal',
        // callback_id が view を特定するための識別子
        callback_id: 'view_1',
        title: {
          type: 'plain_text',
          text: 'Updated modal'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'You updated the modal!'
            }
          },
          {
            type: 'image',
            image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
            alt_text: 'Yay! The modal was updated'
          }
        ]
      }
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

// app.command('/vip2', ({ ack, payload, context }) => {
//   // コマンドのリクエストを確認
//   ack();

//   try {
//     const result = app.client.views.open({
//       token: context.botToken,
//       // 適切な trigger_id を受け取ってから 3 秒以内に渡す
//       trigger_id: payload.trigger_id,
//       // view の値をペイロードに含む
//       view: {
//         type: 'modal',
//         // callback_id が view を特定するための識別子
//         callback_id: 'view_1',
//         title: {
//           type: 'plain_text',
//           text: 'Vip 投稿画面'
//         },
//         blocks: [
//           {
//             type: 'section',
//             text: {
//               type: 'mrkdwn',
//               text: '完全な *匿名* ではありません'
//             }
//           },
//           {
//             type: 'input',
//             block_id: 'input_c',
//             label: {
//               type: 'plain_text',
//               text: 'Write your message!!'
//             },
//             element: {
//               type: 'plain_text_input',
//               action_id: 'dreamy_input',
//               multiline: true
//             }
//           }
//         ],
//         submit: {
//           type: 'plain_text',
//           text: 'Submit'
//         }
//       }
//     });
//     console.log(result);
//   }
//   catch (error) {
//     console.error(error);
//   }
// });


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3001);

  console.log('⚡️ Bolt app is running!');
})();

