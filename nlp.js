const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'], forceNER: true });

// Model Trainning
manager.addDocument('en','Hi,Hello,Greetings,hey,wassup, whats up','greetings.start');
manager.addAnswer('en','greetings.start','Hey, Welcome to NisChat. I am a NLP based Chat bot made by Nishant Shah. ');

manager.addDocument('en','How are you','bot.condition');
manager.addAnswer('en','bot.condition',"I'm a bot so I am fine untill my server is running and doesn't have any error 😉. How are you ?");

manager.addDocument('en',"I'm fine","user.condition");
manager.addAnswer('en',"user.condition","Wow, that's great to hear");

manager.addDocument('en',"Thank you","greetings.thank");
manager.addAnswer('en',"greetings.thank","It's my pleasure mate");

manager.addDocument('en',"Really, You sure,sure, Are you sure, Is it okay, Confirm","condition.confirm");
manager.addAnswer('en',"condition.confirm","Yes");

// Train and save the model.
async function nlp(question){
    await manager.train();
    manager.save();
    const response = await manager.process('en',question);
    const answer = response.answers[0];
    if (!answer) {
        return "I'm sorry, I don't know the answer to that.";
    }
    return answer.answer;
}

module.exports = nlp;
