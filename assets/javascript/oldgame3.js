$(document).ready(function(){
// my vars
	var charChosen = 0;
	var enemyChosen = 0;
	var enemyHP = 0;
	var yourHP = 0;
	var you =0;
	var enemyCAP = 0;
	var yourAP = 0;
	var enemyName = "";
	var theEnemy =0;
	var enemyNum = 3;

	var elijah = 
  {
    picture: "assets/images/Elijah.png",
    name: "TA Elijah",
    HP:100,
    AP:4,
    CAP:5,
    myDiv: $("<div/>", {"class": "character bg-light"}),
    initialize: function()
    {
      this.HP = 100;
      this.AP = 4;
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    },
    refresh: function()
    {
      this.myDiv.Empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    },
    makeChar: function()
    {
      $(".yourChar").append($(this.myDiv));
    },
    makeEnemy: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    },
    makeDefender: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    }
  }

  var tasha = 
  {
    picture: "assets/images/tasha.jpg",
    name: "TA Tasha",
    HP:120,
    AP:5,
    CAP:8,
    myDiv: $("<div/>", {"class": "character bg-light"}),
    initialize: function()
    {
      this.HP = 100;
      this.AP = 4;
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    },
    refresh: function()
    {
      this.myDiv.Empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    },
    makeChar: function()
    {
      $(".yourChar").append($(this.myDiv));
    },
    makeEnemy: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    },
    makeDefender: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    }
  }

  var thomas = 
  {
    picture: "assets/images/thomas.jpg",
    name: "TA Thomas",
    HP:150,
    AP:6,
    CAP:20,
    myDiv: $("<div/>", {"class": "character bg-light"}),
    initialize: function()
    {
      this.HP = 100;
      this.AP = 4;
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    },
    refresh: function()
    {
      this.myDiv.Empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    },
    makeChar: function()
    {
      $(".yourChar").append($(this.myDiv));
    },
    makeEnemy: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    },
    makeDefender: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    }
  }

  var josh = 
  {
    picture: "assets/images/josh.jpg",
    name: "Instuctor Josh",
    HP:180,
    AP:7,
    CAP:25,
    myDiv: $("<div/>", {"class": "character bg-light"}),
    initialize: function()
    {
      this.HP = 100;
      this.AP = 4;
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    },
    refresh: function()
    {
      this.myDiv.Empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    },
    makeChar: function()
    {
      $(".yourChar").append($(this.myDiv));
    },
    makeEnemy: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    },
    makeDefender: function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    }
  }

  var theGame =
  {
    initialize: function()
    {
      elijah.initialize();
      tasha.initialize();
      thomas.initialize();
      josh.initialize();
    }
  }

  //button click events - Choose your character!
  	$(document).on("click", ".character" , function() {
  		if(charChosen == 0)
  		{
  			charChosen = 1;
  			var yourDude = $(this).name;
  			$('.character').each(function(index, obj)
  			{

    			if($(obj).name !== yourDude)
    			{
    				$(obj).makeEnemy();
    			}
    			else
    			{
    				$(obj).makeChar();
    				yourHP = $(obj).HP;
    				yourAP = $(obj).AP;
    				yourName = $(obj).name;
    				you = $(obj);
    			}
			   });
  		}
  		else
  		{
  			$(".whatHappened").text("You already chose a character.");
  		}
    });
    //Choose an enemy defender!
  	$(document).on("click", ".myEnemy" , function() {
  		if(enemyChosen == 0)
  		{
  			enemyChosen = 1;
        enemyHP = $(this).HP;
    		enemyCAP = $(this).CAP;
    		enemyName = $(this).name;
    		theEnemy = $(this);
      }
      else
      {
        $(".whatHappened").text("You already chose an enemy.");
      }
  		
    });

    $("#attack").on("click" , function() {
    	if(charChosen == 0)
    	{
    		$(".whatHappened").text("Choose your Character");
    	}
    	else if(enemyChosen == 0)
    	{
    		$(".whatHappened").text("Choose your Enemy!");
    	}
  		else
  		{
  			$(".battleText").text("You Attacked! for " + yourAP + " points!");
  			$(".whatHappened").text(enemyName + " hit you back for " + enemyCAP + " points!");
  			yourHP -= enemyCAP;
  			enemyHP -= yourAP;
  			if(yourHP <= 0)
  			{alert("You Died");}
  			else if(enemyHP <= 0)
  			{
  				$(".defender").empty();
  				enemyNum --;
  				if(enemyNum > 0)
  				{
  					alert("Choose Another Enemy!");
  					enemyChosen = 0;
  				}
  				else
  				{
  					alert("You Win!");
  				}
  			}
  			else
  			{
  				yourAP = parseInt(yourAP) + parseInt(yourAP);
          you.refresh();
          theEnemy.refresh();
  			}
  		}
  		
    });

  theGame.initialize();


});

