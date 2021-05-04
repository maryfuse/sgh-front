var output="";
var thisMessage;
const BASEURL = 'http://localhost:8888';

$(document).ready(async function () {   
  ckeConfig =   { 
    enterMode : CKEDITOR.ENTER_BR,
    height: 300,
    toolbar: [
      { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'PasteText', '-', 'Undo', 'Redo' ] },
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript','-', 'RemoveFormat' ] },
      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },'/',
      { name: 'styles' , items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
  		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    ]
    }
    CKEDITOR.replace( 'message',ckeConfig);
    CKEDITOR.replace( 'modal-message',ckeConfig);
    try{
    //   output = [
    //     {
    //         "id": "15",
    //         "name": "Salam",
    //         "department": "Department A",
    //         "message": "Hi ",
    //         "fileUpload": "data:image/png;base64,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",
    //         "dateCreate": "2021-04-21 17:09:46"
    //     },
    //     {
    //         "id": "16",
    //         "name": "Salam",
    //         "department": "Department B",
    //         "message": "Hi",
    //         "fileUpload": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAySURBVHgB7dYxEQAwDMSwpPw5t+XwS3InIfDovl8Ndmo4gQDAbu0HQwIBgN38YEpg6gFMKwwK4Xmo2QAAAABJRU5ErkJggg==",
    //         "dateCreate": "2021-04-21 17:10:12"
    //     },
    //   {
    //       "id": "17",
    //       "name": "Hoho",
    //       "department": "Department C",
    //       "message": "Hi",
    //       "fileUpload": "-",
    //       "dateCreate": "2021-04-21 17:10:12"
    //   },
    //   {
    //       "id": "18",
    //       "name": "Hoho",
    //       "department": "Department C",
    //       "message": "Hi",
    //       "fileUpload": "-",
    //       "dateCreate": "2021-04-21 17:10:12"
    //   },
    //   {
    //       "id": "19",
    //       "name": "Hoho",
    //       "department": "Department B",
    //       "message": "Hi",
    //       "fileUpload": "-",
    //       "dateCreate": "2021-04-21 17:10:12"
    //   },
    //   {
    //       "id": "20",
    //       "name": "Hoho",
    //       "department": "Department C",
    //       "message": "Hi",
    //       "fileUpload": "-",
    //       "dateCreate": "2021-04-21 17:10:12"
    //   }
    // ]
      
        const result= await $.getJSON(`${BASEURL}/greeting`)  
        console.log(result)
        if(result.status == "success"){
            // for(let i=0; i<result.data.length;i++){
                // output += "<div class='contain'><h3>"+result.data[i].name +
                // "</h3><sub>"+result.data[i].department + 
                // "</sub><br><img alt='img' src='"+result.data[i].fileUpload+
                // "'><p>"+ result.data[i].message +"</p></div>";
            // }
            // $(".data").html(output);
            output = result.data;
        }
    }
    catch(e){
        console.log("FAIL", e)
    }
    initMap()
}); 

$(function () {
    // $('#submit').on('click',function (e) {
    //     postMessage();
    //     e.preventDefault();
    // });

  $(document).on("click", ".del-btn", function(e){
    deleteMessage($(this).attr("value"));
  });
  
  $(document).on("click", ".put-btn", function(e){
    showMessage($(this).attr("value"));
  });
  
  $(document).on("click", "#modal-submit", function(e){
    updateMessage();
  });
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

const convertBase64 = () =>{
    const b= $('#upload').prop('files')[0];
     
    if(b.size > 1048576){
        alert("File is too big!");
        b.value = "";
     }else{
        return new Promise(function(resolve) {
            var reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result)
            }
            reader.readAsDataURL(b);
        })
    }        
}



const postMessage = async () => {
    let name = $('#name').val()
    let department = $('#department').val()
    let message = CKEDITOR.instances['message'].getData();
    let convertImg = $('#upload').prop('files')[0] ? await convertBase64() : "-";

    console.log(name, department, message, convertImg)
    if(name && department && message){
        $.ajax({
            type: 'post',
            url: '${BASEURL}/greeting',
            data: {
                name,
                department,
                message,
                fileUpload: convertImg
            },
            success: function (a) {
                console.log("Success")
                console.log(a)
            }
        });

    }else{
        alert("Your data is not Complete")
    }  
}

