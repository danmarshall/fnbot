/*-----------------------------------------------------------------------------
This template demonstrates how to use Waterfalls to collect input from a user using a sequence of steps.
For a complete walkthrough of creating this type of bot see the article at
https://docs.botframework.com/en-us/node/builder/chat/dialogs/#waterfall
-----------------------------------------------------------------------------*/
var builder = require("botbuilder");
var mockResponse_1 = require("./mockResponse");
function default_1(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);
    console.log = context.log;
    console.warn = context.log;
    console.info = context.log;
    console.error = context.log;
    var connector = new builder.ChatConnector({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword,
        stateEndpoint: process.env.BotStateEndpoint,
        openIdMetadata: process.env.BotOpenIdMetadata
    });
    var bot = new builder.UniversalBot(connector);

    bot.dialog('/', [
        function (session) {
            builder.Prompts.text(session, "Hello... What's your name?");
        },
        function (session, results) {
            session.userData.name = results.response;
            builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?"); 
        },
        function (session, results) {
            session.userData.coding = results.response;
            builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
        },
        function (session, results) {
            session.userData.language = results.response.entity;
            session.send("Got it... " + session.userData.name + 
                        " you've been programming for " + session.userData.coding + 
                        " years and use " + session.userData.language + ".");
        }
    ]);

    context.log('about to require mockResponse');
    context.log('imported mock res');
    var res = new mockResponse_1.MockResponse(context);
    context.log('done mock res object');
    connector.verifyBotFramework(req, res);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;