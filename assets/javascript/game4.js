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
  var APBonus =0;
  var GameOver = 0;

  function rpgChar(thePic, theName, theHP, theAP, theCAP)
  {
    this.picture = thePic;
    this.name = theName;
    this.HP = theHP;
    this.AP = theAP;
    this.CAP = theCAP;
    this.myDiv = $("<div/>", {"class": "character bg-light " + theName});
    this.initialize = function(newHP)
    {
      this.HP = newHP;
      this.myDiv.attr('id',theName);
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    };
    this.refresh = function()
    {
      this.myDiv.Empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    };
    this.makeChar = function()
    {
      yourHP = this.HP;
      yourAP = this.AP;
      APBonus = yourAP;
      yourName = this.name;
      you = this;
      $(".yourChar").append($(this.myDiv)); 
    };
    this.makeEnemy = function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    };
    this.makeDefender = function()
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    };
  }
// create the elijah object
  var elijah = new rpgChar("assets/images/Elijah.png","TA-Elijah",100,10,5);
  elijah.initialize(100);
// create tasha
  var tasha = new rpgChar("assets/images/tasha.jpg","TA-Tasha",120,11,8);
  tasha.initialize(120);
//create thomas
  var thomas = new rpgChar("assets/images/thomas.jpg","TA-Thomas",150,12,20);
  thomas.initialize(150);
//chreate josh
  var josh = new rpgChar("assets/images/josh.jpg","Instructor-Josh",180,13,25);
  josh.initialize(180);
//create an array of my characters
var myChars=[elijah,tasha,thomas,josh];
  //button click events



  	$(document).on("click", ".character" , function() {
  		if(charChosen == 0)
  		{
        console.log($(this).attr('id'));
        var yourDude = $(this).attr('id');
        $(".whatHappened").text("Choose an enemy to battle!");
  			charChosen = 1;

        $(myChars).each(function(index,obj)
        {
          console.log(obj.myDiv.attr("id"));
          console.log(obj.name);
            if( obj.name = yourDude.attr('id'))
            {
                console.log("found elijah");
                var yourDude = $(this);
                yourDude.makeChar;
                
                console.log($(this).name);
                console.log($(this));
            }
            else
            {
              obj.makeEnemy();
            }

        });

  			var yourDude = $(this).attr("data-name");

  			$(myChars).each(function(index, obj)
  			{

    			if($(obj) !== yourDude )
    			{
    				$(obj).makeEnemy  	
    			}
			});
  		}
  		else
  		{
  			$(".whatHappened").text("You already chose a character.");
  		}
    });

  	$(document).on("click", ".myEnemy" , function() {
  		if(enemyChosen == 0)
  		{
        $(".whatHappened").text("Click the attack button to battle!");
  			enemyChosen = 1;
  			$(this).attr("class","myDefender bg-dark text-light");
        $(".defender").append($(this));
      	enemyHP = $(this).attr("data-HP");
    		enemyCAP = $(this).attr("data-CAP");
    		enemyName = $(this).attr("data-name");
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
      else if(GameOver == 1)
      {
        $(".whatHappened").text("The game is over, click restart!");
      } 
  		else
  		{
  			$(".battleText").text("You Attacked " + enemyName +" for " + APBonus + " points!");
  			
        enemyHP -= APBonus;
        if(enemyHP <= 0)
        {
          $(".defender").empty();
          enemyNum --;
          if(enemyNum > 0)
          {
            $(".whatHappened").text("You killed " + enemyName + "!  Choose an opponent!");
            $(".battleText").text("");
            enemyChosen = 0;
          }
          else
          {
            GameOver  = 1;
            $(".whatHappened").text("You killed " + enemyName + "! Victory is yours!");
            $(".gamerestart").append('<input type="button" value="restart" id="restart"/>');
          }
        }
        else
        {
          yourHP -= enemyCAP;
          $(".whatHappened").text(enemyName + " hit you back for " + enemyCAP + " points!");
        }
  			
  			
  			if(yourHP <= 0)
  			{
          GameOver  = 1;
          you.empty();
          you.attr("data-HP","DEAD");
          you.append('<div class= "charName text-center text-alert">' + you.attr("data-name") + "</div>");
          you.append('<div>' + '<img src="assets/images/skull.png" class ="charPic rounded mx-auto d-block img-fluid"/>');
          you.append('<div class= "charHP text-center text-alert">' + you.attr("data-HP") + "</div>");
          $(".whatHappened").text(enemyName + " Defeated you!");
          $(".gamerestart").append('<input type="button" value="restart" id="restart"/>');
        }
  			else
  			{
  				APBonus  = parseInt(APBonus) + parseInt(yourAP);
  				you.empty();
  				you.attr("data-HP",yourHP);
  				you.append('<div class= "charName text-center">' + you.attr("data-name") + "</div>");
				  you.append('<div>' + '<img src="' + you.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
				  you.append('<div class= "charHP text-center">' + you.attr("data-HP") + "</div>");

				  theEnemy.empty();
  				theEnemy.attr("data-HP",enemyHP);
  				theEnemy.append('<div class= "charName text-center">' + theEnemy.attr("data-name") + "</div>");
				  theEnemy.append('<div>' + '<img src="' + theEnemy.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
				  theEnemy.append('<div class= "charHP text-center">' + theEnemy.attr("data-HP") + "</div>");
  			}
  		}
  		
    });

    $(document).on("click", "#restart" , function(){
      charChosen  = 0;
      enemyChosen = 0;
      enemyNum =3;
      GameOver  =0;
      $(".whatHappened").text("Choose your Character");
      $(".battleText").text("");
        elijahDiv.empty();
        thomasDiv.empty();
        joshDiv.empty();
        tashaDiv.empty();
        elijahDiv.attr("data-HP",100);
        elijahDiv.attr("class", "character bg-light" );
        elijahDiv.append('<div class= "charName text-center">' + elijahDiv.attr("data-name") + "</div>");
        elijahDiv.append('<div>' + '<img src="' + elijahDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
        elijahDiv.append('<div class= "charHP text-center">' + elijahDiv.attr("data-HP") + "</div>");
        $(".chars").append($(elijahDiv));
        tashaDiv.attr("data-HP",120);
        tashaDiv.attr("class", "character bg-light" );
        tashaDiv.append('<div class= "charName text-center">' + tashaDiv.attr("data-name") + "</div>");
        tashaDiv.append('<div>' + '<img src="' + tashaDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
        tashaDiv.append('<div class= "charHP text-center">' + tashaDiv.attr("data-HP") + "</div>");
        $(".chars").append($(tashaDiv));
        thomasDiv.attr("data-HP",150);
        thomasDiv.attr("class", "character bg-light" );
        thomasDiv.append('<div class= "charName text-center">' + thomasDiv.attr("data-name") + "</div>");
        thomasDiv.append('<div>' + '<img src="' + thomasDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
        thomasDiv.append('<div class= "charHP text-center">' + thomasDiv.attr("data-HP") + "</div>");
        $(".chars").append($(thomasDiv));
        joshDiv.attr("data-HP",180);
        joshDiv.attr("class", "character bg-light" );
        joshDiv.append('<div class= "charName text-center">' + joshDiv.attr("data-name") + "</div>");
        joshDiv.append('<div>' + '<img src="' + joshDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
        joshDiv.append('<div class= "charHP text-center">' + joshDiv.attr("data-HP") + "</div>");
        $(".chars").append($(joshDiv));
        $(".gamerestart").empty();


    });

    $(".whatHappened").text("Choose your Character");
});

