class FbViewHelper{
    // 1 hooson angi
    emptyRooms(rooms,range){
      var messageData = [];
      var elements=[];
      var quicker = true;
      if(rooms.length==0){
        var TextData={
          "text":"Сул өрөө олдсонгүй."
        }
        return TextData;
      }
      else if(rooms.length>0 && range==0){
        var TextData = {
          "text":rooms.length+" сул өрөө олдлоо."
        }
        messageData.push(TextData);
      }
        for (var i=range; i<rooms.length; i++){ 
          if(i>=range+10){ 
            quicker = false;
            break;
          }
          var instance = rooms[i];
          elements.push({
            "title":instance.department.value+"-"+instance.label1.value,
            "subtitle":instance.termType.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload":instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй" 
              }
            ]
          });
      }
      var  messageAttachment = {
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":elements
          }
        }
      }
      if(quicker == false){
        messageAttachment["quick_replies"]=[
          {
            "content_type":"text",
            "title":"Дараагийнх",
            "payload":"nextTenofLastQuestiontgeedgoynuutsug"
          }
        ];
      }
      messageData.push(messageAttachment);
      console.log(messageData);
      return messageData;
    }
    // 2 hicheeliin uruu
    lessonRooms(rooms,range){
      return this.emptyRooms(rooms,range);
    }
    //3 gej hen be?
    sendListofFacultyMembers(members,range){
      var messageData = [];
      if(members.length==0){
        var TextData = {
          text:"Ийм нэртэй ажилтан олдсонгүй."
        }
        return TextData;
      }
      else if(members.length>0&&range==0){
        var TextData ={
          text:"Нийт "+members.length+" ажилтан олдлоо."
        }
        messageData.push(TextData);
      }
      var elements= [];
      var quicker = true;
      for (var i=0; i<members.length; i++){
        var instance = members[i];       
        if (instance.email === undefined)      
            continue; 
        if(i>=range+10){ 
          quicker = false;
          break;
        }
        elements.push({
            "title":instance.familyName.value+" "+instance.givenName.value,
            "subtitle":instance.department.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Хичээлүүд",
                "payload":instance.email.value+"-н энэ улиралд орж буй хичээлүүд?"
              },
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload": instance.email.value+" гэж хэн бэ?"
              }
            ]
        });
    }
        var messageAttachment = {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"generic",
              "elements":elements
            }
          }
        }
        if(quicker == false){
          messageAttachment["quick_replies"]=[
            {
              "content_type":"text",
              "title":"Дараагийнх",
              "payload":"nextTenofLastQuestiontgeedgoynuutsug"
            }
          ];
        }
        messageData.push(messageAttachment);
        return messageData;
    }
    // 4  gej hen be email
    sendDetailsOfFacultyMember(member){
      var messageData = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text": "*"+member.familyName.value+" "+member.givenName.value+"*\n"+
                  "*Албан тушаал*: "+member.job.value+" \n"+
                  "*Нэгж*: "+member.department.value+" \n"+
                  "*Мэйл*: "+ member.email.value+"\n"+
                  "*Өрөө*: "+(!(member.room1 === undefined)?
                  decodeURIComponent(member.room1.value.split("/")):
                  "мэдээлэл байхгүй"),
            "buttons":[
              {
                "type":"postback",
                "title":"Судалгааны чиглэл",
                "payload":member.email.value+"-н судалгааны чиглэлүүд?"
              },
              {
                "type":"postback",
                "title":"Ажиллаж буй төслүүд",
                "payload":member.givenName.value+ "." +member.department.value+"-н ажиллаж буй төслүүд?"
              }
            ]
          }
        }
      }
      return messageData;
    }
    // 5 gej ymar hicheel we
    courseList(courses,range){

      var messageData = [];
      if(courses.length==0){
        var TextData = {
          text:"Ийм нэртэй хичээл олдсонгүй."
        }
        return TextData;
      }
      else if(courses.length>0&&range==0){
        var TextData ={
          text:"Нийт "+courses.length+" хичээл олдлоо."
        }
        messageData.push(TextData);
      }
      var elements= [];
      var quicker = true;
        for (var i=0; i<courses.length; i++){ 
          if(i>=range+10){ 
            quicker = false;
            break;
          }
          var instance = courses[i];
          elements.push({
            "title":instance.courseName?instance.courseName.value:instance.CourseName.value,
            "subtitle":instance.depLabel?instance.depLabel.value:instance.Department.value
             +"  "+ instance.courseCredit.value + " Багц цаг",
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload": instance.courseName?instance.courseName.value:instance.CourseName.value+" хичээлийн дэлгэрэнгүй мэдээлэл?"
              }
            ]
          });
      }
      var  messageAttachment = {
          "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":elements
          }
        }
      }
      if(quicker == false){
        messageAttachment["quick_replies"]=[
          {
            "content_type":"text",
            "title":"Дараагийнх",
            "payload":"nextTenofLastQuestiontgeedgoynuutsug"
          }
        ];
      }
      messageData.push(messageAttachment);
      return messageData;
    }
    //6 hicheeliin tsagiin huwaari
    scheduleList(lessons){
      var tempArray = [];
      for(var i=0; i<lessons.length; i++){
          var temp = lessons[i];    
          if(temp.type.value=="Даваа"){
              tempArray.push(1);
          }
          if(temp.type.value=="Мягмар"){
              tempArray.push(2);
          }
          if(temp.type.value=="Лхагва"){
              tempArray.push(3);
          }
          if(temp.type.value=="Пүрэв"){
              tempArray.push(4);
          }
          if(temp.type.value=="Баасан"){
              tempArray.push(5);
          }
          if(temp.type.value=="Бямба"){
              tempArray.push(6);
          }
          if(temp.type.value=="Ням"){
              tempArray.push(7);
          }
      }
      
      let bubbleSort = (inputArr,body) => {
          let len = inputArr.length;
          for (let i = 0; i < len; i++) {
              for (let j = 0; j < len; j++) {
                  if (inputArr[j] > inputArr[j + 1]) {
                      let tmp = inputArr[j];
                      let nicetemp = body[j];
                      inputArr[j] = inputArr[j + 1];
                      body[j]=body[j+1];
                      inputArr[j + 1] = tmp;
                      body[j+1]=nicetemp;

                  }
              }
          }
          return body;
      };
      
      bubbleSort(tempArray,lessons);

      var it = 0;
      var elements=[];
        for (var i=0; i<rooms.length; i++){ 
          it++;
          if(it>10) break;
          var instance = rooms[i];
          elements.push({
            "title":instance.department.value+" "+instance.label1.value,
            "subtitle":instance.termType.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload":instance.department.value+"-"+instance.label1.value+" өрөөний дэлгэрэнгүй" 
              }
            ]
          });
      }
      var  messageData = {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":elements
            }
          },
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Дараагийнх",
              "payload":"<POSTBACK_PAYLOAD>"
            }
          ]
        }
    return messageData;

    }
    //7 uruunii delgerengui
    roomDetails(room){
      var messageData = {
        "text": "*"+ room.type.value+" "+room.number.value + "*\n"+
                "*Харьяалагдах тэнхим*: "+room.dep.value+" \n"+
                "*Суудлын тоо*: "+room.seat.value+" \n"+
                "*Проектор*: "+ room.val.value+"\n"+
                "*Байр*: "+room.build.value
      }
      return messageData;
    }
    //8 hicheeliin delgerengui 
    courseDetails(course){

      var messageData = {
        "text": "*"+course.courseName.value+" "+course.courseCredit.value+"*\n"+
                "*Сургалтын түвшин*: "+course.courseDegree.value+" \n"+
                "*Харьяалагдах тэнхим*: "+course.depLabel.value+" \n\n"+
                "*Товч агуулга*: "+course.courseDescrip.value+"\n",
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Багш",
            "payload":course.courseName.value +" хичээлийг хэн заадаг бэ?"
          },{
            "content_type":"text",
            "title":"Хуваарь",
            "payload":course.courseName.value +" хичээлийн цагийн хуваарь?"
          }
        ]
      }
      return messageData;
    }
    //11 tusul
    projectList(projects,range){
      var messageData = [];
      if(projects.length==0){
        var TextData = {
          text:"Ийм нэртэй төсөл олдсонгүй."
        }
        return TextData;
      }
      else if(projects.length>0&&range==0){
        var TextData ={
          text:"Нийт "+projects.length+" хичээл олдлоо."
        }
        messageData.push(TextData);
      }
      var elements= [];
      var quicker = true;
        for (var i=0; i<projects.length; i++){ 
          if(i>=range+10){ 
            quicker = false;
            break;
          }
          var instance = roprojectsoms[i];
          elements.push({
            "title":instance.ProjectName.value,
            "subtitle":instance.Period.value,
            "buttons":[
              {
                "type":"postback",
                "title":"Дэлгэрэнгүй",
                "payload":instance.ProjectName.value+" төслийн дэлгэрэнгүй мэдээлэл?"
              }
            ]
          });
      }
      var  messageAttachment = {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":elements
            }
          }
        }
        if(quicker == false){
          messageAttachment["quick_replies"]=[
            {
              "content_type":"text",
              "title":"Дараагийнх",
              "payload":"nextTenofLastQuestiontgeedgoynuutsug"
            }
          ];
        }
    messageData.push(messageAttachment);
    return messageData;
    }
    //12 sudalgaa

    //13 tusliin delgerengui
    projectDetails(project){

      var messageData = {
        "text": "*"+project.ProjectName.value+"*\n"+
                "*Төслийн үндсэн төрөл*: "+project.MainType.value+" \n"+
                "*Төслийн төрөл*: "+project.projectType.value+" \n"+
                "*Харьяалах байгууллага*: "+project.Organ.value+" \n"+
                "*Харьяа тэнхим*: "+project.Depar.value+" \n"+ 
                "*Санхүүжүүлэгч байгууллага*: "+project.FundingOrgan.value+" \n"+
                "*Төслийн удирдагч*: "+project.ProjectManager.value+" \n"+
                "*Хэрэгжих хугацаа*: "+project.Period.value+" \n"+
                "*Санхүүжүүлэлтийн дүн*: "+project.FundingAmount.value
      }
      return messageData;
    }
}
module.exports.FbViewHelper = FbViewHelper;