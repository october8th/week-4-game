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

	var elijahDiv = $("<div/>");
 	elijahDiv.attr("class", "character bg-light" );
 	elijahDiv.attr("data-name","TA Elijah");
	elijahDiv.attr("data-picture","assets/images/Elijah.png");
	elijahDiv.attr("data-HP",100);
 	elijahDiv.attr("data-AP",10);
	elijahDiv.attr("data-CAP",5);
	elijahDiv.append('<div class= "charName text-center">' + elijahDiv.attr("data-name") + "</div>");
	elijahDiv.append('<div>' + '<img src="' + elijahDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
	elijahDiv.append('<div class= "charHP text-center">' + elijahDiv.attr("data-HP") + "</div>");
	$(".chars").append($(elijahDiv));

	var tashaDiv = $("<div/>");
 	tashaDiv.attr("class", "character bg-light" );
 	tashaDiv.attr("data-name","TA Tasha");
	tashaDiv.attr("data-picture","assets/images/tasha.jpg");
	tashaDiv.attr("data-HP",120);
 	tashaDiv.attr("data-AP",11);
	tashaDiv.attr("data-CAP",8);
	tashaDiv.append('<div class= "charName text-center">' + tashaDiv.attr("data-name") + "</div>");
	tashaDiv.append('<div>' + '<img src="' + tashaDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
	tashaDiv.append('<div class= "charHP text-center">' + tashaDiv.attr("data-HP") + "</div>");
	$(".chars").append($(tashaDiv));

	var thomasDiv = $("<div/>");
 	thomasDiv.attr("class", "character bg-light" );
 	thomasDiv.attr("data-name","TA Thomas");
	thomasDiv.attr("data-picture","assets/images/thomas.jpg");
	thomasDiv.attr("data-HP",150);
 	thomasDiv.attr("data-AP",12);
	thomasDiv.attr("data-CAP",20);
	thomasDiv.append('<div class= "charName text-center">' + thomasDiv.attr("data-name") + "</div>");
	thomasDiv.append('<div>' + '<img src="' + thomasDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
	thomasDiv.append('<div class= "charHP text-center">' + thomasDiv.attr("data-HP") + "</div>");
	$(".chars").append($(thomasDiv));

	var joshDiv = $("<div/>");
 	joshDiv.attr("class", "character bg-light" );
 	joshDiv.attr("data-name","Instuctor Josh");
	joshDiv.attr("data-picture","assets/images/josh.jpg");
	joshDiv.attr("data-HP",180);
 	joshDiv.attr("data-AP",13);
	joshDiv.attr("data-CAP",25);
	joshDiv.append('<div class= "charName text-center">' + joshDiv.attr("data-name") + "</div>");
	joshDiv.append('<div>' + '<img src="' + joshDiv.attr("data-picture") + '" class ="charPic rounded mx-auto d-block img-fluid"/>');
	joshDiv.append('<div class= "charHP text-center">' + joshDiv.attr("data-HP") + "</div>");
	$(".chars").append($(joshDiv));

  //button click events



  	$(document).on("click", ".character" , function() {
  		if(charChosen == 0)
  		{
        $(".whatHappened").text("Choose an enemy to battle!");
  			charChosen = 1;
  			var yourDude = $(this).attr("data-name");
  			$('.character').each(function(index, obj)
  			{

    			if( ($(obj).attr('data-name')) !== yourDude )
    			{
    				$(obj).removeClass();
    				$(obj).attr("class","myEnemy bg-alert");
        			$(".enemies").append($(obj));
        			
    			}
    			else
    			{
    				$(".yourChar").append($(obj));
    				yourHP = $(obj).attr("data-HP");
    				yourAP = $(obj).attr("data-AP");
            APBonus = yourAP;
    				yourName = $(obj).attr("data-name");
    				you = $(obj);
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

