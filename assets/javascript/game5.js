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
  var theDefender;

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
      this.myDiv.attr('class',"character bg-light " + theName);
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    };
    this.refresh = function()
    {
      this.myDiv.empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    };
    this.makeChar = function()
    {
      APBonus = this.AP;
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
    this.defeated = function()
    {
      this.myDiv.empty();
      this.myDiv.attr("data-HP","DEAD");
      this.myDiv.append('<div class= "charName text-center text-alert">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="assets/images/skull.png" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center text-alert">' + this.HP + "</div>");
      $(".whatHappened").text(theDefender.name + " Defeated you!");
      $(".gamerestart").append('<input type="button" value="restart" id="restart"/>');

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
        console.log(yourDude);
        $(".whatHappened").text("Choose an enemy to battle!");
  			charChosen = 1;

        $(myChars).each(function(index,obj)
        {
            if( obj.name == yourDude)
            {
                you = obj;
                you.makeChar();
            }
            else
            {
              obj.makeEnemy();
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
  			var yourDefender = $(this).attr('id');
        console.log(yourDefender);
        $(myChars).each(function(index,obj)
        {
          if( obj.name == yourDefender)
          {
            theDefender = obj;
            theDefender.makeDefender();
          }
        });
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
  			$(".battleText").text("You Attacked " + theDefender.name +" for " + APBonus + " points!");
  			
        theDefender.HP -= APBonus;
        console.log("the defender HP " + theDefender.HP);
        if(theDefender.HP <= 0)
        {
          $(".defender").empty();
          enemyNum --;
          if(enemyNum > 0)
          {
            $(".whatHappened").text("You killed " + theDefender.name + "!  Choose an opponent!");
            $(".battleText").text("");
            enemyChosen = 0;
          }
          else
          {
            GameOver  = 1;
            $(".whatHappened").text("You killed " + theDefender.name + "! Victory is yours!");
            $(".gamerestart").append('<input type="button" value="restart" id="restart"/>');
          }
        }
        else
        {
          you.HP -= theDefender.CAP;
          $(".whatHappened").text(theDefender.name + " hit you back for " + theDefender.CAP + " points!");
        }
  			
  			/*you just got killed*/
  			if(you.HP <= 0)
  			{
          GameOver  = 1;
          you.defeated();
        }
  			else
  			{
  				APBonus  = parseInt(APBonus) + parseInt(you.AP);
  				you.refresh();
				  theDefender.refresh();
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
        elijah.myDiv.empty();
        thomas.myDiv.empty();
        josh.myDiv.empty();
        tasha.myDiv.empty();
        elijah.initialize(100);

        tasha.initialize(120);

        thomas.initialize(150);

        josh.initialize(180);
        $(".gamerestart").empty();


    });

    $(".whatHappened").text("Choose your Character");
});

