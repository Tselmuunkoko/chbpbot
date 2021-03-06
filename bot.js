const { QuestionUnderstanding } = require('./bot/questionUnderstand');
const { FbViewHelper } = require('./bot/fbViewHelper');
const { GraphdbHelper } = require('./bot/GraphdbHelper');
var request = require('request');
const questionHelper = new QuestionUnderstanding();
const viewHelper = new FbViewHelper();
const dbHelper = new GraphdbHelper();

require("dotenv").config();

class Bot{
    constructor(){
        this.state = 0;
        this.lastresult;
        this.range = 0;
        this.prevQuestion;
        this.sender;
    }
    async Run(sender,event){
        this.sender = sender;
        var result;
        if (event.message) {
            if(event.message.text &&(!event.message.quick_reply)){
                console.log(event.message.text);
                result =  await this.botRun(event.message.text);
            }
            else if(event.message.quick_reply){
                console.log(event.message.quick_reply.payload);
                result = await this.botRun(event.message.quick_reply.payload);
            }
            this.sendListMessage(result);
        }
        else if(event.postback){
            console.log(event.postback);
            result = await this.botRun(event.postback.payload); //postback
            this.sendListMessage(result);
        }
    }
    sendListMessage(result){  
        // this.sendImageMessage(sender,'/home/inuyasha/aizawa.jpg'); 
        if(!result.length){
            this.sendTextMessage(this.sender,result);
        }
        for(var i = 0; i<result.length; i++){
            this.sendTextMessage(this.sender,result[i]);
        }
    }
    async botRun(textMessage){
        var questionType = questionHelper.getTypeOfQuestion(textMessage);
        // console.log(questionType);
         // ππ₯Όπ₯½ππ§³πΌπππ§βπ«π§βππ§ βοΈπππππππππππππ§π«πβπ―
        var questionAttributes = questionHelper.extractAttributes(questionType, textMessage);
        if (questionType == 911){
           var messageData = {
                text:"π€ ΠΠΎΠ»ΠΎΠΌΠΆΠΈΡ Π°ΡΡΡΠ»ΡΡΡΠ΄ π \n"+
                "1.  ΠΠ΄ΠΎΠΎ 3-Ρ Π±Π°ΠΉΡΠ°Π½Π΄ ΡΡΠ» Σ©ΡΣ©Σ© Π±Π°ΠΉΠ½Π° ΡΡ? \n"+
                '2.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» ΡΠΈΡΡΡΠ» ΡΠ°Π°Π½Π° ΠΎΡΠΆ Π±Π°ΠΉΠ½Π° Π²Ρ? \n'+
                '3.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π° (Π±Π°Π³ΡΠΈΠΉΠ½ Π½ΡΡ) Π³ΡΠΆ ΡΡΠ½ Π±Ρ? \n'+
                '4.  (ΠΌΡΠΉΠ»ΡΡΡ) Π³ΡΠΆ ΡΡΠ½ Π±Ρ? \n'+
                '5.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ ΡΠ½Ρ ΡΠ»ΠΈΡΠ°Π»Π΄ ΠΎΡΠΆ Π±ΡΠΉ ΡΠΈΡΡΡΠ»?―?―Π΄? \n'+
                '6.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ Π°ΠΆΠΈΠ»Π»Π°ΠΆ Π±ΡΠΉ ΡΣ©ΡΠ»?―?―Π΄? \n'+
                '7.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ ΡΡΠ΄Π°Π»Π³Π°Π°Π½Ρ ΡΠΈΠ³Π»ΡΠ»?―?―Π΄? \n'+
                '8.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» Π³ΡΠΆ ΡΠΌΠ°Ρ ΡΠΈΡΡΡΠ» Π±Ρ? \n'+
                '9.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» ΡΠΈΡΡΡΠ»ΠΈΠΉΠ½ ΡΠ°Π³ΠΈΠΉΠ½ ΡΡΠ²Π°Π°ΡΡ? \n'+
                '10. ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π»-Π½ ΡΠΈΠ³Π»ΡΠ»ΡΡΡ ΡΡΠ½ ΡΡΠ΄Π°Π»Π³Π°Π° ΡΠΈΠΉΠ΄ΡΠ³ Π²Ρ? \n'
            }
            return messageData;
        } 
       
        else if(questionType == 0){
            var  messageData = {
                text:"π€ Π‘Π°ΠΉΠ½ Π±Π°ΠΉΠ½Π° ΡΡ? π ΠΠΈ ΠΠ£ΠΠ‘-ΠΈΠΉΠ½ Π½ΡΡΠ»ΡΡΡΠΉ Σ©Π³Σ©Π³Π΄Σ©Π» Π΄ΡΡΡ ΡΡΡΡΡΠ»Π°Π½ Π΄ΠΎΠΎΡΡ Π°ΡΡΡΠ»ΡΡΡΠ΄Π°Π΄ ΡΠ°ΡΠΈΡΠ»Ρ Σ©Π³ΠΆ ΡΠ°Π΄Π½Π°.\n"+
                "1.  ΠΠ΄ΠΎΠΎ 3-Ρ Π±Π°ΠΉΡΠ°Π½Π΄ ΡΡΠ» Σ©ΡΣ©Σ© Π±Π°ΠΉΠ½Π° ΡΡ? \n"+
                '2.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» ΡΠΈΡΡΡΠ» ΡΠ°Π°Π½Π° ΠΎΡΠΆ Π±Π°ΠΉΠ½Π° Π²Ρ? \n'+
                '3.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π° (Π±Π°Π³ΡΠΈΠΉΠ½ Π½ΡΡ) Π³ΡΠΆ ΡΡΠ½ Π±Ρ? \n'+
                '4.  (ΠΌΡΠΉΠ»ΡΡΡ) Π³ΡΠΆ ΡΡΠ½ Π±Ρ? \n'+
                '5.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ ΡΠ½Ρ ΡΠ»ΠΈΡΠ°Π»Π΄ ΠΎΡΠΆ Π±ΡΠΉ ΡΠΈΡΡΡΠ»?―?―Π΄? \n'+
                '6.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ Π°ΠΆΠΈΠ»Π»Π°ΠΆ Π±ΡΠΉ ΡΣ©ΡΠ»?―?―Π΄? \n'+
                '7.  ΠΠΌΠ°ΡΡΠ°Π½Π°Π°-Π½ ΡΡΠ΄Π°Π»Π³Π°Π°Π½Ρ ΡΠΈΠ³Π»ΡΠ»?―?―Π΄? \n'+
                '8.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» Π³ΡΠΆ ΡΠΌΠ°Ρ ΡΠΈΡΡΡΠ» Π±Ρ? \n'+
                '9.  ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π» ΡΠΈΡΡΡΠ»ΠΈΠΉΠ½ ΡΠ°Π³ΠΈΠΉΠ½ ΡΡΠ²Π°Π°ΡΡ? \n'+
                '10. ΠΠ΅Π± ΠΏΡΠΎΠ³ΡΠ°ΠΌΡΠ»Π°Π»-Π½ ΡΠΈΠ³Π»ΡΠ»ΡΡΡ ΡΡΠ½ ΡΡΠ΄Π°Π»Π³Π°Π° ΡΠΈΠΉΠ΄ΡΠ³ Π²Ρ? \n'
            }
            return messageData;
        }
        else if(questionType == -1){
            var messageData = {
                text:"ΠΡΡΡΠ»ΡΡΠ³ ΠΎΠΉΠ»Π³ΠΎΡΠΎΠ½Π³?―ΠΉ!"
            }
            return messageData;
        }
        else {
            var queryResults;
            var results;
            if(questionType=="prev"){
                questionType = this.prevQuestion;
                results = this.lastresult;
                this.range=+10;
            }
            else{
                queryResults = await dbHelper.responseBack(questionType, questionAttributes);
                results = queryResults.results.bindings;
                console.log(questionType);
                this.range = 0;
                this.lastresult = results;
                this.prevQuestion = questionType;
            }
            if(questionType == 1){
                return viewHelper.emptyRooms(results,this.range);
            }
            else if(questionType == 2){
                return viewHelper.lessonRooms(results,this.range);
            }
            else if(questionType == 3){   
                return viewHelper.sendListofFacultyMembers(results,this.range);
            }
            else if(questionType == 4){
                return viewHelper.sendDetailsOfFacultyMember(results[0]);
            }
            else if(questionType == 5){
                return viewHelper.courseList(results,this.range);
            }
            else if(questionType == 6){ //lecture
                return viewHelper.scheduleList(results,this.range,0);
            }
            else if(questionType == 7){
                return viewHelper.roomDetails(results[0]);
            }  
            else if(questionType == 8){
                return viewHelper.courseDetails(results[0]);
            }
            else if(questionType == 9){
                return viewHelper.sendListofFacultyMembers(results,this.range);
            }
            else if(questionType == 10){
                return viewHelper.courseList(results,this.range);
            } 
            else if(questionType == 11){
                return viewHelper.projectList(results,this.range);
            } 
            else if(questionType == 12){
                return viewHelper.researchList(results,this.range);
            }
            else if(questionType == 13){
                return viewHelper.projectDetails(results[0]);
            }
            else if(questionType == 14){ //lab
                return viewHelper.scheduleList(results,this.range,1);
            }
            else if(questionType == 15){ //seminar
                return viewHelper.scheduleList(results,this.range,2);
            }
            else if(questionType == 16){ //hen ene chigleleer sudalgaa hiideg we
                return viewHelper.sendListofFacultyMembers(results,this.range);
            }
        }
    }
    sendTextMessage(sender, messageData) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token:process.env.PAGE_ACCESS_TOKEN},
            method: 'POST',
            json: {
                recipient: {id:sender},
                message: messageData
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }
    sendImageMessage(recipientId, file_loc){
        let fs = require('fs');
        var readStream = fs.createReadStream(file_loc);
        var messageData = {
            recipient : {
                id : recipientId
            },
            message : {
                attachment : {
                    type : "image",
                    payload :{}
                }
            },
            filedata:readStream
        }
        this.callSendAPI(messageData);
    }
    
    callSendAPI(messageData) {
        var endpoint = "https://graph.facebook.com/v2.6/me/messages?access_token=" + process.env.PAGE_ACCESS_TOKEN;
        var r = request.post(endpoint, function(err, httpResponse, body) {
            if (err) {return console.error("upload failed >> \n", err)};
            console.log("upload successfull >> \n", body); //facebook always return 'ok' message, so you need to read error in 'body.error' if any
        });
        var form = r.form();
        form.append('recipient', JSON.stringify(messageData.recipient));
        form.append('message', JSON.stringify(messageData.message));
        form.append('filedata', messageData.filedata); //no need to stringify!
    }
    
}
    
module.exports.Bot = Bot;