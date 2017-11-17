$(document).ready(function(){
// my vars  i probably won't use them all, but here they are
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

  function rpgChar(thePic, theName, theHP, theAP, theCAP)//define my rpgChar object
  {
    this.picture = thePic;
    this.name = theName;
    this.HP = theHP;
    this.AP = theAP;
    this.CAP = theCAP;
    this.myDiv = $("<div/>", {"class": "character bg-light " + theName});
    this.initialize = function(newHP)//make it shiny and new
    {
      this.HP = newHP;
      this.myDiv.attr('id',theName);
      this.myDiv.attr('class',"character bg-light " + theName);
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
      $(".chars").append($(this.myDiv));
    };
    this.refresh = function()//refresh the damage/HP
    {
      this.myDiv.empty();
      this.myDiv.append('<div class= "charName text-center">' + this.name + "</div>");
      this.myDiv.append('<div>' + '<img src="' + this.picture + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
      this.myDiv.append('<div class= "charHP text-center">' + this.HP + "</div>");
    };
    this.makeChar = function()//this is now your dude
    {
      APBonus = this.AP;
      $(".yourChar").append($(this.myDiv)); 
    };
    this.makeEnemy = function()//this is an enemy char
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myEnemy bg-alert");
      $(".enemies").append($(this.myDiv));
    };
    this.makeDefender = function()//you're gonna fight this guy
    {
      $(this.myDiv).removeClass();
      $(this.myDiv).addClass("myDefender bg-dark text-light");
      $(".defender").append($(this.myDiv));
    };
    this.defeated = function()//you are dead
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
  //create an array of my characters to search through later
  var myChars=[elijah,tasha,thomas,josh];
  //button click events


//click on a character to choose it as your dude
  	$(document).on("click", ".character" , function() {
  		if(charChosen == 0)
  		{
        var yourDude = $(this).attr('id');
        $(".whatHappened").text("Choose an enemy to battle!");
  			charChosen = 1;
//traverse my array of rpgChars to see if we have match to what you clicked
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

//pick someone to battle against
  	$(document).on("click", ".myEnemy" , function() {
  		if(enemyChosen == 0)
  		{
        $(".whatHappened").text("Click the attack button to battle!");
  			enemyChosen = 1;
  			var yourDefender = $(this).attr('id');
        //traverse my array of rpgChars to see if we have match to what you clicked
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

//clicking the attack button
    $("#attack").on("click" , function() {
    	if(charChosen == 0)
    	{
    		$(".whatHappened").text("Choose your Character");//you didn't choose a char yet
    	}
    	else if(enemyChosen == 0)
    	{
    		$(".whatHappened").text("Choose your Enemy!");//you didn't choose an enemy yet
    	}
      else if(GameOver == 1)
      {
        $(".whatHappened").text("The game is over, click restart!");//the game is already over
      } 
  		else
  		{
  			$(".battleText").text("You Attacked " + theDefender.name +" for " + APBonus + " points!");
  			
        theDefender.HP -= APBonus;//calculate the damage you did
        if(theDefender.HP <= 0)//you killed the defender
        {
          $(".defender").empty();
          enemyNum --;
          if(enemyNum > 0)//was he the last dude?
          {
            $(".whatHappened").text("You killed " + theDefender.name + "!  Choose an opponent!");
            $(".battleText").text("");
            enemyChosen = 0;//pick another dude
          }
          else
          {
            GameOver  = 1;//you killed em all!  you win!
            $(".whatHappened").text("You killed " + theDefender.name + "! Victory is yours!");
            $(".gamerestart").append('<input type="button" value="restart" id="restart"/>');
          }
        }
        else
        {
          you.HP -= theDefender.CAP;//you must take counter attack damage
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
  				APBonus  = parseInt(APBonus) + parseInt(you.AP);//calculate the new attack power
  				you.refresh();
				  theDefender.refresh();
  			}
  		}
  		
    });

    $(document).on("click", "#restart" , function(){//restart the game
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
        //clear out the rpgChar divs and rebuild them fresh with full health
        elijah.initialize(100);

        tasha.initialize(120);

        thomas.initialize(150);

        josh.initialize(180);
        $(".gamerestart").empty();


    });

    $(".whatHappened").text("Choose your Character");
});