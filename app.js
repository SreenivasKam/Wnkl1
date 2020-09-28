var firebaseConfig = {
  apiKey: "AIzaSyC1mqcSSnilhx-B_ic-OBOD2iuRZgDz7oQ",
  authDomain: "wnkl-f55a7.firebaseapp.com",
  databaseURL: "https://wnkl-f55a7.firebaseio.com",
  projectId: "wnkl-f55a7",
  storageBucket: "wnkl-f55a7.appspot.com",
  messagingSenderId: "398834040326",
  appId: "1:398834040326:web:9312d9e7b5cf5968c28d87",
  measurementId: "G-WENDG8P411"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.firestore();
var id;

function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (password == "" && email == "") {
    alert("Please enter all the Fields");
  } else {
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href = "dashboard.html";
      } else {
        // User is signed out.
        // ...
      }
    });
  }
}

function resetPassword() {
  window.location.href = "reset.html";
}

function requestreset() {
  var email = document.getElementById('emailid').value;
  //const reset1 = auth.sendPasswordResetEmail(email);
  //reset1.catch(e => alert(e.message));
  alert("Please check your inbox for resetPassword link");
  window.history.back();
}

function products() {
  window.location.href = "products.html";
}



function appendRow() {
  document.getElementById('my-table').innerHTML = '<thead><tr><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Current Price</th><th scope="col">Stock Details</th><th scope="col">View product</th></tr></thead>';
  var name = document.getElementById('name1').value;
  var brand1 = document.getElementById('name2').value;
  var cat = document.getElementById('name3').value;
  var year = document.getElementById('name4').value;
  var lic = document.getElementById('name5').value;
  if (name != "" && brand1 != "" && cat != "" && year != null && lic != null) {
    db.collection("products").add({
        name: name,
        category: brand1,
        selling_price: cat,
        instock: year,
        details: lic
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });


    myfunction7();
    document.getElementById('adds').classList.add("invisible");
    document.getElementById("myForm").reset();
  } else {
    window.alert("Please enter all the fields");
  }
}

function appendRow2() {
  document.getElementById('services-table').innerHTML = '<thead><tr><th scope="col">Name</th><th scope="col">Brand</th><th scope="col">Year</th><th scope="col">Category</th></tr></thead>';
  var name = document.getElementById('name1').value;
  var brand1 = document.getElementById('brand').value;
  var year = document.getElementById('inputyear').value;
  var cat = document.getElementById('Category').value;
  if (name != "" && brand1 != "" && cat != "" && year != null) {
    db.collection("services").add({
        Name: name,
        Category: cat,
        Brand: brand1,
        Year: year
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });


    myfunction9();
    document.getElementById('adds').classList.add("invisible");
    document.getElementById("myForm").reset();
  } else {
    window.alert("Please enter all the fields");
  }

}

function cancel() {
  document.getElementById('adds').classList.add("invisible");
  document.getElementById("myForm").reset();
}
function picker1() {
  myFunction4();
  //window.alert("The CSV FILE SHOULD ORDER OF NAME,BRANDNAME,YEAR,LICNO,CATEGORY\n IF NOT PLEASE CANCEL BELOW");
  document.getElementById('picker').classList.remove("invisible");
  document.getElementById('pather').addEventListener('change', function() {
    var fr = new FileReader();
    fr.onload = function() {
      document.getElementById('picker').classList.add("invisible");
      document.getElementById('omdas').classList.add("invisible");
      var arr = fr.result.split("\n");
      for (var i = 0; i < arr.length - 1; i++) {
        importdara(arr[i]);
      }
    }
    fr.readAsText(this.files[0]);
  });
  document.getElementById("sdss").reset();
}

