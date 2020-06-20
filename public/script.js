var selected_file;
document.getElementById("fileUpload").addEventListener("change", event => {
  selected_file = event.target.files[0];
});
document.getElementById("uploadExls").addEventListener("click", event => {
  if (selected_file) {
    document.getElementById("loader").style.display = "inline-block";
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selected_file);
    fileReader.onload = event => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log(workbook);
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );

        fetch("/upload", {
          method: "POST",
          body: JSON.stringify(rowObject),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(response => {
            if (response == 1) alert("Uploaded Successfully");

            document.getElementById("loader").style.display = "none";
          });
      });
    };
  }
});
document.getElementById("entry").addEventListener("click", () => {
  var uid = document.getElementById("uid_entry").value;
  var date = document.getElementById("date_entry").value;
  var date1 = new Date("1899-12-30");
  date = new Date(date);
  var diff = (date - date1) / (1000 * 3600 * 24);
  
    document.getElementById("loader1").style.display = "inline-block";
  fetch("/callit", { method: "GET" })
    .then(response => response.json())
    .then(data => {var i;
      for (i = 0; i < data.length; i++)
        if (uid == data[i]["Emp ID"] && diff == parseInt(data[i].Date)) {
          
    document.getElementById("loader1").style.display = "none";
          var div1 = document.getElementById("candidate");
          div1.style.display="block";
          var div = div1.getElementsByTagName("span");
          for (var j = 0; j < div.length; j++) {
            div[j].classList.add("font-weight-bold");
          }
          div[0].innerHTML = data[i].UID;
          div[1].innerHTML = settingdate(data[i].Date);
          div[2].innerHTML = data[i]["Emp ID"];
          div[3].innerHTML = data[i]["Agent ID"];
          div[4].innerHTML = data[i]["Agent Name"];
          div[5].innerHTML = data[i]["Skill"];
          div[6].innerHTML = data[i]["Profile"];
          div[7].innerHTML = data[i]["Team Leader"];
          div[8].innerHTML = data[i]["PreShift"];
          div[9].innerHTML = data[i]["AM"];
          div[10].innerHTML = data[i]["Shift"];
          div[11].innerHTML = data[i]["LOB"];
          div[12].innerHTML = settingdate(data[i]["DOJ"]);
          div[13].innerHTML = settingdate(data[i]["FHD"]);
          div[14].innerHTML = data[i]["Roster"];
          div[15].innerHTML = data[i]["Seating Plan"];
          div[16].innerHTML = data[i]["ACDCalls"];
          div[17].innerHTML = data[i]["Extn_Outcalls"];
          div[18].innerHTML = data[i]["AHT"];
          div[19].innerHTML = settingtime(data[i]["ACDTime"]);
          div[20].innerHTML = settingtime(data[i]["ACWTime"]);
          div[21].innerHTML = settingtime(data[i]["RingTime"]);
          div[22].innerHTML = settingtime(data[i]["HoldTime"]);
          div[23].innerHTML = settingtime(data[i]["OtherTime"]);
          div[24].innerHTML = settingtime(data[i]["BreakAUX"]);
          div[25].innerHTML = settingtime(data[i]["BioBreak"]);
          div[26].innerHTML = settingtime(data[i]["TeaBreak"]);
          div[27].innerHTML = settingtime(data[i]["LunchBreak"]);
          div[28].innerHTML = settingtime(data[i]["BriefingAux"]);
          div[29].innerHTML = settingtime(data[i]["Missed Attend Aux"]);
          div[30].innerHTML = settingtime(data[i]["Extended ACW Aux"]);
          div[31].innerHTML = settingtime(data[i]["TechnicalAux"]);
          div[32].innerHTML = settingtime(data[i]["MedicalAux"]);
          div[33].innerHTML = settingtime(data[i]["SystemOutage"]);
          div[34].innerHTML = settingtime(data[i]["IdleAux"]);
          div[35].innerHTML = settingtime(data[i]["AvailTime"]);
          div[36].innerHTML = settingtime(data[i]["StaffTime"]);
          div[37].innerHTML = settingtime(data[i]["Net Login"]);
          div[38].innerHTML = settingtime(data[i]["Downtime as Per MIS"]);
          div[39].innerHTML = settingtime(data[i]["Downtime 1"]);
          div[40].innerHTML = data[i]["Reason 1"];
          div[41].innerHTML = settingtime(data[i]["Downtime 2"]);
          div[42].innerHTML = data[i]["Reason 2"];
          div[43].innerHTML = settingtime(data[i]["Downtime 3"]);
          div[44].innerHTML = data[i]["Reason 3"];
          div[45].innerHTML = settingtime(data[i]["Downtime 4"]);
          div[46].innerHTML = data[i]["Reason 4"];
          div[47].innerHTML = settingtime(data[i]["Average Response Time"]);
          div[48].innerHTML = data[i]["Event Created"];
          div[49].innerHTML = data[i]["Total Response Time"];
          div[50].innerHTML = data[i]["CQ Score"];
          div[51].innerHTML = data[i]["Audit Count"];
          div[52].innerHTML = data[i]["Fatal Flag"];
          div[53].innerHTML = data[i]["TQS"];
          div[54].innerHTML = data[i]["Attendance by Ops"];
          div[55].innerHTML = data[i]["Attendance"];
          div[56].innerHTML = data[i]["Mandays"];
          div[57].innerHTML = data[i]["Absent Count"];
          div[58].innerHTML = data[i]["WO Count"];
          div[59].innerHTML = data[i]["Leave Count"];
          div[60].innerHTML = data[i]["Rostered"];
          div[61].innerHTML = data[i]["Attrition_Count"];
          div[62].innerHTML = data[i]["Opening Count"];
          div[63].innerHTML = data[i]["Closing Count"];
          div[64].innerHTML = settingtime(data[i]["Net Login With Downtime"]);
          div[65].innerHTML = data[i]["OP Count"];
          div[66].innerHTML = data[i]["CP Count"];
          div[67].innerHTML = data[i]["Test"];
          div[68].innerHTML = data[i]["Double WO check"];
          break;
        }
                   if(i==data.length)
                   {alert("Not Found");
    document.getElementById("loader1").style.display = "none";}
    });
});
function settingdate(n) {
  var d = new Date("12-30-1899");
  d.setDate(d.getDate() + parseInt(n));
  return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
}
function settingtime(n)
{
  var date = new Date(null);
  date.setSeconds(Math.floor(parseFloat(n)*24*60*60)); // specify value for SECONDS here
return date.toISOString().substr(11, 8);
}