const showMessage = async (id) => {
  thisMessage = output.find((x)=>x.id == id)
  $('input#modal-name').val(thisMessage.name);
  $('#modal-department').val(thisMessage.department);
  CKEDITOR.instances['modal-message'].setData(thisMessage.message);
}

const updateMessage = async () => {
  let name = $('#modal-name').val()
  let department = $('#modal-department').val()
  let message = CKEDITOR.instances['modal-message'].getData();
  let convertImg = $('#modal-upload').prop('files')[0] ? await convertBase64() : thisMessage.fileUpload;
  // console.log(name, department, message, convertImg)

  if(name && department && message){
      $.ajax({
          type: 'put',
          url: `${BASEURL}/greeting?id=${thisMessage.id}`,
          data: {
              name,
              department,
              message,
              fileUpload: convertImg
          },
          success: function (a) {
              console.log("Success")
              console.log(a)
              thisMessage = "";
          }
      });

    }else{
        alert("Your data is not Complete")
    }  
    location.reload();
}

const deleteMessage = async (id) =>{
  if(id){
    $.ajax({
        type: 'delete',
        url: `${BASEURL}/greeting?id=${id}`,
        success: function (a) {
            console.log("Success")
            console.log(a)
        }
    });
    alert("DELETE ID " + id);
    location.reload();
}else{
    alert("No valid Message id")
}  
}


// Function on Map in MP
let map;


mStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
function initMap(){
  console.log("init gmap");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:1.2794821, lng: 103.8348188},
    zoom: 16.7,
    
    mapId: '42533c639151e1ec',
    disableDefaultUI: true,
    zoomControl: true,
    styles: mStyle
  });
  
  var infoWindows = [];

  const location = [{
    name:"Department A",
    maxLat:1.2806186,
    minLat:1.2796678,
    maxLng:103.8389192,
    minLng:103.8360109
  },{
    name:"Department B",
    maxLat:1.2812340,
    minLat:1.2787287,
    maxLng:103.8342821,
    minLng:103.8309835
  },{
    name:"Department C",
    maxLat:1.2796678,
    minLat:1.2766678,
    maxLng:103.8360109,
    minLng:103.8345681
  }];

  // Take Map Data
  for(let i=0;i<output.length;i++){
      var contentString ="<div class='contain' id='msg-"+output[i].id+
      "'><div class='msg-btn'><button class='btn del-btn pull-right' value='"+output[i].id+
      "'><i class='fa fa-trash'></i></button><button class='btn put-btn pull-right' data-toggle='modal' data-target='#exampleModal' value='"+output[i].id+
      "'><i class='fa fa-edit'></i></button></div><span class='title-marker'>&quot;"+ output[i].message +
      "&quot;</span><p class='msg-sender'>From "+output[i].name+" ("+output[i].department + 
      ")</p>";
      if(output[i].fileUpload  != "-"){
        contentString +="<br><img alt='img' src='"+output[i].fileUpload+"'>";
      }
      contentString +="</div>";
      
      //Creating Info Popup
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      var icon_marker = {
        url: './icon.png',
        size: new google.maps.Size(30, 30),
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
      }
      //Gather all infowindow    
      infoWindows.push(infowindow);

      //Give Random
      let thisLoc = location.find((l)=> l.name == output[i].department);
      ranLat = Math.random() * (thisLoc.maxLat - thisLoc.minLat) + thisLoc.minLat;
      ranLng = Math.random() * (thisLoc.maxLng - thisLoc.minLng) + thisLoc.minLng;
      console.log(ranLat, ranLng)

      //Add Marker to Maps
      let marker = new google.maps.Marker({
        position: 
        {
          lat: ranLat, 
          lng: ranLng

        },
        title: output[i].name+i,
        icon: icon_marker,
        optimized: false,
        map
      });
    
    google.maps.event.addListener(marker, "click", function () {
      closeAllInfoWindow();
      infowindow.open(map, this);
      // map.setCenter(this.getPosition()); 
      // map.setZoom(10);
    });
    // marker.setMap(map);
  }    

 


  
  const closeAllInfoWindow = () => {
    for(i=0;i<infoWindows.length;i++){
      infoWindows[i].close();
    }  
  }
}