function importdara(url1) {
  var cell_data = url1.split(",");
  var cell_count =0;
  db.collection("products").add({
      name: cell_data[cell_count++],
      category: cell_data[cell_count++],
      selling_price: cell_data[cell_count++],
      instock: cell_data[cell_count++],
      details: cell_data[cell_count]
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      myFunction8();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}



function ok1() {
  window.alert("sihcoasid");
  document.getElementById("sdss").reset();
  document.getElementById('omdas').classList.add("invisible");
}

function cancel1() {
  document.getElementById('picker').classList.add("invisible");
}

function vendors() {
  window.location.href = "vendors.html";

  //document.getElementById('getss').onclick();

}

function viwes(data) {
  //window.location.href = "vies.html";
  //document.getElementById('hids').classList.add("invisible");
  document.getElementById('prs').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  document.getElementById('bys').innerHTML = "";
  document.getElementById('profile-table').innerHTML = "";
  mapper(data);
}

function historysqs() {
  document.getElementById('prs').classList.add("invisible");
  document.getElementById('bakker').classList.add("invisible");
  document.getElementById('bys').innerHTML = "";
  document.getElementById('profile-table').innerHTML = "";


}

function historysqs2() {
  document.getElementById('prs').classList.add("invisible");
  document.getElementById('bakker').classList.add("invisible");
  document.getElementById('profile-table').innerHTML = "";
}

function dasher() {
  window.location.href = "dashboard.html";
}

function mapper(data1) {

  var name = localStorage.getItem("firstname");
  //window.alert(name);
  var docRef = db.collection("stores").doc(data1);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      document.getElementById('sets').src = doc.data().imageUrl;
      var table_data = '<tr>';
      table_data += '<th>Establishment Name</th><td>' + doc.data().establishment_name + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Proprietor Name</th><td>' + doc.data().proprietor_name + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Email</th><td>' + doc.data().Email + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Seller_category</th><td>' + doc.data().seller_category + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Service_radius</th><td>' + doc.data().service_radius + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Store_type</th><td>' + doc.data().store_type + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Area</th><td>' + doc.data().area + '</td>';
      table_data += '</tr>';

      $("#profile-table").append(table_data);
      var board1 = document.createElement('button');
      board1.className = "btn btn-dark btn-lg spacs";
      board1.id = data1;
      board1.onclick = "assign(this.id)"
      board1.innerHTML = "Assign vendor"
      document.getElementById('bys').appendChild(board1);
      var board2 = document.createElement('button');
      board2.className = "btn btn-dark btn-lg spacs";
      board2.id = "myDynamicallyAddedElementID2"
      board2.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID2') {
          approve(data1);
          //window.alert(data1);
        }
      });
      board2.innerHTML = "Approve vendor"
      document.getElementById('bys').appendChild(board2);
      var board3 = document.createElement('button');
      board3.className = "btn btn-dark btn-lg spacs";
      board3.id = "myDynamicallyAddedElementID"
      board3.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID') {
          rent(data1);
          //window.alert(data1);
        }
      });

      board3.innerHTML = "Rent"

      //board3.ondblclick = rent(data1);
      document.getElementById('bys').appendChild(board3);


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

}

function rent1(data) {
  alert("jkhadsgfjkgasdkfj =====" + data);

}

function process(data) {

}

function homes() {
  window.location.href = "index.html"
}
var nesdata = [];

function gesd() {
  var count = 0;


  db.collection("stores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      v = doc.id;
      //window.alert(doc.id);
      db.collection("stores").doc(doc.id).update({
          uid: v
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      // doc.data() is never undefined for query doc snapshots

      count = count + 1;
      var table_data = '<tr>';
      table_data += '<th>' + count + '</th>';
      //localStorage["key"] = doc.id;
      table_data += '<th>' + doc.data().establishment_name + '</th>';
      table_data += '<td>' + doc.data().proprietor_name + '</td>';
      table_data += '<td>' + doc.data().email + '</td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "viwes(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button"><a href="#prs">View</a></button></td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "assign(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button">Assign</button></td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "rent(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button">Rent</button></td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "approve(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button">Approve</button></td>';
      if (doc.data().status == "red") {
        table_data += '<td><button id="' + doc.id + '"  class ="viewer btn btn-danger" type="button" name="button">Approval Pending</button></td>';
      } else {
        table_data += '<td><button id="' + doc.id + '"  class ="viewer btn btn-success" type="button" name="button">Approved</button></td>';

      }

      table_data += '</tr>';
      $("#vendor-table").append(table_data);
      //set a event listener and try the function
      localStorage.setItem("firstname", doc.id);
    });
  });
  //document.getElementById('getss').classList.add("invisible");
  //document.getElementById('dot').classList.remove("invisible");
}

