const {Client} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();

const client = new Client();

client.on('qr',(qr) =>{
    qrcode.generate(qr,{small:true});
});

client.on('ready',() =>{
    console.log("Client is ready");
});

client.initialize();

const configuration = new Configuration({
    apiKey : process.env.SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(message){
    const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: message,
        temperature:1,
        max_tokens:256,
        top_p:1,
        frequency_penalty:0,
        presence_penalty:0
     
    });
    
    return completion.data.choices[0].text;
    
}


client.on('message',message => {
  
    console.log(message.body.toLowerCase());
    if(message.body.toLowerCase()==="hi" || message.body.toLowerCase()==="hey"){message.reply("Hare Krishna!!\nVaibhav is not available right now,I am one of an OpenAI model,you can talk to me.\nSorry in advance if I could not generate appropriate responses as I am in testing phase.\nPlease leave your valuable feedback so that I can improve.\n\n\n!!If you also want me to integrate with your Whatsapp you can contact Vaibhav!!")}
    else if(message.body.toLowerCase()==="ok" || message.body.toLowerCase()==="okay"){message.reply("Yeah! Anything else I can assist you with?")}
    else if(message.body.toLowerCase()==="who created you" || message.body.toLowerCase()==="who created you?" ||  message.body.toLowerCase()==="vaibhav created you?"|| message.body.toLowerCase()==="vaibhav created you"||  message.body.toLowerCase()==="does vaibhav created you"|| message.body.toLowerCase()==="does vaibhav created you?"){message.reply("Everything in this world is created by Krishna")}
    else if(message.body.toLowerCase()==="where is vaibhav?" || message.body.toLowerCase()==="where is he?" ||  message.body.toLowerCase()==="where is he"|| message.body.toLowerCase()==="where is vaibhav"||  message.body.toLowerCase()==="what is he doing?"|| message.body.toLowerCase()==="what is he doing"){message.reply("Must be sleeping!! Like always XD")}
    else{
    runCompletion(message.body).then(reply=>message.reply(reply));}
})