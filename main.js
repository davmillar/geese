var pLoc = 0,
    events = [0],
    gameAreas = {
      a0: {
        name: "Home",
        status: "clear"
      },
      a1: {
        name: "Yard",
        status: "geese",
        choices: [
          "Pick Grass"
        ]
      },
      a2: {
        name: "Hood",
        status: "locked",
        choices: [
          "Explore Blue House",
          "Explore Yellow House"
        ]
      },
      a3: {
        name: "Alley",
        status: "locked"
      },
      a4: {
        name: "Parking School",
        status: "locked"
      },
      a5: {
        name: "Grocery Store",
        status: "locked",
        choices: [
          "Use Pricing Gun"
        ]
      },
      a6: {
        name: "The Park",
        status: "locked",
        choices: [
          "Talk to Woman"
        ]
      },
      a7: {
        name: "Recruiting Office",
        status: "locked"
      },
      a8: {
        name: "Fred\'s Buffet",
        status: "locked"
      },
      a9: {
        name: "Main St.",
        status: "locked"
      }
    },

    gid = function (id) {
      return document.getElementById(id);
    },
    hide = function (id) {
      $("#" + id).fadeOut("slow");
    },
    show = function (id) {
      $("#" + id).fadeIn("slow");
    },

    goLocation = function (next) {
      if (pLoc != next) {
        gid("map" + pLoc).setAttribute("class",gameAreas["a" + pLoc].status);
        pLoc = next;
        gid("map" + pLoc).setAttribute("class",gameAreas["a" + pLoc].status + " here");
        gid("currentlocation").innerHTML = gameAreas["a" + pLoc].name;
        gid("action").setAttribute("class",gameAreas["a" + pLoc].status);
        populateChoices(pLoc);
      }
    },

    setStatus = function (n,s,h) {
      gameAreas["a" + n].status = s;
      if (h) {
        gid("action").setAttribute("class",s);
        s += " here";
      }
      gid("map" + n).setAttribute("class",s);
    },

    populateChoices = function (area) {
      texts = gameAreas["a" + area].choices || [];
      amount = texts.length;
      if (amount > 0) {
        gid("choicebox").innerHTML = "";
        for (i=0; i<amount; i++) {
          if (texts[i] !== "") {
            var a = document.createElement("a");
            a.setAttribute("href","#");
            a.setAttribute("onclick","adv" + area + "_" + i + "(); return false;");
            a.innerHTML = texts[i];
            gid("choicebox").appendChild(a);
          }
        }
        $("#choicebox").fadeIn("slow");
      } else {
        $("#choicebox").fadeOut("slow");
      }
    },

    do0 = function () {
      goLocation(0);
      gid("description").innerHTML = "<p>Geese! Geese everywhere! Millions of them! You are safe here... for now.</p>";
      hide("choicebox");
      return false;
    },

    do1 = function () {
      goLocation(1);
      gid("description").innerHTML = "<p>This is your yard. It is surrounded by a large metal fence with razor wire around the top. There is not much here except for some grass.</p>";
      return false;
    },

      adv1_0 = function () {
        gid("description").innerHTML = "<p>You pick some grass. Not much of an accomplishment, but you did it. You leave it there.</p>";
        if(gameAreas["a" + 2].status == "locked") {
          setStatus(2,"geese",0);
          gid("description").innerHTML += "<p>A casual glance reveals the garage door opener hidden under a growth of weeds on the ground. You hit the button and hear the door open on the other side of the house.</p>";
        }
      },

    do2 = function () {
      goLocation(2);
      gid("description").innerHTML = "<p>This is your neighborhood. Houses line the street and everything is eerily silent.</p>";
      return false;
    },

      adv2_0 = function () {
        gid("description").innerHTML = "<p>You look over the blue house and see some plastic geese decorations in the yard.</p>";
        if((gameAreas.a2.choices.length == 2)&&(gameAreas["a" + 3].status == "locked")) {
          gameAreas.a2.choices[2] = "Destroy Plastic Geese";
          populateChoices(2);
        }
      },

      adv2_1 = function () {
        gid("description").innerHTML = "<p>You look over the yellow house. Nothing to see really.</p>";
        if((gameAreas.a6.status == "locked")&&(gameAreas["a" + 5].status == "clear")) {
          gid("description").innerHTML += "<p>The newspaper kid rides by on his bike and throws the newspaper. It hits you directly in the face with a loud \'whap\' sound. It falls open on the ground and displays the ads pages.</p><p>One \'lonely people\' ad advertises a sad soul who enjoys walks in the park and eating at buffets. Her name is Shakeesha. A job offer above it is looking for young men and women to join the army and lists a nearby recruiting office.";
        setStatus(6,"clear",0);
        setStatus(7,"geese",0);
        }
      },

      adv2_2 = function () {
        gid("description").innerHTML = "<p>You destroy one of the plastic geese and the real geese see you do it. Boy are they scared now! They rush off leaving this area cleared and the entrance to the alleyway open.</p>";
        gameAreas.a2.choices.pop();
        populateChoices(2);
        setStatus(3,"clear",0);
        setStatus(4,"geese",0);
        setStatus(5,"geese",0);
        setStatus(8,"geese",0);
        setStatus(2,"clear",1);
      },

    do3 = function () {
      goLocation(3);
      gid("description").innerHTML = "<p>This is the alley that runs behind some of the houses in your neighborhood.</p>";
      return false;
    },

    do4 = function () {
      goLocation(4);
      gid("description").innerHTML = "<p>This is Gluck\'s Parking School. Anyone can drive, but few can truly park a vehicle right.</p>";
      if (gameAreas.a5.status == "geese") {
        gid("description").innerHTML += "<p>Gluck is wearing a shirt that says \"L2P Noob!\" which stands for \"Learn 2 Park Noob!\"</p>";
      } else if (gameAreas.a4.status == "geese") {
        gid("description").innerHTML += "<p>Gluck is over at the grocery store raising hell.</p>";
      } else {
        gid("description").innerHTML += "<p>Gluck is out with Shakeesha.</p>";
      }
      return false;
    },

    do5 = function () {
      goLocation(5);
      gid("description").innerHTML = "<p>This is the grocery store. The parking lot is packed full of cars and people go about their business in the store.</p>";
      return false;
    },

      adv5_0 = function () {
        gid("description").innerHTML = "<p>You play around with the pricing gun, adding false labels to random items throughout the store.</p>";
        if (gameAreas.a5.status == "geese") {
          gid("description").innerHTML += "<p>Unbeknownst to you, one item you tagged was some expensive lip gloss, and you marked it down to nearly 3% the original price. A cheerleader found it, shrieked, and called all of her friends to come take advantage of the deal.</p><p>As they all arrive in a hurry, they all cram into a row of parking spaces near the front of the lot. And they park very badly.</p><p>And even though they have scared off the geese from the lot, they\'ve attracted another force of nature.</p><p>Gluck.</p>";
          setStatus(5,"clear",1);
        }
      },

    do6 = function () {
      goLocation(6);
      gid("description").innerHTML = "<p>This is the park. There are geese swimming in the pond here, but I guess that\'s OK because geese are supposed to swim in the park.</p>";
      if (gameAreas.a4.status == "geese") {
        gid("description").innerHTML += "<p>There\'s a large woman sitting on a park bench eating an entire dozen of donuts.</p>";
      }
      return false;
    },

      adv6_0 = function () {
        gid("description").innerHTML = "<p>You talk to the woman. It\'s Shakeesha from the newspaper ad. She tells you about her job as a meter maid and her passion for good parking and great food. She\'s 300 pounds of curvatious fun looking for the right man.</p><p>You tell her about Gluck, the guy who runs the parking school just up the road. She sounds interested.</p><p>\"What does he look like?\" she asks.</p><p>\"Remember those guys from the earlier seasons of The X Files who called themselves \'The Lone Gunmen\'? He looks like the blonde one. Or maybe like Garth from Wayne\'s World.\" you say. She gets a sparkle in her eye that can only be described as love.</p><p>She sets off toward the parking school, the earth trembling with her every step. As she draws nearer the school, you see from a distance a large flock of geese rising up from there, no doubt afraid of being Shakeesha\'s next meal. Foie gras anyone?";
        setStatus(4,"clear",0);
        gameAreas.a8.choices[0] = "Investigate Van";
        gameAreas.a6.choices.pop();
        populateChoices(6);
      },

    do7 = function () {
      goLocation(7);
      gid("description").innerHTML = "<p>This is the army recruiting office.</p>";
      if (gameAreas.a7.status == "geese") {
        gid("description").innerHTML += "<p>The parking lot is literally filled with nearly 47 geese! The men of the recruiting office have set up a barricade of sandbags and are hiding behind them trying to figure out how to get out alive.</p>";
      }
      return false;
    },

    do8 = function () {
      goLocation(8);
      gid("description").innerHTML = "<p>This is \"Fred\'s Freaking Ridiculous BBQ Buffet\". It\'s run by Fred, the father of you best friend from middle school, Sam. Fred pulled Sam out of school in the freshman year of highschool to help work at the buffet. HAHA FAILURE.</p>";
      if (gameAreas.a4.status == "clear") {
        gid("description").innerHTML += "<p>The buffet is closed for the evening, but there\'s a van still parked in the parking lot. The way it\'s rocking back and forth, you\'re surprised it\'s stayling between the lines marking the parking spaces.</p>";
      }
      return false;
    },

      adv8_0 = function () {
        gid("description").innerHTML = "<p>You look into the van and see Gluck and Shakeesha and OH GOD. THE HORROR! ARGH!</p><p>There is no way to describe what you are seeing without truly crafting a terrifying tale. The only way to describe it is as follows:</p><p>OK, imagine you take a french fry, and you lay it on the table. Then you take an avocado, and you set it on top of the french fry, and start rolling it and grinding it into the french fry. Grinding and grinding and grinding as hard as you can until the avocado is satisfied.</p><p>This, ladies and gentlemen, is truly the answer to the question \"How is babby formed?\"";
      },

    do9 = function () {
      goLocation(9);
      gid("description").innerHTML = "<p>This is Main St.</p>";
      return false;
    };