function rent(data) {
  var Destination;
  var docRef = db.collection("stores").doc(data);
  var user = firebase.auth().currentUser;
  //window.alert(user.email);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      Destination = doc.data().Email;
      if (Destination != user.email) {

        db.collection("messages").add({
            destination: Destination,
            sender: user.email,
            text: "Campany has provide for rent",
            status: "unread",
            time: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        var washingtonRef = db.collection("stores").doc(data);
        return washingtonRef.update({
            message: "Campany has provide for rent"
          })
          .then(function() {
            myFunction2();
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        myFunction3();
      }


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });





}

function approve(data) {
  var docRef = db.collection("stores").doc(data);

  docRef.get().then(function(doc) {
    if (doc.data().status == "red") {
      myFunction();
      var washingtonRef = db.collection("stores").doc(data);
      return washingtonRef.update({
          status: "green"
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });

    } else {
      myFunction1();
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}



function ads() {
  window.location.href = "ads.html"
}

function cater() {
  document.getElementById('gfd').innerHTML="";
  document.getElementById('topname').innerHTML = "Catalog";
  document.getElementById('con').classList.add("invisible");
  document.getElementById('catl').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  db.collection("catalog").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        var board = document.createElement('div');
        board.className = "col-lg-4 col-md-4";
        board.innerHTML = '<div class="card mb-4 shadow-sm"><img src="'+doc.data().imageUrl+'" class="bd-placeholder-img card-img-top p-2" alt="img" width="col-lg-4" height="200px"><hr><div class="card-body"><h6 class="card-text">'+doc.data().Details+'</h6></div></div>;'
        document.getElementById('gfd').appendChild(board);

    });
});


var board = document.createElement('div');
board.className = "col-lg-4 col-md-4";
board.innerHTML = '<div class="card mb-4 shadow-sm"><div class="card-body"><i onclick="cata()" class="fas fa-plus  fa-3x cen"></i><h6 onclick="cata()" class="card-text cen">Add new Catalog</h6><a href="#qwe"><button type="button" onclick="cata()" name="button" class="btn btn-secondary cen">ADD</button></a></div></div>';
document.getElementById('gfd').appendChild(board);

}

function historys() {
  document.getElementById('topname').innerHTML = "More";
  document.getElementById('con').classList.remove("invisible");
  document.getElementById('catl').classList.add("invisible");
  document.getElementById('bakker').classList.add("invisible");
  document.getElementById('asd').classList.add("invisible");
  document.getElementById('pacs').classList.add("invisible");

}

function adder() {
  document.getElementById('gfd2').innerHTML = "";
  document.getElementById('topname').innerHTML = "Advertisements";
  document.getElementById('con').classList.add("invisible");
  document.getElementById('asd').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  db.collection("ads").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        var board = document.createElement('div');
        board.className = "col-lg-4 col-md-4";
        board.innerHTML = '<div class="card mb-4 shadow-sm"><img src="'+doc.data().Url+'" class="bd-placeholder-img card-img-top p-2" alt="img" width="col-lg-4" height="200px"><hr><div class="card-body"><h4 class="card-text white">'+doc.data().title+'</h4><h6>'+doc.data().category+'</h6></div></div>;'
        document.getElementById('gfd2').appendChild(board);

    });
});


var board = document.createElement('div');
board.className = "col-lg-4 col-md-4";
board.innerHTML = '<div class="card mb-4 shadow-sm"><div class="card-body"><i onclick="adaa()" class="fas fa-plus  fa-3x cen"></i><h6 onclick="adaa()" class="card-text cen">Add new Catalog</h6><a href="#qwe2"><button type="button" onclick="adaa()" name="button" class="btn btn-secondary cen">ADD</button></a></div></div>';
document.getElementById('gfd2').appendChild(board);



}
var count = 0;
var data = [];

function packs() {
  var count = 0;

  document.getElementById('topname').innerHTML = "Packages";
  document.getElementById('con').classList.add("invisible");
  document.getElementById('packs-table').innerHTML = '<thead><tr><th scope="col">Sr. No</th><th scope="col">Packages Name</th><th scope="col">Features</th><th scope="col">Pricing</th><th scope="col">View Info</th><th scope="col">Edit</th><th scope="col">Delete</th></tr></thead>';
  //document.getElementById('asd').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  document.getElementById('pacs').classList.remove("invisible");


  db.collection("packages").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots

      count = count + 1;
      data.push(doc.id);
      //console.log(doc.id);
      //window.alert(doc.id);

      var table_data = '<tr>';
      table_data += '<th>' + count + '</th>';
      //localStorage["key"] = doc.id;
      table_data += '<th>' + doc.data().Packages_name + '</th>';
      table_data += '<td>' + doc.data().Features + '</td>';
      table_data += '<td>' + doc.data().Pricing + '</td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "vsd(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button" data-toggle="modal" data-target="#exampleModal">View</button></td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "esd(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button">Edit</button></td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "dsd(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button">Delete</button></td>';
      table_data += '</tr>';
      $("#packs-table").append(table_data);
      //console.log(data[1]);
      //set a event listener and try the function
      //localStorage.setItem("firstname", doc.id);
    });
  });

}

function esd(das) {
  document.getElementById('eds1').classList.remove('invisible');
  var name = document.getElementById('name1').value;
  var feat = document.getElementById('feature').value;
  var price = document.getElementById('price').value;
  var exp = document.getElementById('expiry').value;
  var tas = document.getElementById('tax').value;

  if (name != "" && feat != "" && price != "" && exp != "" && tas != "") {
    db.collection("packages").doc(das).update({
        Features: feat,
        Pricing: price,
        Packages_name: name,
        Expiry: exp,
        Tax: tas

      })
      .then(function() {
        console.log("Document successfully updated!");
        window.alert("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

}

function dsd(dsa) {
  db.collection("packages").doc(dsa).delete().then(function() {
    console.log("Document successfully deleted!");
    myfunction5();
    packs();
  }).catch(function(error) {
    console.error("Error removing document: ", error);
    window.alert("Error removing document: ", error);
  });

}

function cancela() {
  document.getElementById('eds1').classList.add('invisible');
  document.getElementById("myForm").reset();
}

function vsd(clicked) {
  document.getElementById('indo-table').innerHTML = '<thead><tr><th scope="col">Packages Name</th><th scope="col">Features</th><th scope="col">Pricing</th></tr></thead>';
  document.getElementById('mdbody').innerHTML = "";
  var docRef = db.collection("packages").doc(clicked);
  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var table_data = '<tr>';
      table_data += '<th>' + doc.data().Packages_name + '</th>';
      table_data += '<td>' + doc.data().Features + '</td>';
      table_data += '<td>' + doc.data().Pricing + '</td>';
      table_data += '</tr>';

      $("#indo-table").append(table_data);
      var board2 = document.createElement('button');
      board2.className = "btn btn-dark btn-lg spacs";
      board2.id = "myDynamicallyAddedElementID2"
      board2.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID2') {
          document.getElementById("hellow").click();
          esd(clicked);
          //window.alert(data1);
        }
      });
      board2.innerHTML = "Edit"
      document.getElementById('mdbody').appendChild(board2);
      var board3 = document.createElement('button');
      board3.className = "btn btn-dark btn-lg spacs";
      board3.id = "myDynamicallyAddedElementID"
      board3.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID') {
          document.getElementById("hellow").click();
          dsd(clicked);
          //window.alert(data1);
        }
      });

      board3.innerHTML = "Delete"

      //board3.ondblclick = rent(data1);
      document.getElementById('mdbody').appendChild(board3);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
}

function addpack() {

  var name = document.getElementById('name1').value;
  var feat = document.getElementById('feature').value;
  var price = document.getElementById('price').value;
  var exp = document.getElementById('expiry').value;
  var tas = document.getElementById('tax').value;

  if (name != "" && feat != "" && price != "") {
    document.getElementById('adds').classList.add("invisible");
    document.getElementById("myForm").reset();
    db.collection("packages").add({
      Features: feat,
      Pricing: price,
      Packages_name: name,
      Expiry: exp,
      Tax: tas
    }).then(function() {
      console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });
    myfunction6();

  } else {
    window.alert("Please enter all the fields");
  }
  document.getElementById('adds').classList.add("invisible");
  document.getElementById("myForm").reset();
}

function addRow() {
  //window.alert(data[1]);
  document.getElementById('adds').classList.remove("invisible");
}

function customer() {
  window.location.href = "customers.html"

}

function updateusername() {
  var em = document.getElementById('exampleDropdownFormEmail1').value;
  if (em == "") {
    window.alert("Please Enter All the fields");
  } else {
    var user = firebase.auth().currentUser;
    console.log(user);
    window.alert(em);
    user.updateEmail(em).then(function() {
      window.alert("Update Successfull");
    }).catch(function(error) {

      console.log(error);
      window.alert(error);
    });
  }
}

function gedas() {
  var user = firebase.auth().currentUser;
  console.log(user);

}

function services() {
  window.location.href = "services.html"


}

function mapps() {
  db.collection("services").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var table_data = '<tr>';
      table_data += '<th>' + doc.data().Name + '</th>';
      table_data += '<td>' + doc.data().Brand + '</td>';
      table_data += '<td>' + doc.data().Year + '</td>';
      table_data += '<td>' + doc.data().Category + '</td>';
      table_data += '</tr>';
      $("#services-table").append(table_data);
    });
  });
}

function gesd1() {
  var count = 0;

  db.collection("stores").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots

      count = count + 1;
      var table_data = '<tr>';
      table_data += '<th>' + count + '</th>';
      //localStorage["key"] = doc.id;
      table_data += '<th>' + doc.data().establishment_name + '</th>';
      table_data += '<td>' + doc.data().proprietor_name + '</td>';
      table_data += '<td>' + doc.data().Email + '</td>';
      table_data += '<td><button id="' + doc.id + '" onclick = "viwe(this.id)" class ="viewer btn btn-outline-dark" type="button" name="button"><a href="#prs">View</a></button></td>';
      table_data += '</tr>';
      $("#vendor-table").append(table_data);
      //set a event listener and try the function
      localStorage.setItem("firstname", doc.id);
    });
  });
  document.getElementById('getss').classList.add("invisible");


}

function viwe(data) {
  document.getElementById('prs').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  document.getElementById('bys').innerHTML = "";
  document.getElementById('syncs-table').innerHTML = "";
  mapper1(data);

}

function mapper1(data1) {
  var name = localStorage.getItem("firstname");
  //window.alert(name);
  var docRef = db.collection("stores").doc(data1);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      document.getElementById('sets').src = doc.data().imageUrl;
      var table_data = '<tr>';
      table_data += '<th>Establishment Name</th><td>' + doc.data().establishment_name + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Proprietor Name</th><td>' + doc.data().proprietor_name + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Email</th><td>' + doc.data().Email + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Seller_category</th><td>' + doc.data().seller_category + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Service_radius</th><td>' + doc.data().service_radius + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Store_type</th><td>' + doc.data().store_type + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Area</th><td>' + doc.data().area + '</td>';
      table_data += '</tr>';

      $("#syncs-table").append(table_data);
      var board1 = document.createElement('button');
      board1.className = "btn btn-dark btn-lg spacs";
      board1.id = data1;
      board1.onclick = "assign(this.id)"
      board1.innerHTML = "Assign vendor"
      document.getElementById('bys').appendChild(board1);
      var board2 = document.createElement('button');
      board2.className = "btn btn-dark btn-lg spacs";
      board2.id = "myDynamicallyAddedElementID2"
      board2.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID2') {
          approve(data1);
          //window.alert(data1);
        }
      });
      board2.innerHTML = "Aprrove vendor"
      document.getElementById('bys').appendChild(board2);
      var board3 = document.createElement('button');
      board3.className = "btn btn-dark btn-lg spacs";
      board3.id = "myDynamicallyAddedElementID";
      board3.addEventListener('click', function(e) {
        if (e.target && e.target.id == 'myDynamicallyAddedElementID') {
          rent(data1);
          //window.alert(data1);
        }
      });

      board3.innerHTML = "Rent"

      //board3.ondblclick = rent(data1);
      document.getElementById('bys').appendChild(board3);


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

}

function picker2() {
  myFunction4();
  //window.alert("The CSV FILE SHOULD ORDER OF NAME,BRANDNAME,YEAR,CATEGORY\n IF NOT PLEASE CANCEL BELOW");
  document.getElementById('picker').classList.remove("invisible");
  document.getElementById('pather').addEventListener('change', function() {
    var fr = new FileReader();
    fr.onload = function() {
      document.getElementById('picker').classList.add("invisible");
      document.getElementById('omdas').classList.add("invisible");
      var arr = fr.result.split("\n");
      for (var i = 1; i < arr.length - 1; i++) {

        importdara1(arr[i]);
      }
    }
    fr.readAsText(this.files[0]);
  });
  document.getElementById("sdss").reset();

}
function picker3() {
  myFunction10();
  //window.alert("The CSV FILE SHOULD ORDER OF NAME,BRANDNAME,YEAR,CATEGORY\n IF NOT PLEASE CANCEL BELOW");
  document.getElementById('picker').classList.remove("invisible");
  document.getElementById('pather').addEventListener('change', function() {
    var fr = new FileReader();
    fr.onload = function() {
      document.getElementById('picker').classList.add("invisible");
      document.getElementById('omdas').classList.add("invisible");
      var arr = fr.result.split("\n");
      for (var i = 1; i < arr.length - 1; i++) {

        importdara2(arr[i]);
      }
    }
    fr.readAsText(this.files[0]);
  });
  document.getElementById("sdss").reset();

}

function importdara2(urlr) {
  var cell_data = urlr.split(",");
  cell_count = 0;

  if(cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""&& cell_data[cell_count++] !=""){

  cell_count = 0;
  db.collection("stores").add({
      establishment_name: cell_data[cell_count++],
      proprietor_name:  cell_data[cell_count++],
      email: cell_data[cell_count++],
      phone:cell_data[cell_count++],
      seller_category:cell_data[cell_count++],
      service_radius:cell_data[cell_count++],
      store_type:cell_data[cell_count++],
      area:cell_data[cell_count++],
      status: "red"
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      //gesd();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      myFunction10();
      picker3();
    });
  }
  else{
    myFunction10();
    picker3();
    window.alert("please enter vaild files");

  }

}

function importdara1(urlr) {
  var cell_data = urlr.split(",");
  var table_data = '<tr>';


  for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
    if (cell_count == 0) {
      table_data += '<th>' + cell_data[cell_count] + '</th>';
    } else {
      table_data += '<td>' + cell_data[cell_count] + '</td>';
    }

  }
  table_data += '</tr>';
  $("#services-table").append(table_data);
  cell_count = 0;
  db.collection("services").add({
      Name: cell_data[cell_count++],
      Brand: cell_data[cell_count++],
      Year: cell_data[cell_count++],
      Category: cell_data[cell_count++],
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

}

function myFunction() {
  document.getElementById('snackbar').innerHTML = "Vendor has to be approved"
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function myFunction1() {
  var x = document.getElementById("snackbar1");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function myFunction2() {
  document.getElementById('snackbar').innerHTML = "Vendor has been successfully rented"
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function myFunction3() {
  document.getElementById('snackbar').innerHTML = "INVALID PROCESS"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "red";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function myFunction4() {
  document.getElementById('snackbar').innerHTML = "PLEASE MAKE SURE YOU IN CORRECT FORMAT"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "red";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function myFunction10() {
  document.getElementById('snackbar').innerHTML = "PLEASE MAKE SURE YOU IN CORRECT FORMAT<br> Establishment Name Proprietor Name	Email	Seller_category	Service_radius	Store_type	Area "
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "red";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function myFunction9() {
  document.getElementById('snackbar').innerHTML = "PLEASE FILL ALL THE FIELDS"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "red";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function myFunction5() {
  document.getElementById('snackbar').innerHTML = "PLEASE MAKE SURE YOU IN CORRECT FORMAT"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "red";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function myFunction6() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  cater();
}
function myFunction7() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  adder();
}
function myFunction8() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  gesd();
}


function myfunction5() {
  document.getElementById('snackbar').innerHTML = "Record is was being successfully deleted"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function myfunction6() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  packs();
}

function myfunction7() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  rerer();
}

function myfunction9() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  mapps();
}

function myfunction8() {
  document.getElementById('snackbar').innerHTML = "Record was being added successfully"
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.style.background = "green";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 3000);
  rerer();
}

function res() {
  var user = firebase.auth().currentUser;
  //window.alert(user.email);
  var arr = [];
  var count = 0;
  db.collection("messages").where("destination", "==", user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.data().status == "unread") {
          count++;
          var board1 = document.createElement('div');
          board1.className = "classname2";
          board1.innerHTML = doc.data().sender;
          document.getElementById('notification').appendChild(board1);
          var board = document.createElement('div');
          board.className = "classname";
          board.innerHTML = doc.data().text;
          //window.alert("hell");
          //document.getElementById('dot').classList.remove("invisible");
          document.getElementById('notification').appendChild(board);
          db.collection("messages").doc(doc.id).update({
              status: "read"
            })
            .then(function() {
              console.log("Document successfully updated!");
              //window.alert("hell");

            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }


      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

}

function res2() {
  var user = firebase.auth().currentUser;
  //window.alert(user.email);
  var arr = [];
  var count = 0;
  db.collection("messages").where("sender", "==", user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (user.email == doc.data().destination) {

        } else {
          var board = document.createElement('div');
          board.className = "classname4 right";
          board.innerHTML = doc.data().text;
          document.getElementById('notification').appendChild(board);

        }


      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

  db.collection("messages").where("destination", "==", user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var board = document.createElement('div');
        board.className = "classname3 left";
        board.innerHTML = doc.data().text;
        document.getElementById('notification').appendChild(board);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

}

function hello() {
  document.getElementById('dsds').classList.add("full");
  document.getElementById('pull').classList.remove("invisible");
  document.getElementById('refs').classList.add("A");
  res();

}

function closeside() {
  document.getElementById('pull').classList.add("invisible");
  document.getElementById('refs').classList.remove("A");
  document.getElementById('dsds').classList.remove("full");

}

function rerer() {
  db.collection("products").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var html = "<tr>";
      html += "<th>" + doc.data().name + "</th>";
      html += "<td>" + doc.data().category + "</td>";
      html += "<td>" + doc.data().selling_price + "</td>";
      html += "<td>" + doc.data().instock + "</td>";
      html += '<td><button id="' + doc.id + '" onclick = "makes(this.id)" class ="viewer btn btn-dark" type="button" name="button"><a href="#prs">View</a></button></td>';
      $("#my-table").append(html);

    });
  });
}

function makes(id) {
  document.getElementById('prs').classList.remove("invisible");
  document.getElementById('bakker').classList.remove("invisible");
  document.getElementById('profile-table').innerHTML = "";

  document.getElementById('sets').src = "";
  mapd(id);

}

function mapd(data1) {

  var docRef = db.collection("products").doc(data1);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      document.getElementById('sets').src = doc.data().imageUrl;
      var table_data = '<tr>';
      table_data += '<th>Name</th><td>' + doc.data().name + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Details</th><td>' + doc.data().details + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Category</th><td>' + doc.data().category + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Instock</th><td>' + doc.data().instock + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Selling Price</th><td>' + doc.data().selling_price + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Size</th><td>' + doc.data().size + '</td>';
      table_data += '</tr><tr>';
      table_data += '<th>Offer</th><td>' + doc.data().offer + '</td>';
      table_data += '</tr>';

      $("#profile-table").append(table_data);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });


}

function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
  hr = (hr == 0) ? 12 : hr;
  hr = (hr > 12) ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;

  var time = setTimeout(function() {
    startTime()
  }, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function chats() {
  window.location.href = "chats.html"

}

function chatter() {
  document.getElementById('ins').classList.add("invisible");
  document.getElementById('leds').classList.add("pushup");
  var user = firebase.auth().currentUser;
  //window.alert(user.email);
  var arr = [];
  var count = 0;
  db.collection("messages").where("sender", "==", user.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var board1 = document.createElement('button');
        board1.className = "btn btn-block btn-outline-dark left";
        board1.id = "" + doc.id + "";
        board1.addEventListener('click', function(e) {
          if (e.target && e.target.id == doc.id) {
            presser(doc.id);
            //window.alert(doc.id);
          }
        });
        board1.innerHTML = "<div class='row'><div class='col-lg-1 midl'><img src='pro.png' class='left' width='70' height='70'></div>  <div class='col-lg-9'><h6 class='left'>" + doc.data().destination + "</h6><br><p class='left'>" + doc.data().text + "</p></div></div><hr>";
        document.getElementById('chat-table').appendChild(board1);

      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

}

function ress() {
  document.getElementById('ins').classList.remove("invisible");
  setTimeout(function() {
    chatter();
  }, 3000);

}

function presser(data) {
  console.log(data);
  //window.alert("fasdfasf");
  document.getElementById('bakker').classList.remove("invisible");
  document.getElementById('one').classList.add("invisible");
  document.getElementById('swcs').classList.add("pushup2");
  document.getElementById('limb').innerHTML = data;
  document.getElementById('swcs').classList.remove("invisible");
  res2();

}

function history2() {
  document.getElementById('bakker').classList.add("invisible");
  document.getElementById('one').classList.remove("invisible");
  document.getElementById('swcs').classList.add("invisible");
  document.getElementById('swcs').classList.remove("pushup2");


}

function logout() {
  firebase.auth().signOut().then(function() {
    window.location.href = "index.html";
  }).catch(function(error) {
    // An error happened.
  });

}

function getFilePath() {
  document.getElementById('qwe').classList.add('invisible');
  var image = document.getElementById('fileUpload').value;
  var details = document.getElementById('dada').value;
  if (details != "" && image != "") {
    //window.alert(image);
    const ref = firebase.storage().ref();
    const file = document.querySelector("#fileUpload").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        db.collection("catalog").add({
            Details: details,
            imageUrl: url,
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            myFunction6();
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

      })
      .catch(console.error);


  } else {
    myFunction5();
  //  window.alert("fasaS");
  }


}
function getFilePath2() {
  document.getElementById('qwe2').classList.add('invisible');
  var name1 = document.getElementById('title').value;
  var image = document.getElementById('fileUpload2').value;
  var details = document.getElementById('dada2').value;
  if (details != "" && image != "" && name1!="") {
    //window.alert(image);
    const ref = firebase.storage().ref();
    const file = document.querySelector("#fileUpload2").files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
        db.collection("ads").add({
            category: details,
            Url: url,
            title: name1,
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            myFunction7();
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });

      })
      .catch(console.error);


  } else {
    myFunction9();
  //  window.alert("fasaS");
  }


}

function cens() {
  document.getElementById('qwe').classList.add('invisible');

}
function cens2() {
  document.getElementById('qwe2').classList.add('invisible');

}

function cata() {
  document.getElementById('qwe').classList.remove('invisible');
}
function adaa() {
  document.getElementById('qwe2').classList.remove('invisible');
}
function appendRow3() {
  document.getElementById('vendor-table').innerHTML = '<thead><tr><th scope="col">Establishment Name</th><th scope="col">Proprietors Name</th><th scope="col">Phone Number/Email</th><th scope="col">View Profile</th><th scope="col">Assign Packages</th><th scope="col">Rent</th><th scope="col">Approve Vendor</th><th scope="col">Approve Status</th></tr></thead>';
  var name = document.getElementById('name1').value;
  var brand1 = document.getElementById('name2').value;
  var cat = document.getElementById('name3').value;
  var year = document.getElementById('name4').value;
  var lic = document.getElementById('name5').value;
  var lic1 = document.getElementById('name6').value;
  var lic2 = document.getElementById('name7').value;
  var lic3 = document.getElementById('name8').value;
  if (name != "" && brand1 != "" && cat != "" && year != null && lic != null && lic1 != null && lic2 != null && lic3 != null) {
    db.collection("stores").add({
        establishment_name: name,
        proprietor_name: brand1,
        email: cat,
        phone: year,
        seller_category: lic,
        service_radius: lic1,
        store_type: lic2,
        area: lic3,
        status: "red"
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });


    myFunction8();
    document.getElementById('adds').classList.add("invisible");
    document.getElementById("myForm").reset();
  } else {
    window.alert("Please enter all the fields");
  }


}
