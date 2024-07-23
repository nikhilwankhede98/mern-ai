const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const { GoogleGenerativeAI } = require("@google/generative-ai")
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

exports.summaryController = async (req, res) => {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 500,
    responseMimeType: "text/plain",
  };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});
  console.log('111', { genAI, model });

  try {
    const { text } = req.body;
    console.log('111', text);
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Summarize this \n${text}`,
    //   max_tokens: 500,
    //   temperature: 0.5,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }

    const result = await model.generateContent(`Summarize this in less than 120 words  \n${text} `);
    const response = result.response;
    const responseText = response.text();
    console.log('111', { result, response, responseText });
    return res.status(200).json(responseText)
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.paragraphController = async (req, res) => {

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});

  try {
    const { text } = req.body;
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `write a detail paragraph about \n${text}`,
    //   max_tokens: 500,
    //   temperature: 0.5,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
    const result = await model.generateContent(`write a detail paragraph about \n${text} `);
    const response = result.response;
    const responseText = response.text();
    return res.status(200).json(responseText)
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.chatbotController = async (req, res) => {

  // const generationConfig = {
  //   temperature: 1,
  //   topP: 0.95,
  //   topK: 64,
  //   maxOutputTokens: 8192,
  //   responseMimeType: "text/plain",
  // };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  try {
    const { text } = req.body;

    const result = await chat.sendMessage(text);
    const response = await result.response;
    const responseText = response.text();
    console.log('111222', { responseText });
    return res.status(200).json(responseText)
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Answer question similar to how yoda from star war would.
    //   Me: 'what is your name?'
    //   yoda: 'yoda is my name'
    //   Me: ${text}`,
    //   max_tokens: 300,
    //   temperature: 0.7,
    // });
    // if (data) {
    //   if (data.choices[0].text) {
    //     return res.status(200).json(data.choices[0].text);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  // try {
  //   const { text } = req.body;
  //   const { data } = await openai.createCompletion({
  //     model: "text-davinci-002",
  //     prompt: `/* convert these instruction into javascript code \n${text}`,
  //     max_tokens: 400,
  //     temperature: 0.25,
  //   });
  //   if (data) {
  //     if (data.choices[0].text) {
  //       return res.status(200).json(data.choices[0].text);
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  //   return res.status(404).json({
  //     message: err.message,
  //   });
  // }
  // convert these instruction into javascript code \n${text}

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});

  try {
    const { text } = req.body;
    const result = await model.generateContent(`convert these instruction into javascript code \n${text}`);
    const response = result.response;
    const responseText = response.text();
    return res.status(200).json(responseText)
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

// there is no provision to return an image using @google/generative-ai
// exports.scifiImageController = async (req, res) => {
//   const { text } = req.body;
//   try {
//     // const { data } = await openai.createImage({
//     //   prompt: `generate a scifi image of ${text}`,
//     //   n: 1,
//     //   size: "512x512",
//     // });
//     // if (data) {
//     //   if (data.data[0].url) {
//     //     return res.status(200).json(data.data[0].url);
//     //   }
//     // }

//     // const response = await genAI.generateImage({
//     //   prompt: text,
//     //   size: '512x512', // Specify the size of the generated image
//     //   num_images: 1, // Number of images to generate
//     //   format: 'png' // Image format
//     // });
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//     const result = await model.generateContent(`Return an image in .png format for the following prompt \n${text}`);
//     // const response = await model.generateImage({
//     //   prompt: text,
//     //   size: '512x512', // Specify the size of the generated image
//     //   num_images: 1, // Number of images to generate
//     //   format: 'png' // Image format
//     // });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };